"use client";
import React, { useEffect, useRef, useState } from "react";

interface CropInfo {
  filename: string;
  slide: string; // "slide11" or "slide12"
  xPct: number;  // X coordinate as % of image width
  yPct: number;  // Y coordinate as % of image height
  rPct: number;  // Radius as % of image width
}

export default function CropTool() {
  const [logs, setLogs] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("Idle");
  
  // Grid configuration: these are percentage coordinates that target the circular faces in the Canva screenshots.
  // We will load slide11 and slide12 and crop these areas.
  const crops: CropInfo[] = [
    // Slide 11 Row 1 (Management)
    { filename: "abdulrazaq.png", slide: "slide11", xPct: 41.0, yPct: 40.8, rPct: 5.6 },
    { filename: "pratap.png", slide: "slide11", xPct: 54.1, yPct: 40.8, rPct: 5.6 },
    { filename: "yeabsira.png", slide: "slide11", xPct: 66.8, yPct: 40.8, rPct: 5.6 },

    // Slide 11 Row 2 (Advisory Board)
    { filename: "sapptarishi.png", slide: "slide11", xPct: 41.0, yPct: 70.0, rPct: 5.6 },
    { filename: "aashish.png", slide: "slide11", xPct: 54.1, yPct: 70.0, rPct: 5.6 },
    { filename: "tushar_a.png", slide: "slide11", xPct: 66.8, yPct: 70.0, rPct: 5.6 },

    // Slide 12 Row 2 (Industry Experts) - Row 1 is same as Slide 11 Row 2
    { filename: "tushar_s.png", slide: "slide12", xPct: 41.0, yPct: 61.5, rPct: 5.6 },
    { filename: "vijay.png", slide: "slide12", xPct: 54.1, yPct: 61.5, rPct: 5.6 },
    { filename: "chakravarti.png", slide: "slide12", xPct: 66.8, yPct: 61.5, rPct: 5.6 },
  ];

  const runCropping = async () => {
    setStatus("Running...");
    setLogs([]);

    for (const crop of crops) {
      try {
        const img = new Image();
        img.src = `/team/${crop.slide}.png`;
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });

        // Create canvas
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Could not get canvas context");

        const width = img.naturalWidth;
        const height = img.naturalHeight;

        // Calculate absolute pixels
        const r = (crop.rPct / 100) * width;
        const x = (crop.xPct / 100) * width - r;
        const y = (crop.yPct / 100) * height - r;
        const size = r * 2;

        canvas.width = size;
        canvas.height = size;

        // Draw cropped area
        ctx.beginPath();
        ctx.arc(r, r, r, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(img, x, y, size, size, 0, 0, size, size);

        // Convert to base64
        const base64Data = canvas.toDataURL("image/png");

        // Send to server
        const res = await fetch("/api/save-cropped", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename: crop.filename, base64Data }),
        });
        const data = await res.json();
        
        if (data.success) {
          setLogs(prev => [...prev, `Saved ${crop.filename} successfully`]);
        } else {
          setLogs(prev => [...prev, `Failed to save ${crop.filename}: ${data.error}`]);
        }
      } catch (err: any) {
        setLogs(prev => [...prev, `Error on ${crop.filename}: ${err.message}`]);
      }
    }
    setStatus("Completed");
  };

  return (
    <div className="p-10 bg-slate-900 text-white min-h-screen font-mono">
      <h1 className="text-2xl font-bold mb-4">Auto-Crop Tool</h1>
      <p className="mb-4">Status: <span className="font-bold text-rose-500">{status}</span></p>
      <button 
        onClick={runCropping} 
        className="px-6 py-3 bg-rose-600 hover:bg-rose-500 rounded-lg font-bold"
      >
        Run Cropping
      </button>

      <div className="mt-8 space-y-2">
        {logs.map((log, i) => (
          <div key={i} className="text-sm border-b border-slate-800 pb-1 text-slate-300">
            {log}
          </div>
        ))}
      </div>
      
      {/* Live previews of cropped images from public/team */}
      {status === "Completed" && (
        <div className="mt-10">
          <h2 className="text-lg font-bold mb-4">Cropped Images Preview</h2>
          <div className="grid grid-cols-3 md:grid-cols-9 gap-4">
            {crops.map((crop) => (
              <div key={crop.filename} className="bg-slate-800 p-2 rounded-lg border border-slate-700 flex flex-col items-center">
                <span className="text-[10px] text-slate-400 mb-2">{crop.filename}</span>
                <img 
                  src={`/team/${crop.filename}?t=${Date.now()}`} 
                  alt={crop.filename} 
                  className="w-16 h-16 rounded-full border border-slate-600 object-cover" 
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
