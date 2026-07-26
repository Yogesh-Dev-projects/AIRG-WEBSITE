import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const srcPath = "C:\\Users\\DELL\\.gemini\\antigravity-ide\\brain\\995bb356-7991-41b8-a827-89f9a9a44076\\media__1780730293646.png";
    const destPath = path.join(process.cwd(), "public", "aig-logo.png");
    
    fs.copyFileSync(srcPath, destPath);
    return NextResponse.json({ success: true, message: "Logo copied successfully!" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
