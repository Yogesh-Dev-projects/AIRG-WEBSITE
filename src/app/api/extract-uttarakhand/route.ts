import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import https from "https";
export const dynamic = 'force-dynamic';

function fetchUrl(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Request Failed. Status Code: ${res.statusCode}`));
        return;
      }
      res.setEncoding("utf8");
      let rawData = "";
      res.on("data", (chunk) => { rawData += chunk; });
      res.on("end", () => { resolve(rawData); });
    }).on("error", (e) => { reject(e); });
  });
}

export async function GET() {
  try {
    const url = "https://raw.githubusercontent.com/shuklaneerajdev/IndiaStateTopojsonFiles/master/Uttarakhand.geojson";
    const rawFile = await fetchUrl(url);
    const geojson = JSON.parse(rawFile);

    // Calculate GPS bounding box across all districts
    let gpsMinLon = Infinity;
    let gpsMaxLon = -Infinity;
    let gpsMinLat = Infinity;
    let gpsMaxLat = -Infinity;

    const parseCoordsBBox = (coords: any) => {
      if (typeof coords[0] === "number") {
        const [lon, lat] = coords;
        if (lon < gpsMinLon) gpsMinLon = lon;
        if (lon > gpsMaxLon) gpsMaxLon = lon;
        if (lat < gpsMinLat) gpsMinLat = lat;
        if (lat > gpsMaxLat) gpsMaxLat = lat;
      } else {
        coords.forEach(parseCoordsBBox);
      }
    };

    geojson.features.forEach((f: any) => {
      parseCoordsBBox(f.geometry.coordinates);
    });

    // Target SVG viewport — matches how our India map renders state drilldown
    // We use a standalone 600x500 viewport for the Uttarakhand drilldown view
    const svgW = 580;
    const svgH = 480;
    const pad = 20;

    const projectX = (lon: number) => {
      return pad + ((lon - gpsMinLon) / (gpsMaxLon - gpsMinLon)) * (svgW - pad * 2);
    };
    const projectY = (lat: number) => {
      // Invert Y: higher lat = higher on screen
      return pad + ((gpsMaxLat - lat) / (gpsMaxLat - gpsMinLat)) * (svgH - pad * 2);
    };

    const formatCoord = (c: number[]) => {
      return `${projectX(c[0]).toFixed(1)},${projectY(c[1]).toFixed(1)}`;
    };

    const regionsList: any[] = [];

    geojson.features.forEach((f: any) => {
      const distName = f.properties.Dist_Name || "";
      const formattedName = distName.trim();
      const id = `ut-${formattedName.toLowerCase().replace(/[\s]+/g, "-")}`;

      let pathString = "";

      if (f.geometry.type === "Polygon") {
        f.geometry.coordinates.forEach((ring: any[]) => {
          // Simplify: take every 3rd point to reduce path length but keep shape
          const simplified = ring.filter((_: any, i: number) => i % 3 === 0);
          if (simplified.length > 2) {
            pathString += (pathString ? " " : "") + "M " + simplified.map(formatCoord).join(" L ") + " Z";
          }
        });
      } else if (f.geometry.type === "MultiPolygon") {
        f.geometry.coordinates.forEach((polygon: any[]) => {
          polygon.forEach((ring: any[]) => {
            const simplified = ring.filter((_: any, i: number) => i % 3 === 0);
            if (simplified.length > 2) {
              pathString += (pathString ? " " : "") + "M " + simplified.map(formatCoord).join(" L ") + " Z";
            }
          });
        });
      }

      if (pathString) {
        regionsList.push({ id, name: formattedName, path: pathString });
      }
    });

    // Build the replacement ut entry
    const regionsStr = regionsList.map(r => {
      return `      { id: "${r.id}", name: "${r.name}", path: "${r.path}" }`;
    }).join(",\n");

    const newUtEntry = `  ut: {
    label: "Uttarakhand",
    viewBox: "0 0 600 500",
    regions: [
${regionsStr}
    ],
    labs: []
  }`;

    // Read the map file and replace the ut entry using a regex
    const mapFilePath = path.join(process.cwd(), "src/components/InteractiveIndiaMap.tsx");
    let mapContent = fs.readFileSync(mapFilePath, "utf8");

    // Use regex to find and replace the entire ut: { ... } block
    const utRegex = /  ut:\s*\{[\s\S]*?labs:\s*\[\]\s*\},?/;
    if (utRegex.test(mapContent)) {
      mapContent = mapContent.replace(utRegex, newUtEntry + ",");
      fs.writeFileSync(mapFilePath, mapContent, "utf8");
      return NextResponse.json({ 
        success: true, 
        message: `Uttarakhand map updated with ${regionsList.length} real districts!`,
        districts: regionsList.map(r => r.name),
        bounds: { gpsMinLon, gpsMaxLon, gpsMinLat, gpsMaxLat }
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        error: "Could not find ut: entry in map file. Pattern not matched.",
        regionsGenerated: regionsList.length
      });
    }
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message, stack: err.stack });
  }
}
