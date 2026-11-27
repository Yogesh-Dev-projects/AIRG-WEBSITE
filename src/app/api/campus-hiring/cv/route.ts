import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import CampusHiring from "@/models/CampusHiring";

const MIME_BY_EXT: Record<string, string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const applicationId = searchParams.get("application_id")?.trim();
    const mode = searchParams.get("mode") === "view" ? "view" : "download";

    if (!applicationId) {
      return NextResponse.json(
        { success: false, error: "application_id is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const doc = await CampusHiring.findOne({ application_id: applicationId })
      .select("application_id full_name cv_file_name cv_file_type cv_file_base64 cv_link cv_submit_method")
      .lean() as any;

    if (!doc) {
      return NextResponse.json(
        { success: false, error: "Application not found" },
        { status: 404 }
      );
    }

    if (doc.cv_file_base64) {
      const raw = String(doc.cv_file_base64);
      let mimeFromHeader = "";
      let base64Payload = raw;

      const dataUrlMatch = raw.match(/^data:([^;]+);base64,(.+)$/);
      if (dataUrlMatch) {
        mimeFromHeader = dataUrlMatch[1];
        base64Payload = dataUrlMatch[2];
      } else if (raw.includes(",")) {
        base64Payload = raw.split(",")[1];
      }

      const fallbackName = `${sanitizeFilename(doc.full_name || "Candidate")}_CV.pdf`;
      const rawFilename = doc.cv_file_name || fallbackName;
      const safeFilename = sanitizeFilename(rawFilename);
      const ext = safeFilename.split(".").pop()?.toLowerCase() || "";
      const contentType =
        doc.cv_file_type || mimeFromHeader || MIME_BY_EXT[ext] || "application/octet-stream";

      const fileBuffer = Buffer.from(base64Payload, "base64");
      const disposition = mode === "view" ? "inline" : "attachment";

      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          "Content-Type": contentType,
          "Content-Disposition": `${disposition}; filename="${safeFilename}"; filename*=UTF-8''${encodeURIComponent(rawFilename)}`,
          "Content-Length": String(fileBuffer.length),
          "Cache-Control": "no-store",
        },
      });
    }

    if (doc.cv_link) {
      return NextResponse.redirect(doc.cv_link);
    }

    return NextResponse.json(
      { success: false, error: "CV file is not available in database for this application." },
      { status: 404 }
    );
  } catch (error: any) {
    console.error("Campus Hiring CV GET error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to retrieve CV" },
      { status: 500 }
    );
  }
}

