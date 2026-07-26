import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const mapFilePath = path.join(process.cwd(), "src/components/InteractiveIndiaMap.tsx");
    const content = fs.readFileSync(mapFilePath, "utf8");

    const lines = content.split("\n");
    const occurrences: any[] = [];
    lines.forEach((line, index) => {
      if (line.includes("mh-sangli") || line.includes("id: \"mh-sangli\"")) {
        occurrences.push({
          line: index + 1,
          content: line.trim().substring(0, 300)
        });
      }
    });

    return NextResponse.json({
      occurrences,
      totalLines: lines.length
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
