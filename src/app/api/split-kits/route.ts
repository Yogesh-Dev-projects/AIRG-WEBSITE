import { NextResponse } from "next/server";
import { exec } from "child_process";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const srcDrone = "C:\\Users\\DELL\\.gemini\\antigravity-ide\\brain\\995bb356-7991-41b8-a827-89f9a9a44076\\media__1780736311288.jpg";
    const destDrone = path.join(process.cwd(), "public", "drone-kit.png");
    fs.copyFileSync(srcDrone, destDrone);

    const srcElite = "C:\\Users\\DELL\\.gemini\\antigravity-ide\\brain\\995bb356-7991-41b8-a827-89f9a9a44076\\media__1780736498676.jpg";
    const destElite = path.join(process.cwd(), "public", "drone-kit-elite.png");
    fs.copyFileSync(srcElite, destElite);
    
    return NextResponse.json({ success: true, message: "All images copied successfully!" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
