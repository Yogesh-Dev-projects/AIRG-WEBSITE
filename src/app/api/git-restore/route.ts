import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cwd = process.cwd();
    const result = await execAsync("git checkout -- src/components/InteractiveIndiaMap.tsx", { cwd });
    return NextResponse.json({ success: true, stdout: result.stdout || "done" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
