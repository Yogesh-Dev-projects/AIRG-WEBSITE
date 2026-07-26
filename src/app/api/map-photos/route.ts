import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cwd = process.cwd();
    const destDir = path.join(cwd, "public", "extracted-hi");
    const labsFilePath = path.join(cwd, "src", "data", "labs.ts");

    if (!fs.existsSync(destDir)) {
      return NextResponse.json({ success: false, error: "extracted-hi directory not found" });
    }

    if (!fs.existsSync(labsFilePath)) {
      return NextResponse.json({ success: false, error: "labs.ts file not found" });
    }

    // Get all extracted images
    const images = fs.readdirSync(destDir)
      .filter(f => f.toLowerCase().endsWith(".jpeg") || f.toLowerCase().endsWith(".jpg") || f.toLowerCase().endsWith(".png"))
      .map(file => `/extracted-hi/${file}`);

    if (images.length === 0) {
      return NextResponse.json({ success: false, error: "No images found in extracted-hi" });
    }

    // Read current labsData
    const labsDataModule = await import("@/data/labs");
    const labsData = labsDataModule.labsData;

    // Map disjoint photo sets
    // We have 27 images:
    // - Labs 0 to 14 (15 labs) get unique primary images from index 0 to 14.
    // - The remaining 12 images (index 15 to 26) are distributed as secondary images.
    const updatedLabs = labsData.map((lab, index) => {
      const primaryImage = images[index % images.length];
      const secondaryImage = images[15 + (index % 12)];

      const labImages = [primaryImage, secondaryImage];

      return {
        ...lab,
        img: primaryImage,
        images: labImages
      };
    });

    const fileHeader = `export interface Lab {
  slug: string;
  name: string;
  icon: string;
  sIcon: string;
  desc: string;
  detailedDesc: string;
  status: string;
  img: string;
  images: string[];
  techStack: string[];
  stats: { label: string; value: string }[];
  highlights: string[];
}

export const labsData: Lab[] = `;

    const newContent = fileHeader + JSON.stringify(updatedLabs, null, 2) + ";\n";
    fs.writeFileSync(labsFilePath, newContent, "utf8");

    return NextResponse.json({ 
      success: true, 
      message: `Successfully mapped disjoint photo sets to ${updatedLabs.length} labs.`
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
