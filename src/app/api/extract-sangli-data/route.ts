import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

interface Point {
  x: number;
  y: number;
}

// Bounding box parser for SVG path
function parseSvgPathBoundingBox(pathStr: string) {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  const regex = /(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)/g;
  let match;
  while ((match = regex.exec(pathStr)) !== null) {
    const x = parseFloat(match[1]);
    const y = parseFloat(match[2]);
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }

  return { minX, maxX, minY, maxY };
}

export async function GET() {
  try {
    const mapFilePath = path.join(process.cwd(), "src/components/InteractiveIndiaMap.tsx");
    const content = fs.readFileSync(mapFilePath, "utf8");

    // 1. Find the path of 'mh-sangli' in the file to determine the target bounding box
    const mhSangliIndex = content.indexOf('id: "mh-sangli"');
    if (mhSangliIndex === -1) {
      return NextResponse.json({ error: "Could not find id: 'mh-sangli' in map file" });
    }

    const pathKeyword = 'path: "';
    const pathStart = content.indexOf(pathKeyword, mhSangliIndex) + pathKeyword.length;
    const pathEnd = content.indexOf('"', pathStart);
    const mhSangliPath = content.substring(pathStart, pathEnd);

    const svgBBox = parseSvgPathBoundingBox(mhSangliPath);
    console.log("Parsed SVG Bounding Box for Sangli:", svgBBox);

    // 2. Fetch the Maharashtra Subdistricts GeoJSON
    const geojsonUrl = "https://raw.githubusercontent.com/datta07/INDIAN-SHAPEFILES/master/STATES/MAHARASHTRA/MAHARASHTRA_SUBDISTRICTS.geojson";
    const response = await fetch(geojsonUrl);
    if (!response.ok) {
      return NextResponse.json({ error: `Fetch GeoJSON failed: ${response.statusText}` });
    }
    const geojson = await response.json();

    // 3. Filter for Sangli subdistricts
    const sangliFeatures = geojson.features.filter((f: any) => {
      const dtname = f.properties.district_name || f.properties.dtname || f.properties.dt_name || "";
      return dtname.toLowerCase() === "sangli" || 
             Object.values(f.properties).some(val => typeof val === 'string' && val.toLowerCase() === 'sangli');
    });

    if (sangliFeatures.length === 0) {
      return NextResponse.json({ error: "Could not find any Sangli district subdistricts in the GeoJSON." });
    }

    // 4. Calculate GPS Bounding Box of all Sangli subdistricts combined
    let gpsMinLon = Infinity;
    let gpsMaxLon = -Infinity;
    let gpsMinLat = Infinity;
    let gpsMaxLat = -Infinity;

    const parseCoordsBBox = (coords: any) => {
      if (typeof coords[0] === 'number') {
        const [lon, lat] = coords;
        if (lon < gpsMinLon) gpsMinLon = lon;
        if (lon > gpsMaxLon) gpsMaxLon = lon;
        if (lat < gpsMinLat) gpsMinLat = lat;
        if (lat > gpsMaxLat) gpsMaxLat = lat;
      } else {
        coords.forEach(parseCoordsBBox);
      }
    };

    sangliFeatures.forEach((f: any) => {
      parseCoordsBBox(f.geometry.coordinates);
    });

    console.log("GPS Bounding Box for Sangli:", { gpsMinLon, gpsMaxLon, gpsMinLat, gpsMaxLat });

    // 5. Define projection scaling functions
    const projectX = (lon: number) => {
      return svgBBox.minX + ((lon - gpsMinLon) / (gpsMaxLon - gpsMinLon)) * (svgBBox.maxX - svgBBox.minX);
    };

    const projectY = (lat: number) => {
      // Invert Y axis: higher latitude is smaller Y in SVG
      return svgBBox.minY + ((gpsMaxLat - lat) / (gpsMaxLat - gpsMinLat)) * (svgBBox.maxY - svgBBox.minY);
    };

    // 6. Generate SVG paths
    const regionsList: any[] = [];

    sangliFeatures.forEach((f: any) => {
      const sdtname = f.properties.sdtname || f.properties.subdistrict_name || f.properties.NAME_3 || "";
      const regionId = `sangli-${sdtname.toLowerCase()}`;
      
      let pathString = "";

      const formatCoord = (c: [number, number]) => {
        return `${projectX(c[0]).toFixed(1)},${projectY(c[1]).toFixed(1)}`;
      };

      if (f.geometry.type === "Polygon") {
        f.geometry.coordinates.forEach((ring: any) => {
          pathString += (pathString ? " " : "") + "M " + ring.map(formatCoord).join(" L ") + " Z";
        });
      } else if (f.geometry.type === "MultiPolygon") {
        f.geometry.coordinates.forEach((polygon: any) => {
          polygon.forEach((ring: any) => {
            pathString += (pathString ? " " : "") + "M " + ring.map(formatCoord).join(" L ") + " Z";
          });
        });
      }

      // Clean up Name (e.g. capitalize)
      const formattedName = sdtname.charAt(0).toUpperCase() + sdtname.slice(1).toLowerCase();

      regionsList.push({
        id: regionId,
        name: formattedName,
        path: pathString
      });
    });

    // 7. Calculate Viewbox with padding
    const width = svgBBox.maxX - svgBBox.minX;
    const height = svgBBox.maxY - svgBBox.minY;
    const paddingX = 20;
    const paddingY = 15;
    const vbMinX = Math.round(svgBBox.minX - paddingX);
    const vbMinY = Math.round(svgBBox.minY - paddingY);
    const vbWidth = Math.round(width + paddingX * 2);
    const vbHeight = Math.round(height + paddingY * 2);
    const viewBoxStr = `${vbMinX} ${vbMinY} ${vbWidth} ${vbHeight}`;

    // 8. Construct the new `sangli` map key structure
    // Swami Ramanand Bharati Vidyamandir Tasgaon Sangli coordinates: x: 185, y: 485 (already matches general Tasgaon area)
    const sangliDistrictData = {
      label: "Sangli District",
      viewBox: viewBoxStr,
      regions: regionsList,
      labs: [
        {
          name: "Swami Ramanand AIR G INNOVATION LAB",
          x: 185,
          y: 485,
          icon: "school",
          focus: "AIG Innovation Lab",
          googleMapsQuery: "Swami Ramanand Bharati Vidyamandir Tasgaon Sangli"
        }
      ]
    };

    // Serialize regions list to JSX format
    const regionsStr = regionsList.map(r => {
      return `      { id: "${r.id}", name: "${r.name}", path: "${r.path}" }`;
    }).join(",\n");

    const labsStr = `      {
        name: "Swami Ramanand AIR G INNOVATION LAB",
        x: 185,
        y: 485,
        icon: "school",
        focus: "AIG Innovation Lab",
        googleMapsQuery: "Swami Ramanand Bharati Vidyamandir Tasgaon Sangli"
      }`;

    const sangliEntry = `  sangli: {
    label: "Sangli District",
    viewBox: "${viewBoxStr}",
    regions: [
${regionsStr}
    ],
    labs: [
${labsStr}
    ]
  }`;

    // 9. Update mh-sangli properties in the file to make it clickable
    let newContent = content;
    const sangliIdx = newContent.indexOf('id: "mh-sangli"');
    if (sangliIdx !== -1) {
      // Find the next closing bracket } for this object
      const nextBrace = newContent.indexOf('}', sangliIdx);
      const subBlock = newContent.substring(sangliIdx, nextBrace);
      if (!subBlock.includes('isClickable')) {
        const replacement = `id: "mh-sangli",
        name: "Sangli",
        path: "${mhSangliPath}",
        isClickable: true,
        targetStateOrDistrictId: "sangli"`;
        newContent = newContent.substring(0, sangliIdx) + replacement + newContent.substring(nextBrace);
      }
    }

    // 10. Insert the `sangli: { ... }` configuration inside `STATE_MAPS`
    // We can insert it right before the closing brace of `STATE_MAPS`, which is `};` before `const AVAILABLE_STATE_MAPS`
    const availableMapsIdx = newContent.indexOf("const AVAILABLE_STATE_MAPS");
    if (availableMapsIdx !== -1) {
      const searchTarget = "};";
      // Find the last occurrence of searchTarget before availableMapsIdx
      const lastBraceIdx = newContent.lastIndexOf(searchTarget, availableMapsIdx);
      if (lastBraceIdx !== -1) {
        newContent = newContent.substring(0, lastBraceIdx) + ",\n" + sangliEntry + "\n" + newContent.substring(lastBraceIdx);
      }
    }

    // Write back the updated file
    fs.writeFileSync(mapFilePath, newContent, "utf8");

    return NextResponse.json({
      success: true,
      message: "Sangli district map integrated successfully with taluka boundaries!",
      viewBox: viewBoxStr,
      regionsCount: regionsList.length
    });
  } catch (err: any) {
    console.error("Sangli extraction error:", err);
    return NextResponse.json({ error: err.message });
  }
}
