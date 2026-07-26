import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const brainDir = 'C:\\Users\\DELL\\.gemini\\antigravity-ide\\brain\\6f741482-d580-4a00-8e90-8b8634720d01';
    const publicDir = path.join(process.cwd(), 'public');

    // Copy to v2 to force browser cache bypass
    const srcPath = path.join(brainDir, 'robotics_kit_1780643531166.png');
    const destPath = path.join(publicDir, 'robotics-kit-v2.png');
    
    if (!fs.existsSync(brainDir)) {
      return NextResponse.json({ success: false, error: `brainDir does not exist at path: ${brainDir}` });
    }

    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      return NextResponse.json({ success: true, message: "Copied robotics kit image successfully" });
    }
    
    // List files to see if it's there
    const files = fs.readdirSync(brainDir);
    return NextResponse.json({ 
      success: false, 
      error: `Source file not found at ${srcPath}.`, 
      foundFiles: files 
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
