"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ImageSliderProps {
  images: string[];
  name: string;
  className?: string;
}

export default function ImageSlider({ 
  images, 
  name, 
  className = "relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-sm border border-black/5 bg-black group select-none" 
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className={className}>
      {/* Sliding Image Animation Container */}
      <div className="relative w-full h-full">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={images[currentIndex]}
              alt={`${name} classroom view ${currentIndex + 1}`}
              fill
              className="object-contain bg-black"
              sizes="100vw"
              priority
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Left/Right Dark Gradient Overlays */}
        <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-black/60 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-black/60 to-transparent pointer-events-none z-10" />
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-black/10 hover:border-primary/40 hover:bg-white hover:text-primary transition-all duration-300 flex items-center justify-center text-[#1a1a2e] shadow-md z-20 cursor-pointer active:scale-95"
        aria-label="Previous image"
      >
        <span className="material-symbols-outlined text-xl">arrow_back_ios_new</span>
      </button>

      <button
        onClick={handleNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-black/10 hover:border-primary/40 hover:bg-white hover:text-primary transition-all duration-300 flex items-center justify-center text-[#1a1a2e] shadow-md z-20 cursor-pointer active:scale-95"
        aria-label="Next image"
      >
        <span className="material-symbols-outlined text-xl">arrow_forward_ios</span>
      </button>

      {/* Navigation Dots (Indicators) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20 bg-black/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleDotClick(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
              idx === currentIndex
                ? "bg-white scale-125 shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                : "bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
