import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const results: string[] = [];
    const { searchParams } = new URL(request.url);
    const commitMsg = searchParams.get("msg") || "Update website features";
    const cwd = process.cwd();

    // 1. Stage changes
    try {
      const addRes = await execAsync("git add .", { cwd });
      results.push("git add: " + (addRes.stdout || "done"));
    } catch (addErr: any) {
      results.push("git add error: " + addErr.message);
    }

    // 2. Commit changes
    try {
      const commitRes = await execAsync(`git commit -m "${commitMsg}"`, { cwd });
      results.push("git commit: " + (commitRes.stdout || "done"));
    } catch (commitErr: any) {
      results.push("git commit error: " + commitErr.message);
    }

    // 3. Push changes
    try {
      const pushRes = await execAsync("git push origin main", { cwd });
      results.push("git push: " + (pushRes.stdout || pushRes.stderr || "done"));
    } catch (pushErr: any) {
      results.push("git push error: " + pushErr.message);
    }

    return NextResponse.json({ success: true, results }, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0"
      }
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
