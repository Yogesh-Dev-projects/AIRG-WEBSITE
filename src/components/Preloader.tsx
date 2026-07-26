"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [visible, setVisible] = useState(true);
  const completedRef = useRef(false);

  const finish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setVisible(false);
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    // Fire onComplete after animations finish
    const timer = setTimeout(finish, 2200);
    return () => clearTimeout(timer);
  }, [finish]);

  if (!visible) return null;

  return (
    <>
      <div className="preloader-wrapper fixed inset-0 z-[9999] flex select-none pointer-events-none">
        {/* 10 vertical columns */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="preloader-col h-full w-[10%] bg-[#EB0028] border-r border-white/5 pointer-events-auto"
            style={{
              animationDelay: `${0.6 + i * 0.04}s`,
            }}
          />
        ))}

        {/* Logo text */}
        <div 
          className="preloader-text-container flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10000] w-full px-4 text-center select-none"
        >
          <div className="font-outfit font-black text-[12vw] xs:text-[10vw] sm:text-[8vw] tracking-tighter leading-none text-white uppercase overflow-hidden flex justify-center py-2">
            {"AIRG".split("").map((char, idx) => (
              <span
                key={idx}
                className="preloader-text-char inline-block"
                style={{ animationDelay: `${idx * 0.03}s` }}
              >
                {char}
              </span>
            ))}
          </div>
          <div className="font-outfit font-bold text-[3.8vw] xs:text-[3vw] sm:text-[1.4vw] tracking-[0.45em] leading-none text-white/80 uppercase overflow-hidden mt-3 sm:mt-4 flex justify-center translate-x-[0.225em] py-2">
            {"INTERNATIONAL".split("").map((char, idx) => (
              <span
                key={idx}
                className="preloader-text-char inline-block"
                style={{ animationDelay: `${0.12 + idx * 0.02}s` }}
              >
                {char}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}


