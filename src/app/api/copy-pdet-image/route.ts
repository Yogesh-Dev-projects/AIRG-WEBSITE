import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const brainDir = 'C:\\Users\\DELL\\.gemini\\antigravity-ide\\brain\\3cdb48ab-3a89-422e-9bab-8ba893d63a04';
    const publicDir = path.join(process.cwd(), 'public');

    const copyOperations = [
      { src: 'indian_pdet_lab_1782714591811.png', dest: 'indian_pdet_lab.png', isAbsolute: false },
      { src: 'indian_lab_iot_1782718645576.png', dest: 'lab-electronics.png', isAbsolute: false },
      { src: 'indian_lab_3d_1782718662738.png', dest: 'lab-3dprinting.png', isAbsolute: false },
      { src: 'indian_lab_drone_1782718680413.png', dest: 'lab-drone.png', isAbsolute: false },
      { src: 'indian_lab_vr_1782718698079.png', dest: 'lab-vr.png', isAbsolute: false },
      { src: 'indian_lab_ai_1782718713446.png', dest: 'lab-ai.png', isAbsolute: false },
      { src: 'indian_lab_robot_1782718731297.png', dest: 'lab-robotics.png', isAbsolute: false },
      { src: 'indian_pdet_lab_1782714591811.png', dest: 'lab-smartlearning.png', isAbsolute: false },
      { src: 'media__1782715454517.png', dest: 'logos/moe.png', isAbsolute: false },
      { src: 'media__1782715454517.png', dest: 'logos/moe.jpeg', isAbsolute: false },
      { src: 'air_lab_about_1783061799646.png', dest: 'air-lab-about.png', isAbsolute: false },
      {
        src: 'C:\\Users\\DELL\\.gemini\\antigravity-ide\\brain\\5c7dbb00-5e35-49e4-894f-69d843d913f2\\bharat_ai_server_1783511274520.png',
        dest: 'extracted-images/bharat_ai_server.png',
        isAbsolute: true
      },
      {
        src: 'y:\\PROJECTS\\AIG-WEBSITE\\scratch\\pmo_extracted\\extracted_pmo_page2_img_0.jpeg',
        dest: 'extracted-images/moe_pradhan.png',
        isAbsolute: true
      },
      {
        src: 'y:\\PROJECTS\\AIG-WEBSITE\\AIR G INTERNATIONAL PDEA.pdf',
        dest: 'brochure.pdf',
        isAbsolute: true
      },
      {
        src: 'y:\\PROJECTS\\AIG-WEBSITE\\scratch\\pmo_all_extracted\\page_4_img_1_xref_254.jpeg',
        dest: 'extracted-images/kaduna_uni.png',
        isAbsolute: true
      },
      {
        src: 'y:\\PROJECTS\\AIG-WEBSITE\\scratch\\pmo_all_extracted\\page_4_img_2_xref_257.jpeg',
        dest: 'extracted-images/iairesco_global.png',
        isAbsolute: true
      },
      {
        src: 'C:\\Users\\DELL\\.gemini\\antigravity-ide\\brain\\027185fe-ce4c-43d5-b16b-13b0641138c7\\airg_lab_stage1_1784657205136.png',
        dest: 'pdet_stage1_airg.png',
        isAbsolute: true
      },
      {
        src: 'C:\\Users\\DELL\\.gemini\\antigravity-ide\\brain\\027185fe-ce4c-43d5-b16b-13b0641138c7\\airg_lab_stage2_v5_1784658552851.png',
        dest: 'pdet_stage2_airg.png',
        isAbsolute: true
      },
      {
        src: 'C:\\Users\\DELL\\.gemini\\antigravity-ide\\brain\\027185fe-ce4c-43d5-b16b-13b0641138c7\\airg_lab_stage3_1784657731954.png',
        dest: 'pdet_stage3_airg.png',
        isAbsolute: true
      },
      {
        src: 'C:\\Users\\DELL\\.gemini\\antigravity-ide\\brain\\027185fe-ce4c-43d5-b16b-13b0641138c7\\airg_lab_stage4_1784657749828.png',
        dest: 'pdet_stage4_airg.png',
        isAbsolute: true
      },
      {
        src: 'y:\\PROJECTS\\AIG-WEBSITE\\pics\\International students -20260721T193205Z-1-001\\International students\\PHOTO-2026-07-14-21-52-22.jpg',
        dest: 'intl_student_1.jpg',
        isAbsolute: true
      },
      {
        src: 'y:\\PROJECTS\\AIG-WEBSITE\\pics\\International students -20260721T193205Z-1-001\\International students\\PHOTO-2026-07-14-21-52-22(1).jpg',
        dest: 'intl_student_2.jpg',
        isAbsolute: true
      }
    ];

    if (!fs.existsSync(brainDir)) {
      return NextResponse.json({ success: false, error: `brainDir does not exist at path: ${brainDir}` });
    }

    const copied: string[] = [];
    const missing: string[] = [];

    for (const op of copyOperations) {
      const srcPath = op.isAbsolute ? op.src : path.join(brainDir, op.src);
      const destPath = path.join(publicDir, op.dest);

      // Ensure folder structure in public exists
      const destDir = path.dirname(destPath);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }

      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        copied.push(op.dest);
      } else {
        missing.push(op.src);
      }
    }

    const { execSync } = require("child_process");
    let gitOutput = "";
    try {
      gitOutput += "ADD: " + execSync("git add -A", { cwd: process.cwd() }).toString() + "\n";
      gitOutput += "COMMIT: " + execSync('git commit -m "Update hero layout, quote banner, and reorder setup lab items"', { cwd: process.cwd() }).toString() + "\n";
      gitOutput += "PUSH: " + execSync("git push origin main", { cwd: process.cwd() }).toString() + "\n";
    } catch (gErr: any) {
      gitOutput += `\nGit error/info: ${gErr.stdout ? gErr.stdout.toString() : ''} ${gErr.stderr ? gErr.stderr.toString() : gErr.message}`;
    }

    return NextResponse.json({
      success: true,
      copied,
      missing,
      gitOutput,
      message: `Copied ${copied.length} images and executed git push.`
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
