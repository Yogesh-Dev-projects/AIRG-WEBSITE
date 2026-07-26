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

// Point-in-polygon check using ray casting
function isPointInPolygon(point: Point, polygon: Point[]) {
  const x = point.x, y = point.y;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x, yi = polygon[i].y;
    const xj = polygon[j].x, yj = polygon[j].y;

    const intersect = ((yi > y) !== (yj > y))
        && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

function isPointInMultiRingPolygon(point: Point, rings: Point[][]) {
  // Check if inside outer boundary (first ring)
  if (rings.length === 0) return false;
  const inOuter = isPointInPolygon(point, rings[0]);
  if (!inOuter) return false;

  // Check if inside any holes (subsequent rings)
  for (let i = 1; i < rings.length; i++) {
    if (isPointInPolygon(point, rings[i])) {
      return false; // Point is in a hole
    }
  }
  return true;
}

export async function GET() {
  try {
    const mapFilePath = path.join(process.cwd(), "src/components/InteractiveIndiaMap.tsx");
    const content = fs.readFileSync(mapFilePath, "utf8");

    // 1. Find the path of 'mh-satara' in the file to determine the target bounding box
    const mhSataraIndex = content.indexOf('id: "mh-satara"');
    if (mhSataraIndex === -1) {
      return NextResponse.json({ error: "Could not find id: 'mh-satara' in map file" });
    }

    const pathKeyword = 'path: "';
    const pathStart = content.indexOf(pathKeyword, mhSataraIndex) + pathKeyword.length;
    const pathEnd = content.indexOf('"', pathStart);
    const mhSataraPath = content.substring(pathStart, pathEnd);

    const svgBBox = parseSvgPathBoundingBox(mhSataraPath);
    console.log("Parsed SVG Bounding Box for Satara:", svgBBox);

    // 2. Fetch the Maharashtra Subdistricts GeoJSON
    const geojsonUrl = "https://raw.githubusercontent.com/datta07/INDIAN-SHAPEFILES/master/STATES/MAHARASHTRA/MAHARASHTRA_SUBDISTRICTS.geojson";
    const response = await fetch(geojsonUrl);
    if (!response.ok) {
      return NextResponse.json({ error: `Fetch GeoJSON failed: ${response.statusText}` });
    }
    const geojson = await response.json();

    // 3. Filter for Satara subdistricts
    const sataraFeatures = geojson.features.filter((f: any) => {
      const dtname = f.properties.district_name || f.properties.dtname || f.properties.dt_name || "";
      return dtname.toLowerCase() === "satara" || 
             Object.values(f.properties).some(val => typeof val === 'string' && val.toLowerCase() === 'satara');
    });

    if (sataraFeatures.length === 0) {
      return NextResponse.json({ error: "Could not find any Satara district subdistricts in the GeoJSON." });
    }

    // 4. Calculate GPS Bounding Box of all Satara subdistricts combined
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

    sataraFeatures.forEach((f: any) => {
      parseCoordsBBox(f.geometry.coordinates);
    });

    console.log("GPS Bounding Box:", { gpsMinLon, gpsMaxLon, gpsMinLat, gpsMaxLat });

    // 5. Define projection scaling functions
    const projectX = (lon: number) => {
      return svgBBox.minX + ((lon - gpsMinLon) / (gpsMaxLon - gpsMinLon)) * (svgBBox.maxX - svgBBox.minX);
    };

    const projectY = (lat: number) => {
      // Invert Y axis: higher latitude is smaller Y in SVG
      return svgBBox.minY + ((gpsMaxLat - lat) / (gpsMaxLat - gpsMinLat)) * (svgBBox.maxY - svgBBox.minY);
    };

    // Helper to transform coordinates structure to Point arrays
    const getPolygonPoints = (ring: [number, number][]): Point[] => {
      return ring.map(coord => ({ x: projectX(coord[0]), y: projectY(coord[1]) }));
    };

    // 6. Generate SVG paths and cache them for point-in-polygon checks
    const regionPaths: Record<string, string> = {};
    const regionPolygons: Record<string, Point[][]> = {}; // regionId -> array of rings (outer + holes)

    sataraFeatures.forEach((f: any) => {
      const sdtname = f.properties.sdtname || f.properties.subdistrict_name || f.properties.NAME_3 || "";
      const regionId = `satara-${sdtname.toLowerCase()}`;
      
      let pathString = "";
      const ringsList: Point[][] = [];

      const formatCoord = (c: [number, number]) => {
        return `${projectX(c[0]).toFixed(1)},${projectY(c[1]).toFixed(1)}`;
      };

      if (f.geometry.type === "Polygon") {
        f.geometry.coordinates.forEach((ring: any) => {
          pathString += (pathString ? " " : "") + "M " + ring.map(formatCoord).join(" L ") + " Z";
          ringsList.push(getPolygonPoints(ring));
        });
      } else if (f.geometry.type === "MultiPolygon") {
        f.geometry.coordinates.forEach((polygon: any) => {
          polygon.forEach((ring: any) => {
            pathString += (pathString ? " " : "") + "M " + ring.map(formatCoord).join(" L ") + " Z";
            ringsList.push(getPolygonPoints(ring));
          });
        });
      }

      regionPaths[regionId] = pathString;
      regionPolygons[regionId] = ringsList;
    });

    // 7. Validate lab markers positions
    const labsToCheck = [
      { name: "Holy Convent AIR G INNOVATION LAB", point: { x: 136, y: 468 }, expectedRegion: "satara-karad" },
      { name: "Koteswar AIR G INNOVATION LAB", point: { x: 114, y: 405 }, expectedRegion: "satara-wai" },
      { name: "Kshitij AIR G INNOVATION LAB", point: { x: 166, y: 454 }, expectedRegion: "satara-khatav" },
      { name: "Mudhoji AIR G INNOVATION LAB", point: { x: 168, y: 404 }, expectedRegion: "satara-phaltan" },
      { name: "Rajendra AIR G INNOVATION LAB", point: { x: 138, y: 400 }, expectedRegion: "satara-khandala" }
    ];

    const validationResults = labsToCheck.map(lab => {
      let actualRegion = "none";
      for (const [regionId, rings] of Object.entries(regionPolygons)) {
        if (isPointInMultiRingPolygon(lab.point, rings)) {
          actualRegion = regionId;
          break;
        }
      }
      return {
        labName: lab.name,
        markerCoords: lab.point,
        expectedRegion: lab.expectedRegion,
        actualRegion: actualRegion,
        isValid: actualRegion === lab.expectedRegion
      };
    });

    console.log("Validation Results:", validationResults);

    // 8. Update InteractiveIndiaMap.tsx
    let newContent = content;

    for (const [id, pathVal] of Object.entries(regionPaths)) {
      const regionIdx = newContent.indexOf(`id: "${id}"`);
      if (regionIdx === -1) {
        console.warn(`Could not find region: ${id} in map file regions, skipping update.`);
        continue;
      }

      const rPathStart = newContent.indexOf('path: "', regionIdx) + 'path: "'.length;
      const rPathEnd = newContent.indexOf('"', rPathStart);

      newContent = newContent.substring(0, rPathStart) + pathVal + newContent.substring(rPathEnd);
    }

    fs.writeFileSync(mapFilePath, newContent, "utf8");
    console.log("Updated InteractiveIndiaMap.tsx successfully with exact boundaries!");

    return NextResponse.json({
      success: true,
      message: "Satara district talukas boundaries updated successfully with exact GeoJSON geometry!",
      validationResults: validationResults,
      svgBoundingBox: svgBBox,
      gpsBoundingBox: { gpsMinLon, gpsMaxLon, gpsMinLat, gpsMaxLat }
    });
  } catch (err: any) {
    console.error("API error:", err);
    return NextResponse.json({ error: err.message });
  }
}
