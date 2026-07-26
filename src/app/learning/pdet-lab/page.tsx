"use client";

import { Navbar } from "@/components/demo-navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { CheckoutModal } from "@/components/store/CheckoutModal";

export default function PDETLabPage() {
  const [activeZone, setActiveZone] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutItem, setCheckoutItem] = useState<{ name: string; price: number; image?: string; category?: string } | null>(null);

  const labImages = [
    "/indian_pdet_lab.png"
  ];

  useEffect(() => {
    if (labImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % labImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [labImages.length]);

  useEffect(() => {
    fetch("/api/copy-pdet-image").catch(() => { });
  }, []);

  // Initialize state with default items and unit costs to calculate totals dynamically (starts at 0)
  const [zones, setZones] = useState([
    {
      name: "Electronics & IoT Development Zone",
      icon: "memory",
      image: "/lab-electronics.png",
      items: [
        { name: "Arduino Development Kits (Nano, Uno, Mega)", qty: 0, unitCost: 2250, isLot: false },
        { name: "IoT Development Boards (ESP8266 to ESP32)", qty: 0, unitCost: 1166, isLot: false },
        { name: "Raspberry Pi 4 Kits", qty: 0, unitCost: 8000, isLot: false },
        { name: "Sensor Kits (Multiple Sensors)", qty: 0, unitCost: 4750, isLot: false },
        { name: "Basic Electronic Components & Tools", qty: 0, unitCost: 50000, isLot: true }
      ]
    },
    {
      name: "3D Printing & Product Development Zone",
      icon: "print",
      image: "/lab-3dprinting.png",
      items: [
        { name: "FDM 3D Printers (Creality Ender/Prusa)", qty: 0, unitCost: 40000, isLot: false },
        { name: "Resin 3D Printer (Anycubic/Elegoo)", qty: 0, unitCost: 60000, isLot: false },
        { name: "Filaments & Resins (PLA, ABS, TPU)", qty: 0, unitCost: 40000, isLot: true },
        { name: "Post-Processing Tools", qty: 0, unitCost: 25000, isLot: true }
      ]
    },
    {
      name: "Drone Technology Zone",
      icon: "flight",
      image: "/lab-drone.png",
      items: [
        { name: "Custom Drone Assembly Kits", qty: 0, unitCost: 30000, isLot: false },
        { name: "DJI Tello EDU Drones", qty: 0, unitCost: 16000, isLot: false },
        { name: "Spare Parts (Motors, Props, Batteries)", qty: 0, unitCost: 40000, isLot: true },
        { name: "Flight Controllers & Transmitters", qty: 0, unitCost: 50000, isLot: true }
      ]
    },
    {
      name: "Virtual Reality & Computer Vision",
      icon: "visibility",
      image: "/lab-vr.png",
      items: [
        { name: "Meta Quest 3 VR Headsets", qty: 0, unitCost: 55000, isLot: false },
        { name: "High-Performance Workstations", qty: 0, unitCost: 125000, isLot: false },
        { name: "Intel RealSense Depth Cameras", qty: 0, unitCost: 35000, isLot: false },
        { name: "Software Licenses & Assets", qty: 0, unitCost: 50000, isLot: true }
      ]
    },
    {
      name: "Artificial Intelligence Zone",
      icon: "smart_toy",
      image: "/lab-ai.png",
      items: [
        { name: "NVIDIA Jetson Nano Kits", qty: 0, unitCost: 15000, isLot: false },
        { name: "NVIDIA Jetson Orin Nano", qty: 0, unitCost: 45000, isLot: false },
        { name: "AI Edge Computing Nodes", qty: 0, unitCost: 60000, isLot: false },
        { name: "Cloud GPU Credits", qty: 0, unitCost: 50000, isLot: true }
      ]
    },
    {
      name: "Robotics & Automation Zone",
      icon: "precision_manufacturing",
      image: "/lab-robotics.png",
      items: [
        { name: "Dobot Magician Robotic Arm", qty: 0, unitCost: 180000, isLot: false },
        { name: "TurtleBot3 Burger/Waffle", qty: 0, unitCost: 75000, isLot: false },
        { name: "Custom Rover Chassis & Motors", qty: 0, unitCost: 20000, isLot: false },
        { name: "Pneumatic & Automation Kits", qty: 0, unitCost: 80000, isLot: true }
      ]
    },
    {
      name: "Innovation & Smart Learning Zone",
      icon: "lightbulb",
      image: "/lab-smartlearning.png",
      items: [
        { name: "Interactive Smart Panel (86”)", qty: 0, unitCost: 160000, isLot: false },
        { name: "Lab Branding & Posters", qty: 0, unitCost: 50000, isLot: true }
      ]
    }
  ]);

  const updateQuantity = (zoneIdx: number, itemIdx: number, delta: number) => {
    setZones(prevZones => {
      const newZones = JSON.parse(JSON.stringify(prevZones));
      const item = newZones[zoneIdx].items[itemIdx];
      item.qty = Math.max(0, item.qty + delta);
      return newZones;
    });
  };

  const calculateZoneTotal = (zoneIdx: number) => {
    return zones[zoneIdx].items.reduce((sum, item) => sum + (item.qty * item.unitCost), 0);
  };

  const calculateGrandSubtotal = () => {
    return zones.reduce((sum, _, zoneIdx) => sum + calculateZoneTotal(zoneIdx), 0);
  };

  const calculateGST = () => {
    return Math.round(calculateGrandSubtotal() * 0.18);
  };

  const calculateGrandTotal = () => {
    return calculateGrandSubtotal() + calculateGST();
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("en-IN");
  };

  const processSteps = [
    {
      step: "01",
      title: "Consultation & Lab Design",
      desc: "We analyze your campus space and tailor a custom lab architecture to fit your institution's specific goals.",
      image: "/pdet_stage1_airg.png"
    },
    {
      step: "02",
      title: "Hardware Procurement",
      desc: "Our team sources and delivers premium, industry-standard equipment directly to your campus.",
      image: "/hardware_procurement_new.png"
    },
    {
      step: "03",
      title: "Installation & Setup",
      desc: "AIR G engineers install all hardware, networking, and software, ensuring a seamless plug-and-play environment.",
      image: "/pdet_stage3_airg.png"
    },
    {
      step: "04",
      title: "Faculty Training",
      desc: "We conduct hands-on training for your faculty to ensure they can confidently deliver the Industry 4.0 curriculum.",
      image: "/pdet_stage4_airg.png"
    }
  ];

  return (
    <main className="relative min-h-screen bg-white selection:bg-primary/20 selection:text-primary overflow-x-hidden text-[#111827]">
      <Navbar />

      <div id="pdet-page-content-wrapper" className="print:hidden">
        {/* Scattered Technical HUD Telemetry Decors on Left & Right Margins */}
        <div className="absolute left-6 top-[20%] font-mono text-[9px] text-primary/30 uppercase tracking-[0.25em] space-y-4 select-none pointer-events-none hidden xl:block z-20">
          <div className="space-y-1">
            <div>[ DEPLOYMENT ACTIVE ]</div>
            <div className="text-[#111827]/25">// LAT_COORD: 28.6139° N</div>
            <div className="text-[#111827]/25">// LONG_COORD: 77.2090° E</div>
          </div>
          <div className="h-[100px] w-[1px] bg-gradient-to-b from-primary/30 to-transparent ml-2" />
          <div className="space-y-1">
            <div>[ HUB STATE: ONLINE ]</div>
            <div className="text-[#111827]/25">NODE ID: AIG-DEL-04</div>
            <div className="text-[#111827]/25">FREQ: 5.8 GHZ</div>
          </div>
        </div>

        <div className="absolute right-6 top-[35%] font-mono text-[9px] text-[#1a1a2e]/30 uppercase tracking-[0.25em] space-y-4 select-none pointer-events-none hidden xl:block z-20">
          <div className="space-y-1 text-right">
            <div>[ SYSTEM STATUS ]</div>
            <div className="text-[#111827]/20">CPU: 42.8% @ 4.2GHZ</div>
            <div className="text-[#111827]/20">MEM: 12.4GB / 32GB</div>
          </div>
          <div className="h-[100px] w-[1px] bg-gradient-to-b from-[#1a1a2e]/20 to-transparent mr-2 ml-auto" />
          <div className="space-y-1 text-right">
            <div>[ TELEMETRY NETWORK ]</div>
            <div className="text-[#111827]/20">PACKETS: 99.4% OK</div>
            <div className="text-[#111827]/20">LINK: SECURE SSH</div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="pt-32 pb-24 relative overflow-hidden bg-[#fafafa]">
          <div className="max-w-[1600px] mx-auto px-6 md:px-16 relative z-10">
            <div className="flex flex-col lg:flex-row gap-16 items-center">

              {/* Left Content */}
              <div className="flex-1 w-full text-left">
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest mb-8"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    Premium Offering
                  </motion.div>

                  <h1 className="font-headline text-5xl md:text-6xl lg:text-[72px] font-black tracking-tighter leading-[0.95] mb-8 uppercase text-[#0a0a14] text-left">
                    <span className="block overflow-hidden py-1">
                      <motion.span
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                        className="block"
                      >
                        Prototype
                      </motion.span>
                    </span>
                    <span className="block overflow-hidden py-1">
                      <motion.span
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        className="block"
                      >
                        Development &amp;
                      </motion.span>
                    </span>
                    <span className="block overflow-hidden py-1.5">
                      <motion.span
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                        className="block text-primary text-glow-red"
                      >
                        Emerging Tech Lab
                      </motion.span>
                    </span>
                  </h1>

                  <div className="overflow-hidden mb-10 max-w-xl">
                    <motion.p
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                      className="text-xl md:text-2xl text-[#111827]/60 font-medium leading-relaxed"
                    >
                      A state-of-the-art laboratory designed to transform innovative ideas into real-world industrial prototypes.
                    </motion.p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-[#111827]/40"
                  >
                    <span>Design</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                    <span>Build</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                    <span>Prototype</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                    <span>Innovate</span>
                  </motion.div>
                </div>
              </div>

              {/* Right Graphic (Dynamic Indian Lab Slideshow) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex-1 w-full relative"
              >
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative bg-gray-100">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent mix-blend-overlay z-10 pointer-events-none" />
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={labImages[currentImageIndex]}
                      alt="AIR G Indian Innovation Lab"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </AnimatePresence>
                  {/* Dots indicator at the bottom */}
                  {labImages.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                      {labImages.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`w-2 h-2 rounded-full transition-all ${currentImageIndex === idx ? "bg-primary w-5" : "bg-white/50 hover:bg-white"
                            }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Vision Statement */}
        <div className="py-32 bg-[#0a0a14] text-white text-center px-6 relative overflow-hidden">
          {/* Glowing background shapes */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute top-10 left-10 w-[200px] h-[200px] bg-[#ff4b5c]/5 rounded-full blur-[80px] pointer-events-none" />

          {/* Honeycomb grid overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
            backgroundImage: `radial-gradient(circle, rgba(238,44,60,0.15) 1px, transparent 1px), 
                            linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), 
                            linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)`,
            backgroundSize: '24px 24px, 48px 48px, 48px 48px'
          }}></div>

          <div className="max-w-[1400px] mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="glass-premium border border-white/10 bg-white/[0.04] backdrop-blur-md p-10 md:p-16 rounded-[3.5rem] relative overflow-hidden shadow-2xl group text-left"
            >
              {/* Top diagnostic element */}
              <div className="flex justify-between items-center mb-10 font-mono text-[9px] text-white/40 uppercase tracking-widest border-b border-white/5 pb-4 select-none">
                <div>// OBJECTIVE: SKILLS TRANSFORMATION</div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span>ENGAGEMENT ACTIVE</span>
                </div>
              </div>

              <h2 className="text-2xl md:text-3.5xl lg:text-[38px] font-black leading-[1.4] tracking-tight text-white/95 relative z-10 font-headline">
                "The <span className="text-primary text-glow-red font-black">PDET Lab</span> provides students with hands-on exposure to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#ff4b5c] font-black">Industry 4.0 and 5.0</span> technologies, enabling them to transform innovative ideas into <span className="text-white font-black border-b-2 border-primary/60 pb-1">real-world prototypes</span> while developing <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-primary/80 font-black">problem-solving &amp; entrepreneurship</span> skills."
              </h2>

              {/* Bottom Accent lines */}
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            </motion.div>
          </div>
        </div>

        {/* The 7 Innovation Zones — Immersive Dark Experience */}
        <div className="relative py-28 overflow-hidden" style={{ background: 'linear-gradient(165deg, #0a0a14 0%, #111827 40%, #1a1028 70%, #0f172a 100%)' }}>
          {/* Ambient Background Effects */}
          <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[150px] pointer-events-none animate-pulse" />
          <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-indigo-500/6 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-400/4 rounded-full blur-[100px] pointer-events-none" />

          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
          />

          <div className="max-w-[1650px] mx-auto px-6 md:px-16 relative z-10">
            {/* Section Header */}
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-6">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Lab Infrastructure
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 uppercase font-headline">The 7 Innovation Zones</h2>
                <p className="text-white/40 text-lg font-medium max-w-xl mx-auto">Select a zone to explore its equipment and customize quantities for your lab</p>
              </motion.div>
            </div>

            {/* Grid Layout: Left sidebar selector, Right content viewer */}
            <div className="grid lg:grid-cols-12 gap-8 items-start">

              {/* Left Column: Vertical Selector Grid (lg:col-span-4) */}
              <div className="lg:col-span-4 space-y-3.5 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
                {zones.map((zone, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveZone(idx)}
                    className={`w-full group relative flex items-center gap-4 p-4.5 rounded-[2rem] text-left transition-all duration-300 border select-none ${activeZone === idx
                      ? 'bg-primary text-white border-primary shadow-[0_0_30px_rgba(225,27,34,0.25)] scale-[1.02]'
                      : 'bg-white/[0.03] text-white/60 border-white/[0.05] hover:bg-white/[0.07] hover:text-white hover:border-white/10'
                      }`}
                  >
                    {/* Glowing selection indicator */}
                    {activeZone === idx && (
                      <div className="absolute right-4 w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                    )}

                    {/* Icon Panel */}
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors shrink-0 ${activeZone === idx ? 'bg-white/15 text-white' : 'bg-white/[0.06] text-primary group-hover:bg-white/10'
                      }`}>
                      <span className="material-symbols-outlined text-xl">{zone.icon}</span>
                    </div>

                    {/* Zone text */}
                    <div>
                      <span className={`font-mono text-[8px] uppercase tracking-widest font-black block mb-0.5 ${activeZone === idx ? 'text-white/60' : 'text-primary'
                        }`}>
                        Zone {String(idx + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-bold text-sm tracking-tight leading-snug">{zone.name}</h3>
                    </div>
                  </button>
                ))}
              </div>

              {/* Right Column: Immersive Content Viewer (lg:col-span-8) */}
              <div className="lg:col-span-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeZone}
                    initial={{ opacity: 0, y: 24, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -16, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full"
                  >
                    {/* Zone Image Banner */}
                    <div className="relative rounded-[2.5rem] overflow-hidden mb-8 aspect-[21/9] group border border-white/5">
                      <img
                        src={zones[activeZone].image}
                        alt={zones[activeZone].name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex items-end gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-lg shrink-0">
                          <span className="material-symbols-outlined text-white text-2xl">{zones[activeZone].icon}</span>
                        </div>
                        <div className="text-left">
                          <h3 className="text-xl md:text-2xl font-black text-white tracking-tight drop-shadow-lg uppercase font-headline">{zones[activeZone].name}</h3>
                          <p className="text-white/60 text-xs font-medium mt-0.5">{zones[activeZone].items.length} items configured · Customize quantities below</p>
                        </div>
                      </div>
                    </div>

                    {/* Equipment Items Table */}
                    <div className="space-y-3">
                      {zones[activeZone].items.map((item, i) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.35, delay: i * 0.05 }}
                          className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.06] hover:border-primary/20 transition-all duration-300 overflow-hidden"
                        >
                          {/* Hover Glow Effect */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-primary/5 to-transparent" />
                          </div>

                          <div className="relative z-10 flex items-center justify-between gap-4 p-5 md:p-6 text-left">
                            {/* Left: Number Badge + Name */}
                            <div className="flex items-center gap-4 min-w-0">
                              <div className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0">
                                <span className="text-white/30 text-xs font-bold tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                              </div>
                              <div className="min-w-0">
                                <span className="font-semibold text-white/90 text-[15px] leading-snug block truncate">
                                  {item.name}
                                </span>
                                {item.isLot && (
                                  <span className="text-xs text-primary/60 font-medium mt-0.5 block">Bundled Package</span>
                                )}
                              </div>
                            </div>

                            {/* Right: Quantity Control */}
                            <div className="flex items-center gap-0 shrink-0 rounded-xl border border-white/[0.08] bg-white/[0.03] overflow-hidden">
                              <button
                                onClick={() => updateQuantity(activeZone, i, -1)}
                                className="w-11 h-11 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200 select-none active:scale-90 border-r border-white/[0.06]"
                              >
                                <span className="material-symbols-outlined text-lg">remove</span>
                              </button>
                              <span className="w-16 text-center font-bold text-white text-sm tabular-nums px-2">
                                {item.isLot ? `${item.qty} Lot${item.qty > 1 ? 's' : ''}` : item.qty}
                              </span>
                              <button
                                onClick={() => updateQuantity(activeZone, i, 1)}
                                className="w-11 h-11 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200 select-none active:scale-90 border-l border-white/[0.06]"
                              >
                                <span className="material-symbols-outlined text-lg">add</span>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Zone Checkout Summary Panel with Live Totals */}
                    <div className="mt-8 rounded-[2rem] border border-white/[0.08] bg-white/[0.03] backdrop-blur-md overflow-hidden">
                      {/* Zone Subtotal Row */}
                      <div className="px-6 md:px-8 py-5 flex items-center justify-between border-b border-white/[0.06]">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary text-base">category</span>
                          </div>
                          <div>
                            <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest block">Zone {String(activeZone + 1).padStart(2, '0')} Subtotal</span>
                            <span className="text-white/70 text-xs font-medium">{zones[activeZone].name}</span>
                          </div>
                        </div>
                        <span className="text-white font-bold text-lg tabular-nums font-headline tracking-tight">₹{formatCurrency(calculateZoneTotal(activeZone))}</span>
                      </div>

                      {/* Items Breakdown Mini Summary */}
                      <div className="px-6 md:px-8 py-3 border-b border-white/[0.04] flex flex-wrap gap-x-4 gap-y-1">
                        {zones[activeZone].items.filter(item => item.qty > 0).map((item, i) => (
                          <span key={i} className="text-[10px] text-white/30 font-mono">
                            {item.name.split(' ')[0]}…×{item.qty} = ₹{formatCurrency(item.qty * item.unitCost)}
                          </span>
                        ))}
                        {zones[activeZone].items.filter(item => item.qty > 0).length === 0 && (
                          <span className="text-[10px] text-white/20 font-mono italic">No items selected in this zone</span>
                        )}
                      </div>

                      {/* All Zones Subtotal & GST Row */}
                      <div className="px-6 md:px-8 py-3.5 flex items-center justify-between border-b border-white/[0.04] bg-white/[0.01]">
                        <div className="flex items-center gap-6">
                          <span className="text-white/40 text-xs font-mono">
                            Subtotal: <strong className="text-white/80 font-bold">₹{formatCurrency(calculateGrandSubtotal())}</strong>
                          </span>
                          <span className="text-white/40 text-xs font-mono">
                            GST (18%): <strong className="text-primary font-bold">₹{formatCurrency(calculateGST())}</strong>
                          </span>
                        </div>
                        <span className="text-[10px] text-white/30 font-mono uppercase tracking-wider">18% GST Applicable</span>
                      </div>

                      {/* Grand Total + Checkout Button Row */}
                      <div className="px-6 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/[0.02]">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary text-xl">description</span>
                          </div>
                          <div>
                            <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest block">Grand Total (Incl. 18% GST)</span>
                            <span className="text-white font-extrabold text-2xl tabular-nums font-headline tracking-tighter">₹{formatCurrency(calculateGrandTotal())}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            // Only trigger receipt PDF download — no checkout modal
                            const hasItems = zones.some(z => z.items.some(item => item.qty > 0));
                            if (!hasItems) {
                              alert("Please add at least one item before generating a quotation.");
                              return;
                            }
                            window.print();
                          }}
                          className="w-full sm:w-auto px-10 py-4 bg-primary text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/25 flex items-center justify-center gap-3 select-none hover:scale-[1.03] active:scale-95"
                        >
                          <span>Download Quotation</span>
                          <span className="material-symbols-outlined text-sm">download</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>
        </div>



        {/* Deployment Process Timeline */}
        <div className="py-32 bg-[#fafafa] relative overflow-hidden">
          {/* Subtle grid background */}
          <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{
            backgroundImage: `radial-gradient(circle, #EE2C3C 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}></div>

          <div className="max-w-[1550px] mx-auto px-6 md:px-16 relative z-10">
            <div className="text-center mb-24 space-y-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                IMPLEMENTATION ROADMAP
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-[#0a0a14] tracking-tight uppercase font-headline">
                The AIR G <span className="text-primary text-glow-red">Deployment</span> Process
              </h2>
              <p className="text-[#111827]/50 font-medium max-w-xl mx-auto">
                A fully managed, white-glove service from procurement to curriculum integration.
              </p>
            </div>

            <div className="relative">
              {/* High-tech Gradient Timeline Line */}
              <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2.5px] bg-gradient-to-b from-[#EE2C3C] via-[#ff4b5c]/50 to-[#EE2C3C]/10 md:-translate-x-1/2 rounded-full" />

              <div className="space-y-16">
                {processSteps.map((step, idx) => (
                  <div key={idx} className={`flex flex-col md:flex-row gap-6 md:gap-0 items-center relative z-10 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                    {/* Text Card Section */}
                    <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${idx % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                      <motion.div
                        initial={{ opacity: 0, x: idx % 2 === 0 ? 30 : -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: idx * 0.05 }}
                        className="glass-premium p-8 md:p-10 rounded-[2.5rem] border border-black/5 bg-white hover:border-primary/20 hover:shadow-[0_20px_40px_rgba(238,44,60,0.04)] transition-all duration-300 relative group text-left"
                      >
                        {/* Interactive edge glow */}
                        <div className="absolute inset-y-0 w-[4px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full" style={{
                          left: idx % 2 === 0 ? 'auto' : '0px',
                          right: idx % 2 === 0 ? '0px' : 'auto'
                        }} />

                        <div className="space-y-3">
                          <span className="font-mono text-[9px] text-primary tracking-widest uppercase font-black">// STAGE {step.step}</span>
                          <h3 className="text-xl md:text-2xl font-black text-[#0a0a14] uppercase tracking-tight font-headline">{step.title}</h3>
                          <p className="text-sm text-[#111827]/50 font-light leading-relaxed">{step.desc}</p>
                        </div>
                      </motion.div>
                    </div>

                    {/* Glowing Node Badge (Center) */}
                    <div className="absolute left-[28px] md:left-1/2 w-14 h-14 shrink-0 bg-[#0a0a14] text-white rounded-full flex items-center justify-center font-mono font-bold shadow-[0_0_20px_rgba(238,44,60,0.15)] border-[3px] border-[#EE2C3C] md:-translate-x-1/2 z-20">
                      <span className="text-[#EE2C3C] text-glow-red text-sm font-black">{step.step}</span>
                    </div>

                    {/* Image Card Section (Opposite side) */}
                    <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${idx % 2 === 0 ? 'md:pl-16' : 'md:pr-16'} mt-4 md:mt-0`}>
                      <motion.div
                        initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                        className="aspect-[16/9] rounded-[2.5rem] overflow-hidden shadow-lg border border-black/5 hover:border-primary/20 transition-all duration-300 group bg-gray-50 relative"
                      >
                        <img
                          src={step.image}
                          alt={step.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                      </motion.div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ROI & Proposal Section */}
        <div id="proposal-section" className="py-24 bg-white relative">
          <div className="max-w-[1600px] mx-auto px-6 md:px-16">
            <div className="bg-gradient-to-br from-[#0c0c1e] to-[#05050f] rounded-[40px] overflow-hidden flex flex-col lg:flex-row border border-white/5 shadow-2xl relative">

              {/* Left side: Why Investment Matters */}
              <div className="p-10 md:p-16 flex-1 flex flex-col justify-center relative">
                {/* Background ambient red glow */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-8 tracking-tight font-headline">
                  Why This <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#ff5c6c]">Investment</span> Matters
                </h2>

                <ul className="space-y-6 relative z-10">
                  {[
                    "Attract top-tier students with cutting-edge facilities",
                    "Enable deep tech research and industrial prototyping",
                    "Prepare students for high-paying Industry 4.0 roles",
                    "Unlock government & corporate research grants"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4 group">
                      <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-1 transition-all duration-300 group-hover:bg-primary/20 group-hover:border-primary/40">
                        <span className="material-symbols-outlined text-primary text-base font-bold">check</span>
                      </div>
                      <span className="text-base md:text-lg text-white/80 font-medium group-hover:text-white transition-colors duration-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right side: Pricing & Call to action */}
              <div className="bg-gradient-to-br from-primary to-[#9f0019] p-10 md:p-16 lg:w-[460px] flex flex-col justify-center text-center text-white relative overflow-hidden shrink-0 border-t lg:border-t-0 lg:border-l border-white/10">
                {/* Geometric background patterns */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                  backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
                  backgroundSize: '16px 16px'
                }}></div>

                <span className="uppercase tracking-[0.2em] text-xs font-black text-white/80 mb-3 block font-mono">// TOTAL ESTIMATED INVESTMENT</span>

                <div className="text-4xl md:text-5xl font-black mb-2 tracking-tighter drop-shadow-md text-white whitespace-nowrap font-headline">
                  ₹{formatCurrency(calculateGrandTotal())}
                </div>

                <span className="text-white/70 mb-10 text-xs font-mono tracking-wider">Excluding taxes & logistics</span>

                <button
                  onClick={() => window.location.href = "/learning/ai-infrastructures"}
                  className="w-full bg-white hover:bg-gray-50 px-8 py-4 rounded-2xl font-black uppercase tracking-widest transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.03] active:scale-95 cursor-pointer !text-[#EB0028]"
                  style={{ color: '#EB0028' }}
                >
                  Request Proposal
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>

      {isCheckoutOpen && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => {
            setIsCheckoutOpen(false);
            setCheckoutItem(null);
          }}
          item={checkoutItem}
          type="product"
        />
      )}

      {/* PRINT-ONLY RECEIPT COMPONENT */}
      <div id="pdet-receipt-print-root" style={{ display: 'none' }}>
        <style dangerouslySetInnerHTML={{
          __html: `
          @page {
            size: A4;
            margin: 15mm;
          }
          @media print {
            #pdet-page-content-wrapper,
            nav,
            .print\\:hidden {
              display: none !important;
            }
            #pdet-receipt-print-root {
              display: block !important;
              position: absolute !important;
              left: 0 !important;
              top: 0 !important;
              width: 100% !important;
              background: white !important;
              color: black !important;
              font-family: Arial, Helvetica, sans-serif !important;
              font-size: 11px !important;
              line-height: 1.5 !important;
            }
            #pdet-receipt-print-root * {
              color-adjust: exact !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
          }
        `}} />

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '3px solid #EE2C3C', paddingBottom: '16px', marginBottom: '20px' }}>
          <div>
            <div style={{ fontSize: '22px', fontWeight: 900, color: '#EE2C3C', letterSpacing: '-0.5px' }}>AIR G INTERNATIONAL</div>
            <div style={{ fontSize: '10px', color: '#666', marginTop: '4px' }}>Prototype Development & Emerging Tech Lab (PDET)</div>
            <div style={{ fontSize: '10px', color: '#666' }}>Official Infrastructure Setup Quotation</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#333' }}>ESTIMATE / QUOTATION</div>
            <div style={{ fontSize: '10px', color: '#666', marginTop: '4px' }}>Date: {new Date().toLocaleDateString("en-IN")}</div>
          </div>
        </div>

        {/* Zone Tables */}
        {zones.map((zone, zIdx) => {
          const selectedItems = zone.items.filter(item => item.qty > 0);
          if (selectedItems.length === 0) return null;

          return (
            <div key={zIdx} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '12px', marginBottom: '16px', pageBreakInside: 'avoid' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#EE2C3C', borderBottom: '1px solid #eee', paddingBottom: '8px', marginBottom: '8px' }}>
                Zone {String(zIdx + 1).padStart(2, '0')}: {zone.name}
              </div>
              <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #ccc' }}>
                    <th style={{ textAlign: 'left', paddingBottom: '6px', color: '#555', fontWeight: 600 }}>Equipment Item</th>
                    <th style={{ width: '60px', textAlign: 'center', paddingBottom: '6px', color: '#555', fontWeight: 600 }}>Qty</th>
                    <th style={{ width: '100px', textAlign: 'right', paddingBottom: '6px', color: '#555', fontWeight: 600 }}>Unit Price</th>
                    <th style={{ width: '110px', textAlign: 'right', paddingBottom: '6px', color: '#555', fontWeight: 600 }}>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedItems.map((item, iIdx) => (
                    <tr key={iIdx} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '6px 0', color: '#333' }}>{item.name}</td>
                      <td style={{ padding: '6px 0', textAlign: 'center', color: '#444' }}>{item.isLot ? `${item.qty} Lot` : item.qty}</td>
                      <td style={{ padding: '6px 0', textAlign: 'right', color: '#444' }}>₹{formatCurrency(item.unitCost)}</td>
                      <td style={{ padding: '6px 0', textAlign: 'right', fontWeight: 600, color: '#222' }}>₹{formatCurrency(item.qty * item.unitCost)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ textAlign: 'right', marginTop: '8px', fontSize: '12px', fontWeight: 700, color: '#333' }}>
                Zone Subtotal: ₹{formatCurrency(calculateZoneTotal(zIdx))}
              </div>
            </div>
          );
        })}

        {/* ═══════ GRAND TOTAL & TAX BREAKDOWN ═══════ */}
        <div style={{ marginTop: '24px', borderTop: '3px solid #EE2C3C', paddingTop: '16px', pageBreakInside: 'avoid' }}>
          <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '6px 0', color: '#555', fontSize: '12px' }}>Equipment Subtotal (All Zones)</td>
                <td style={{ padding: '6px 0', textAlign: 'right', fontWeight: 600, color: '#333', fontSize: '13px' }}>
                  ₹{formatCurrency(calculateGrandSubtotal())}
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '6px 0', color: '#555', fontSize: '12px' }}>GST (18%)</td>
                <td style={{ padding: '6px 0', textAlign: 'right', fontWeight: 600, color: '#EE2C3C', fontSize: '13px' }}>
                  + ₹{formatCurrency(calculateGST())}
                </td>
              </tr>
              <tr>
                <td style={{ paddingTop: '12px', fontWeight: 800, fontSize: '16px', color: '#111' }}>GRAND TOTAL COST (INCL. 18% GST)</td>
                <td style={{ paddingTop: '12px', textAlign: 'right', fontWeight: 900, fontSize: '26px', color: '#EE2C3C', letterSpacing: '-1px' }}>
                  ₹{formatCurrency(calculateGrandTotal())}
                </td>
              </tr>
              <tr>
                <td style={{ color: '#888', fontSize: '10px' }}>All {zones.filter(z => z.items.some(i => i.qty > 0)).length} zone(s) included</td>
                <td style={{ textAlign: 'right', color: '#888', fontSize: '10px' }}>Includes 18% GST statutory tax</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Terms & Footer */}
        <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px solid #eee', fontSize: '9px', color: '#999', pageBreakInside: 'avoid' }}>
          <div style={{ fontWeight: 700, color: '#555', marginBottom: '4px' }}>Terms & Conditions:</div>
          <div>1. This PDF estimate is generated based on selected lab customizations.</div>
          <div>2. Pricing includes 18% GST. Final pricing is subject to shipping and installation logistics.</div>
          <div>3. Standard setup is fully managed and deployed by certified AIR G International engineers.</div>
          <div>4. Valid for 30 days from generation date.</div>
        </div>

        <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px solid #eee', textAlign: 'center', fontSize: '9px', color: '#aaa' }}>
          <div>AIR G International — Designing, Building, and Empowering Industry 4.0 Ecosystems Globally.</div>
          <div style={{ marginTop: '2px' }}>For support or proposal requests, contact: support@airg.international</div>
        </div>
      </div>
    </main>
  );
}