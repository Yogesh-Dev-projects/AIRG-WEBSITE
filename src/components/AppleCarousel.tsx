"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { workshopsData, Workshop } from "@/data/workshops";

export default function AppleCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeWorkshop = workshopsData[activeIndex] || workshopsData[0];
  const [isHovered, setIsHovered] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  const getLabUrl = (slug: string) => {
    if (slug === "rajendra-khandala-lab") return "/labs/rajendra-khandala";
    if (slug === "venurai-chavan-lab") return "/labs/venurai-chavan";
    if (slug === "mudhoji-lab-showcase") return "/labs/mudhoji-lab";
    if (slug === "sakharwadi-lab-showcase") return "/labs/sakharwadi-lab";
    if (slug === "sant-tukaram-lab-showcase") return "/labs/sant-tukaram";
    if (slug === "koteshwar-vidyaly-lab-showcase") return "/labs/koteshwar-vidyaly";
    if (slug === "ss-nikam-lab-showcase") return "/labs/ss-nikam";
    return `/labs/${slug}`;
  };

  // Triple the data array to create a seamless infinite marquee loop
  const duplicatedWorkshops = [...workshopsData, ...workshopsData, ...workshopsData];

  // Auto-rotate the active billboard item every 7 seconds when not hovered
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % workshopsData.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isHovered]);

  // Constant, smooth, non-snapping, single-direction scroll marquee
  useEffect(() => {
    if (isHovered) return;

    let animationFrameId: number;
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const smoothScroll = () => {
      // Constantly move slowly in a single direction (leftwards)
      scrollContainer.scrollLeft += 1.0; // Faster speed to ensure clear one-direction movement

      // The length of one complete set of cards
      const singleSetWidth = scrollContainer.scrollWidth / 3;

      // Wrap around seamlessly if we scroll past the second set
      if (scrollContainer.scrollLeft >= singleSetWidth * 2) {
        scrollContainer.scrollLeft = scrollContainer.scrollLeft - singleSetWidth;
      }

      animationFrameId = requestAnimationFrame(smoothScroll);
    };

    // Begin scroll animation immediately
    animationFrameId = requestAnimationFrame(smoothScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered]);

  const handleThumbnailClick = (originalIndex: number) => {
    setActiveIndex(originalIndex);
  };

  const handleArrowScroll = (dir: "left" | "right") => {
    if (scrollContainerRef.current) {
      const amount = 220; // Adjusted card width + gap for smaller cards
      scrollContainerRef.current.scrollBy({
        left: dir === "left" ? -amount : amount,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="w-full space-y-6 select-none">
      
      {/* 1. Large Feature Billboard (Hero Banner - Matches Page Width Layout) */}
      <div className="w-full max-w-[1440px] mx-auto px-5 md:px-20">
        <div className="relative w-full aspect-[16/10] sm:aspect-[21/10] md:aspect-[21/9] overflow-hidden bg-black shadow-2xl rounded-3xl border border-black/5">
          <AnimatePresence initial={false}>
            <motion.div
              key={activeWorkshop.slug}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full overflow-hidden"
            >
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: 1.05 }}
                transition={{ duration: 7, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden"
              >
                {/* Blurred background image to fill the 21:9 slot with matching color tones */}
                <Image
                  src={activeWorkshop.url}
                  alt=""
                  fill
                  className="object-cover blur-xl opacity-40 scale-110 pointer-events-none"
                  priority
                />
                {/* Contained foreground image to show the full photograph without extreme zooming or cropping */}
              {/* Contained or Covered foreground image based on orientation to prevent blank boxes for landscape and distortion for portrait */}
              <div className="relative w-full h-full z-10">
                <Image
                  src={activeWorkshop.url}
                  alt={activeWorkshop.title}
                  fill
                  className={`${isPortrait ? "object-contain" : "object-cover"} opacity-90 transition-all duration-300`}
                  priority
                  onLoad={(e) => {
                    const img = e.target as HTMLImageElement;
                    setIsPortrait(img.naturalHeight > img.naturalWidth);
                  }}
                />
              </div>
            </motion.div>
            {/* Subtle overlay gradients to keep the image bright and vibrant while maintaining text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-20" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent pointer-events-none z-20" />
          </motion.div>
        </AnimatePresence>

        {/* Billboard Text Content Overlay (Aligned inside the card layout) */}
        <div className="absolute inset-x-0 bottom-0 top-0 z-30 flex items-end">
          <div className="w-full pb-6 sm:pb-12 px-6 sm:px-12 text-white">
            <div className="max-w-xl space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeWorkshop.slug}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-3"
                >
                  <span className="inline-block px-3 py-1 bg-white/15 border border-white/20 rounded-md text-[8px] font-mono font-bold uppercase tracking-widest" style={{ color: "#FF5C6C" }}>
                    {activeWorkshop.category}
                  </span>
                  <h3 
                    className="text-2xl sm:text-4xl md:text-5xl font-headline font-black uppercase tracking-tight leading-none"
                    style={{ color: "#ffffff", textShadow: "0 2px 8px rgba(0, 0, 0, 0.85)" }}
                  >
                    {activeWorkshop.title}
                  </h3>
                  {/* Description removed */}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Playback Progress Indicator line */}
        <div className="absolute bottom-0 left-0 h-1 bg-white/20 w-full z-20">
          <motion.div
            key={activeIndex}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 7, ease: "linear" }}
            className="h-full bg-[#FF5C6C]"
          />
        </div>
      </div>
    </div>

      {/* 2. Interactive Navigation Thumbnails Strip (Aligned to container grid) */}
      <div 
        className="relative w-full max-w-[1440px] mx-auto px-5 md:px-20 group/strip"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        {/* Navigation Arrows for Thumbnail strip */}
        <button
          onClick={() => handleArrowScroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-black/10 hover:text-[#EE2C3C] shadow-md z-20 cursor-pointer active:scale-95 opacity-0 group-hover/strip:opacity-100 transition-opacity flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-base">arrow_back_ios_new</span>
        </button>
        <button
          onClick={() => handleArrowScroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-black/10 hover:text-[#EE2C3C] shadow-md z-20 cursor-pointer active:scale-95 opacity-0 group-hover/strip:opacity-100 transition-opacity flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-base">arrow_forward_ios</span>
        </button>

        {/* Scrollable track of Thumbnails */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-auto no-scrollbar py-4 px-1"
          style={{ scrollbarWidth: "none" }}
        >
          {duplicatedWorkshops.map((w: Workshop, idx: number) => {
            const originalIndex = idx % workshopsData.length;
            const isActive = originalIndex === activeIndex;
            return (
              <div
                key={`${w.slug}-${idx}`}
                onClick={() => handleThumbnailClick(originalIndex)}
                className="flex-shrink-0 w-[180px] sm:w-[320px] md:w-[380px] cursor-pointer transition-all duration-300"
              >
                {/* Image card wrapper */}
                <div 
                  className={`relative aspect-[16/9] w-full rounded-[1.5rem] overflow-hidden bg-slate-100 shadow-lg transition-all duration-500 ${
                    isActive 
                      ? "ring-4 ring-[#FF5C6C] ring-offset-2 scale-102" 
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={w.url}
                    alt={w.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 240px, 380px"
                    priority={isActive}
                  />
                  
                  {/* Subtle Gradient Shadow Inside Card */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Top Right Mini Brand Indicator */}
                  <div className="absolute top-4 right-5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 flex items-center gap-1.5 z-10">
                    <span className="w-1.5 h-1.5 bg-[#FF5C6C] rounded-full animate-pulse" />
                    <span className="text-white text-[8px] font-mono tracking-widest font-bold uppercase">AIR G</span>
                  </div>

                  {/* Bottom Left Title Overlay inside Image */}
                  <div className="absolute bottom-5 left-6 right-6 text-white space-y-1 z-10">
                    <span className="text-[#FF5C6C] text-[8px] font-mono tracking-widest font-bold uppercase block">
                      {w.category}
                    </span>
                    <h4 className="font-headline font-black text-sm sm:text-lg md:text-xl uppercase tracking-tight leading-tight line-clamp-1">
                      {w.title}
                    </h4>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
