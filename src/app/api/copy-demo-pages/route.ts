import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

function copyFolderRecursiveSync(src: string, dest: string) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyFolderRecursiveSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

export async function GET() {
  try {
    const demoDir = "c:/Users/DELL/OneDrive/Desktop/DEMO";
    const targetDir = process.cwd(); // c:/Users/DELL/OneDrive/Desktop/AIG-WEBSITE

    const pagesToCopy = [
      "about",
      "careers",
      "blog",
      "press",
      "instructor",
      "affiliate",
      "stories",
      "help",
      "contact",
      "privacy",
      "terms"
    ];

    const copiedDirs: string[] = [];

    // Copy app pages
    pagesToCopy.forEach((page) => {
      const srcApp = path.join(demoDir, "app", page);
      const destApp = path.join(targetDir, "src", "app", page);
      if (fs.existsSync(srcApp)) {
        copyFolderRecursiveSync(srcApp, destApp);
        copiedDirs.push(`app/${page}`);
      }
    });

    // Copy contexts
    const srcContexts = path.join(demoDir, "contexts");
    const destContexts = path.join(targetDir, "src", "context"); // merge/place under src/context
    if (fs.existsSync(srcContexts)) {
      copyFolderRecursiveSync(srcContexts, destContexts);
      copiedDirs.push("contexts");
    }

    // Copy UI components
    const srcUI = path.join(demoDir, "components", "ui");
    const destUI = path.join(targetDir, "src", "components", "ui");
    if (fs.existsSync(srcUI)) {
      copyFolderRecursiveSync(srcUI, destUI);
      copiedDirs.push("components/ui");
    }

    // Copy other components needed (like navbar, footer, theme-provider)
    const filesToCopy = [
      ["components/navbar.tsx", "src/components/demo-navbar.tsx"],
      ["components/footer.tsx", "src/components/demo-footer.tsx"],
      ["components/theme-provider.tsx", "src/components/theme-provider.tsx"]
    ];

    filesToCopy.forEach(([srcRel, destRel]) => {
      const srcPath = path.join(demoDir, srcRel);
      const destPath = path.join(targetDir, destRel);
      const destParent = path.dirname(destPath);
      if (!fs.existsSync(destParent)) {
        fs.mkdirSync(destParent, { recursive: true });
      }
      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        copiedDirs.push(`${srcRel} -> ${destRel}`);
      }
    });

    // Copy the logo image to public if exists
    const srcLogo = path.join(demoDir, "public", "aig-logo.png");
    const destLogo = path.join(targetDir, "public", "aig-logo.png");
    if (fs.existsSync(srcLogo)) {
      fs.copyFileSync(srcLogo, destLogo);
      copiedDirs.push("public/aig-logo.png");
    }

    return NextResponse.json({
      success: true,
      copied: copiedDirs,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message, stack: err.stack });
  }
}
