import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs";

const execAsync = promisify(exec);
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cwd = process.cwd();
    const scriptPath = path.join(cwd, "scratch", "read_pdf.py");
    
    // Execute python script
    const result = await execAsync(`python "${scriptPath}"`, { cwd });
    
    // Read generated output file
    const txtPath = path.join(cwd, "scratch", "pdf_text.txt");
    let fileText = "";
    if (fs.existsSync(txtPath)) {
      fileText = fs.readFileSync(txtPath, "utf-8");
    } else {
      fileText = "Output file scratch/pdf_text.txt not found";
    }

    return NextResponse.json({ 
      success: true, 
      stdout: result.stdout, 
      stderr: result.stderr,
      text: fileText.slice(0, 10000) // First 10k chars
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
