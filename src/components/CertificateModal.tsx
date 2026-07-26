"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CertificateModal({ isOpen, onClose }: CertificateModalProps) {
  // Prevent body scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/65 backdrop-blur-md">
          {/* Backdrop click closer */}
          <div className="absolute inset-0 cursor-default" onClick={onClose} />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-[960px] bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-black/10 flex flex-col my-auto"
          >
            {/* Header controls */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-black/5 bg-[#fafafa]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">workspace_premium</span>
                <span className="font-mono text-xs font-black uppercase tracking-widest text-[#1a1a2e]">
                  AIR G Certification Verification (Reference)
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-black/5 hover:border-primary/25 hover:text-primary flex items-center justify-center transition-all bg-white shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {/* Scrollable Certificate Frame */}
            <div className="p-4 sm:p-8 overflow-x-auto custom-scrollbar flex justify-center bg-slate-100">
              <div className="relative w-full max-w-[850px] aspect-[1.414/1] bg-white shadow-lg shrink-0 select-none overflow-hidden rounded-lg">
                <img 
                  src="/certificate.png" 
                  alt="AIR G International Program Completion Certificate" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Footer Action buttons */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-black/5 bg-[#fafafa]">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-black/10 text-xs font-bold uppercase tracking-widest text-[#1a1a2e]/60 hover:text-primary transition-colors cursor-pointer bg-white"
              >
                Close Reference
              </button>
              <button
                onClick={() => {
                  const printWindow = window.open("", "_blank");
                  if (printWindow) {
                    printWindow.document.write(`
                      <html>
                        <head>
                          <title>Print Certificate</title>
                          <style>
                            body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background: white; }
                            img { max-width: 100%; max-height: 100%; object-fit: contain; }
                            @page { size: landscape; margin: 0; }
                          </style>
                        </head>
                        <body>
                          <img src="/certificate.png" onload="window.print(); window.close();" />
                        </body>
                      </html>
                    `);
                    printWindow.document.close();
                  }
                }}
                className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2 glow-red"
              >
                <span className="material-symbols-outlined text-sm">print</span>
                Print / Save PDF
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
