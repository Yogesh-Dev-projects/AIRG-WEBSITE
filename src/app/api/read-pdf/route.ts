import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";

const execAsync = promisify(exec);
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cwd = process.cwd();
    const scriptPath = path.join(cwd, "scratch", "read_pdf.py");
    
    // Execute python script
    const result = await execAsync(`python "${scriptPath}"`, { cwd });
    
    return NextResponse.json({ 
      success: true, 
      stdout: result.stdout || "No output", 
      stderr: result.stderr || "No errors" 
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
