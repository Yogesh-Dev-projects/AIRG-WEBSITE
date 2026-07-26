import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const brainDir = "C:/Users/DELL/.gemini/antigravity-ide/brain/f88faeb9-a213-4f34-8259-4edcd497f99f";
    const destDir = path.join(process.cwd(), "public", "cards");

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    if (!fs.existsSync(brainDir)) {
      return NextResponse.json({ error: "Brain directory not found" });
    }

    const files = fs.readdirSync(brainDir);
    const copiedFiles: string[] = [];

    files.forEach((file) => {
      if (file.startsWith("media__") && file.endsWith(".png")) {
        const srcPath = path.join(brainDir, file);
        const destPath = path.join(destDir, file);
        fs.copyFileSync(srcPath, destPath);
        copiedFiles.push(file);
      }
    });

    // Also map specific country ones if we know them
    const mappings: Record<string, string> = {
      "media__1780295752955.png": "ye.png", // Yemen
      "media__1780295757766.png": "ng.png", // Nigeria
      "media__1780295762309.png": "np.png", // Nepal
      "media__1780295771449.png": "sd.png", // Sudan
      "media__1780295776534.png": "kh.png", // Cambodia
      "media__1780295846522.png": "ke.png", // Kenya
    };

    Object.entries(mappings).forEach(([srcName, destName]) => {
      const srcPath = path.join(brainDir, srcName);
      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, path.join(destDir, destName));
        copiedFiles.push(`${srcName} -> ${destName}`);
      }
    });

    return NextResponse.json({
      success: true,
      copied: copiedFiles,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message, stack: err.stack });
  }
}
