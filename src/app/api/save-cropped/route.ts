import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const { filename, base64Data } = await request.json();
    if (!filename || !base64Data) {
      return NextResponse.json({ success: false, error: "Missing filename or base64Data" }, { status: 400 });
    }

    // Clean up base64 prefix if present
    const base64Clean = base64Data.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Clean, "base64");

    const destDir = path.join(process.cwd(), "public", "team");
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    const filePath = path.join(destDir, filename);
    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({ success: true, message: `Saved ${filename}` });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
