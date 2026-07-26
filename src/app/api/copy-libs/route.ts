import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const srcLibDir = "c:/Users/DELL/OneDrive/Desktop/DEMO/lib";
    const destLibDir = path.join(process.cwd(), "src", "lib");

    if (!fs.existsSync(destLibDir)) {
      fs.mkdirSync(destLibDir, { recursive: true });
    }

    if (fs.existsSync(srcLibDir)) {
      const files = fs.readdirSync(srcLibDir);
      const copied: string[] = [];

      files.forEach((file) => {
        const srcPath = path.join(srcLibDir, file);
        const destPath = path.join(destLibDir, file);
        if (fs.lstatSync(srcPath).isFile()) {
          fs.copyFileSync(srcPath, destPath);
          copied.push(file);
        }
      });

      return NextResponse.json({ success: true, copied });
    } else {
      return NextResponse.json({ error: "Source lib directory not found" });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message, stack: err.stack });
  }
}
