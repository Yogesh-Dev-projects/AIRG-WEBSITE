import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const src = "C:\\Users\\DELL\\.gemini\\antigravity-ide\\brain\\6f741482-d580-4a00-8e90-8b8634720d01\\media__1780639894842.png";
  const dest = path.join(process.cwd(), "public", "certificate.png");

  try {
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      return NextResponse.json({ success: true, message: `Copied successfully to ${dest}` });
    } else {
      return NextResponse.json({ success: false, error: "Source file not found at " + src });
    }
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
