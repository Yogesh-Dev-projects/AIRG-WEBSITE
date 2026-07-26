import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const zipPath = "C:\\Users\\DELL\\Downloads\\hi.zip";
    const destDir = path.join(process.cwd(), "public", "extracted-hi");

    if (!fs.existsSync(zipPath)) {
      return NextResponse.json({ success: false, error: "hi.zip not found in Downloads" });
    }

    // Ensure dest directory exists
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    // Extract using tar (cross-platform on modern Windows/Linux) or powershell Expand-Archive
    // Let's use PowerShell Expand-Archive as it handles zip formats perfectly on Windows.
    const cmd = `powershell -Command "Expand-Archive -Path '${zipPath}' -DestinationPath '${destDir}' -Force"`;
    const result = await execAsync(cmd);

    // List extracted files
    const listFilesRecursive = (dir: string): string[] => {
      const results: string[] = [];
      const list = fs.readdirSync(dir);
      list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
          results.push(...listFilesRecursive(fullPath));
        } else {
          // relative path to public
          results.push(path.relative(path.join(process.cwd(), "public"), fullPath).replace(/\\/g, "/"));
        }
      });
      return results;
    };

    const files = listFilesRecursive(destDir);

    return NextResponse.json({ success: true, stdout: result.stdout, files });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
