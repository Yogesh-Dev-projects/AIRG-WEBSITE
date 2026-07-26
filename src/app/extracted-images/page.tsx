import fs from "fs";
import path from "path";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default function ExtractedImagesPage() {
  const destDir = path.join(process.cwd(), "public", "extracted-hi");
  let files: string[] = [];

  if (fs.existsSync(destDir)) {
    files = fs.readdirSync(destDir).filter(f => f.toLowerCase().endsWith(".jpeg") || f.toLowerCase().endsWith(".jpg") || f.toLowerCase().endsWith(".png"));
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-10 font-mono">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black text-rose-500 mb-2 uppercase tracking-wider">Extracted Photos Gallery</h1>
        <p className="text-slate-400 text-xs mb-8">Found {files.length} images in public/extracted-hi</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {files.map((file, idx) => (
            <div key={idx} className="bg-slate-800 rounded-2xl border border-slate-700/50 overflow-hidden shadow-xl p-4 flex flex-col gap-4">
              <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-slate-950 flex items-center justify-center border border-slate-700">
                <img
                  src={`/extracted-hi/${file}`}
                  alt={file}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-bold mb-1">FILENAME:</span>
                <span className="text-xs text-rose-400 font-bold break-all block bg-slate-900/60 p-2.5 rounded-lg border border-slate-700/30 select-all">{file}</span>
                <span className="text-[10px] text-slate-500 block uppercase font-bold mt-3 mb-1">IMAGE PATH:</span>
                <span className="text-[10px] text-slate-300 break-all block bg-slate-900/60 p-2.5 rounded-lg border border-slate-700/30 select-all">{`/extracted-hi/${file}`}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
