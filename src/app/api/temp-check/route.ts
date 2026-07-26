import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

export async function GET() {
  const logs: string[] = [];
  
  try {
    // 1. Fix InteractiveIndiaMap.tsx
    const mapPath = path.join(process.cwd(), "src/components/InteractiveIndiaMap.tsx");
    if (fs.existsSync(mapPath)) {
      let content = fs.readFileSync(mapPath, "utf8");
      const pattern = /const isClickable = region\.isClickable;\s+style=\{\{/;
      if (pattern.test(content)) {
        content = content.replace(pattern, `const isClickable = region.isClickable;

                return (
                  <path
                    key={region.id}
                    d={region.path}
                    fill={isHovered ? "url(#state-hover-gradient)" : "rgba(0,0,0,0.04)"}
                    stroke={isHovered ? "#ff4d4d" : "rgba(0,0,0,0.12)"}
                    strokeWidth={isHovered ? "1.5" : "0.5"}
                    style={{`);
        fs.writeFileSync(mapPath, content, "utf8");
        logs.push("Map file fixed successfully!");
      } else {
        logs.push("Map file pattern not found (may already be fixed).");
      }
    } else {
      logs.push("Map file not found.");
    }

    // 2. Clone and inspect portfolio
    const cloneDir = path.join(process.cwd(), "scratch/portfolio-clone");
    if (!fs.existsSync(cloneDir)) {
      logs.push("Cloning portfolio repository...");
      execSync("git clone https://github.com/Yogesh250804/My-Portfolio.git scratch/portfolio-clone");
    } else {
      logs.push("Portfolio clone already exists.");
    }

    // Find files containing preloader or intro animation
    const searchFolder = (dir: string) => {
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          if (!item.includes(".git") && !item.includes("node_modules")) {
            searchFolder(fullPath);
          }
        } else {
          if (item.endsWith(".js") || item.endsWith(".jsx") || item.endsWith(".ts") || item.endsWith(".tsx") || item.endsWith(".html") || item.endsWith(".css")) {
            const code = fs.readFileSync(fullPath, "utf8");
            if (code.toLowerCase().includes("yogesh") || code.toLowerCase().includes("preloader") || code.toLowerCase().includes("loader") || code.toLowerCase().includes("welcome")) {
              logs.push(`Found potential loader code in: ${path.relative(process.cwd(), fullPath)}`);
              // Let's log the first 20 lines or search matches
              if (item.includes("Preloader") || item.includes("Loader") || code.includes("Yogesh")) {
                logs.push(`--- CONTENT PREVIEW OF ${item} ---`);
                logs.push(code.substring(0, 1500));
                logs.push("---------------------------------");
              }
            }
          }
        }
      }
    };

    if (fs.existsSync(cloneDir)) {
      searchFolder(cloneDir);
    }

  } catch (error: any) {
    logs.push("Error occurred: " + error.message);
    if (error.stack) logs.push(error.stack);
  }

  return NextResponse.json({ logs });
}
