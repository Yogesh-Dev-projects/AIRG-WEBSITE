"use client";
import React, { useEffect, useState } from "react";

export default function TempExtract() {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // List of files we know might be there
    const list = [
      "moe.png", "symbiosis.jpeg", "maha60.png", "sharjah.jpeg", "unesco.jpeg",
      "atal.png", "azure.png", "fisa.png", "iic.png", "mitadt.png", "western.png",
      "sidtm.png", "dyp.png", "birla.png", "scei.png", "pratham.png", "cummins.png",
      "kenskyora.png", "pdea.png", "varhad.jpeg", "mitcon.png", "greentech.png",
      "extracted_p5_img2.png", "extracted_p5_img3.png", "extracted_p5_img4.png",
      "extracted_p5_img5.png", "extracted_p5_img6.png", "extracted_p5_img7.png",
      "extracted_p5_img8.png", "extracted_p5_img9.png", "extracted_p5_img18.png",
      "extracted_p5_img19.png", "extracted_p5_img20.png", "extracted_p5_img21.png",
      "extracted_p5_img22.png", "extracted_p6_img1.png", "extracted_p6_img2.png",
      "extracted_p6_img3.png", "extracted_p6_img4.png"
    ];
    setImages(list);
  }, []);

  return (
    <div className="p-10 bg-slate-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Logo Inspector</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {images.map((name) => (
          <div key={name} className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col items-center">
            <span className="text-[10px] font-mono mb-2 text-slate-400 break-all">{name}</span>
            <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center p-2 overflow-hidden">
              <img 
                src={`/logos/${name}`} 
                alt={name} 
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
