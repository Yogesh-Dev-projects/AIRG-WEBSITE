import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Fetch Natural Earth 110m countries GeoJSON
    const geojsonUrl = "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson";
    const res = await fetch(geojsonUrl);
    if (!res.ok) {
      return NextResponse.json({ error: `Failed to fetch GeoJSON from Natural Earth: ${res.statusText}` });
    }
    
    const geojson = await res.json();

    // Map view bounds
    const width = 1000;
    const height = 500;

    // Mercator Projection:
    // x = (lon + 180) * (width / 360)
    // y = height / 2 - (ln(tan(pi/4 + lat/2)) * height) / (2 * maxMerc)
    const projectX = (lon: number) => {
      return ((lon + 180) * width) / 360;
    };

    const projectY = (lat: number) => {
      // Clamp latitude to avoid infinity at poles
      const clampedLat = Math.max(-82, Math.min(84, lat));
      const rad = (clampedLat * Math.PI) / 180;
      const mercY = Math.log(Math.tan(Math.PI / 4 + rad / 2));
      
      // Standard Mercator projection height scale
      const maxMerc = 2.3;
      return height / 2 - (mercY * height) / (2 * maxMerc);
    };

    const formatCoord = (c: [number, number]) => {
      return `${projectX(c[0]).toFixed(1)},${projectY(c[1]).toFixed(1)}`;
    };

    const outputFeatures: any[] = [];

    geojson.features.forEach((f: any) => {
      const props = f.properties || {};
      const name = props.NAME || props.name || props.NAME_LONG || "Unknown";
      
      // Get country code: prioritize ISO_A2 (lowercase)
      let id = props.ISO_A2 || props.iso_a2 || props.POSTAL || props.ADM0_A3 || name.toLowerCase().replace(/[^a-z0-9]/g, "-");
      if (id === "-99") {
        id = props.ADM0_A3 || name.toLowerCase().replace(/[^a-z0-9]/g, "-");
      }
      id = String(id).toLowerCase();

      let pathString = "";

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

      if (pathString) {
        outputFeatures.push({
          id: id,
          name: name,
          path: pathString
        });
      }
    });

    const outputPath = path.join(process.cwd(), "src/components/worldMapPaths.json");
    fs.writeFileSync(outputPath, JSON.stringify({ viewBox: "0 0 1000 500", features: outputFeatures }, null, 2), "utf8");

    return NextResponse.json({
      success: true,
      count: outputFeatures.length,
      message: "Natural Earth World Map Mercator paths generated successfully!"
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message, stack: err.stack });
  }
}
