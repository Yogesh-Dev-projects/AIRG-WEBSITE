import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { labsData } from "@/data/labs";
import { Navbar } from "@/components/demo-navbar";
import ImageSlider from "@/components/ImageSlider";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function LabDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const lab = labsData.find((l) => l.slug === slug);

  if (!lab) {
    notFound();
  }

  return (
    <main className="w-full h-screen overflow-y-auto custom-scrollbar bg-[#fcfcfc] text-[#1a1a2e] relative selection:bg-primary/30 selection:text-[#1a1a2e]">
      {/* Background Decorative Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(238,44,60,0.015) 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        <div className="absolute top-[2%] right-[-10%] w-[600px] h-[600px] bg-[#EE2C3C]/5 rounded-full blur-[120px] opacity-70" />
        <div className="absolute top-[30%] left-[-10%] w-[500px] h-[500px] bg-blue-500/3 rounded-full blur-[100px] opacity-50" />
        <div className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] bg-[#EE2C3C]/3 rounded-full blur-[130px] opacity-60" />
      </div>

      <Navbar />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-20 pt-32 pb-24">
        {/* Navigation Breadcrumb & Back Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-black/5 pb-4">
          <div className="flex items-center gap-2 text-[10px] text-[#1a1a2e]/40 uppercase tracking-widest font-mono">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/#labs" className="hover:text-primary transition-colors">Innovation Labs</Link>
            <span>/</span>
            <span className="text-[#EE2C3C] font-bold">{lab.name}</span>
          </div>
          <Link 
            href="/#labs" 
            className="inline-flex items-center gap-2 px-4 py-2 border border-black/10 text-[#1a1a2e]/60 hover:text-red-600 hover:border-red-200 hover:bg-red-50/30 font-mono text-[9px] font-black uppercase tracking-wider rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-sm bg-white"
          >
            <span className="material-symbols-outlined text-[12px]">arrow_back</span>
            Back to AIR G Labs
          </Link>
        </div>

        {/* Hero Section - Title block & Stats on the right to fill empty space */}
        <div className="grid lg:grid-cols-5 gap-16 items-start mb-16 border-t-2 border-[#EE2C3C] pt-10">
          <div className="lg:col-span-3 space-y-6">
            <span className="px-3.5 py-1 bg-[#EE2C3C]/15 border-2 border-[#EE2C3C]/40 rounded-full text-[9px] font-extrabold text-[#EE2C3C] uppercase tracking-widest inline-flex items-center gap-1.5 font-sans">
              <span className="material-symbols-outlined text-[12px]">{lab.icon}</span>
              {lab.status}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-[#1a1a2e] tracking-tight uppercase font-sans leading-none">
              {lab.name}
            </h1>
            <p className="text-lg md:text-xl text-[#1a1a2e]/60 leading-relaxed font-light font-sans max-w-2xl">
              {lab.desc}
            </p>
          </div>

          {/* Quick Metrics on the right side of the Title block */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-[10px] font-black text-[#EE2C3C] tracking-widest uppercase mb-2 pl-2">
              // Lab Performance & Scope
            </div>
            <div className="grid grid-cols-1 gap-4">
              {lab.stats.map((stat, i) => {
                const theme = { 
                  bg: 'bg-gradient-to-br from-red-50/60 via-white to-red-50/10 border-red-100 hover:border-red-400/40', 
                  text: 'text-red-600', 
                  label: 'text-red-500/80' 
                };
                return (
                  <div key={i} className={`p-5 rounded-2xl border hover:scale-[1.02] hover:shadow-lg transition-all duration-300 flex flex-col gap-1 shadow-sm ${theme.bg}`}>
                    <div className={`text-[9px] uppercase tracking-widest font-mono font-black ${theme.label}`}>{stat.label}</div>
                    <div className={`text-2xl font-black tracking-tight font-sans ${theme.text}`}>{stat.value}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CLASSROOM GALLERY SWIPER COMES FIRST (Large & Centered directly under the title area) */}
        <div className="w-full mb-16">
          <ImageSlider 
            images={lab.images} 
            name={lab.name} 
            className="relative w-full aspect-[16/9] max-h-[620px] rounded-3xl overflow-hidden shadow-md border border-black/5 bg-black group select-none"
          />
          <div className="text-[9px] text-[#1a1a2e]/40 uppercase tracking-widest font-mono text-right mt-2 mr-2">
            Interactive Classroom View Gallery // Swipe or Click Arrows to Navigate
          </div>
        </div>

        {/* Detailed Information & Technical Specs */}
        <div className="grid lg:grid-cols-12 gap-12 items-start border-t border-black/5 pt-16">
          {/* Left Column: Description & Directives */}
          <div className="lg:col-span-7 space-y-8">
            {/* Mission Dossier */}
            <div className="p-8 rounded-[2rem] border border-red-100 bg-gradient-to-br from-white/95 to-red-50/30 shadow-sm space-y-4 hover:shadow-md hover:scale-[1.005] hover:border-red-400/30 transition-all duration-300 relative overflow-hidden">
              <div className="absolute right-6 top-6 text-red-500/5 font-serif text-8xl font-black select-none pointer-events-none">“</div>
              <div className="inline-flex items-center px-4 py-1.5 bg-red-600/10 border-2 border-red-600/30 rounded-full text-[10px] font-black text-red-600 uppercase tracking-widest font-mono relative z-10 mb-2">
                Mission Overview
              </div>
              <p className="text-base text-[#1a1a2e]/70 leading-relaxed font-sans text-justify font-light relative z-10">
                {lab.detailedDesc}
              </p>
            </div>

            {/* Core Research Directives */}
            <div className="p-8 rounded-[2rem] border border-red-100 bg-gradient-to-br from-white/95 to-red-50/30 shadow-sm space-y-6 hover:shadow-md hover:scale-[1.005] hover:border-red-400/30 transition-all duration-300">
              <div className="inline-flex items-center px-4 py-1.5 bg-red-600/10 border-2 border-red-600/30 rounded-full text-[10px] font-black text-red-600 uppercase tracking-widest font-mono mb-2">
                Key Focus & Projects
              </div>
              <div className="space-y-4">
                {lab.highlights.map((highlight, i) => {
                  const projectTitle = `Featured Project ${String(i + 1).padStart(2, '0')}`;
                  return (
                    <div key={i} className="p-6 rounded-2xl border border-red-100/50 bg-white hover:border-red-400/40 hover:shadow-md hover:scale-[1.01] transition-all duration-300 flex gap-4 items-start group">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-red-500 text-white font-mono font-black flex items-center justify-center shadow-md shadow-red-500/20 shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-black uppercase tracking-wide text-red-700/80 group-hover:text-red-600 transition-colors">{projectTitle}</h4>
                        <p className="text-xs text-[#1a1a2e]/60 leading-relaxed font-light">{highlight}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Equipment & Action */}
          <div className="lg:col-span-5 space-y-8">
            {/* Lab Hardware Specifications Widget */}
            <div className="p-8 rounded-[2rem] border border-red-100 bg-gradient-to-br from-white/95 to-red-50/30 shadow-sm space-y-5 hover:shadow-md hover:border-red-400/30 transition-all duration-300">
              <div className="inline-flex items-center px-4 py-1.5 bg-red-600/10 border-2 border-red-600/30 rounded-full text-[10px] font-black text-red-600 uppercase tracking-widest font-mono mb-2">
                Hardware & Network Configuration
              </div>
              <div className="space-y-3.5 text-xs">
                {[
                  { name: "AI Server Cluster", value: "Bharat AI Engine Local Host", icon: "dns" },
                  { name: "Connectivity Hub", value: "Offline MESH Connection", icon: "wifi" },
                  { name: "FDP Training", value: "Certified Teacher Training Provided", icon: "group" },
                  { name: "Curriculum Kits", value: "Grade-specific Assembly Kits", icon: "menu_book" }
                ].map((spec, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b border-black/5">
                    <div className="flex items-center gap-2.5 text-[#1a1a2e]/70 font-bold">
                      <span className="material-symbols-outlined text-base text-red-500">{spec.icon}</span>
                      {spec.name}
                    </div>
                    <div className="text-right text-[#1a1a2e]/50 font-mono text-[10px]">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technology Stack Panel */}
            <div className="p-8 rounded-[2rem] border border-red-100 bg-gradient-to-br from-white/95 to-red-50/30 shadow-sm space-y-5 hover:shadow-md hover:border-red-400/30 transition-all duration-300">
              <div className="inline-flex items-center px-4 py-1.5 bg-red-600/10 border-2 border-red-600/30 rounded-full text-[10px] font-black text-red-600 uppercase tracking-widest font-mono mb-2">
                Equipment & Tools Configured
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "AI & Computing Servers",
                  "Robotics Assembly Kits",
                  "Smart Sensors (IoT)",
                  "Drone & VR Systems",
                  "3D Printers",
                  "Branding Displays"
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-2 rounded-xl border border-red-100 bg-white hover:bg-red-50/40 text-[10px] font-bold text-red-700/80 uppercase tracking-wider flex items-center gap-2 hover:scale-[1.03] transition-all duration-300 shadow-sm hover:border-red-300 cursor-default"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Collaboration Action Panel */}
            <div className="p-8 rounded-[2rem] bg-gradient-to-tr from-[#1a1a2e] to-[#252542] text-white shadow-xl relative overflow-hidden group hover:shadow-2xl hover:scale-[1.01] transition-all duration-500">
              <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-primary/25 rounded-full blur-[70px] pointer-events-none group-hover:scale-125 transition-transform duration-700" />
              <div className="space-y-4 relative z-10">
                <h3 className="font-sans text-lg font-black text-white uppercase tracking-tight">Academic Collaboration</h3>
                <p className="text-white/60 text-xs font-sans leading-relaxed font-light">
                  Connect with this school's lab center to request student project portfolios, schedule visits, or coordinate STEM showcases.
                </p>
                <div className="flex flex-col gap-3 pt-2">
                  <a 
                    href={`https://wa.me/919860779172?text=Hello%2C%20I%20am%20interested%20in%20collaborating%20with%20the%20${encodeURIComponent(lab.name)}.%20Please%20share%20more%20details.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-6 py-4 bg-primary text-white font-extrabold text-[10px] uppercase tracking-widest rounded-xl hover:bg-[#d42535] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-primary/25 font-sans text-center block"
                  >
                    Contact Lab Center
                  </a>
                  <Link 
                    href="/#labs" 
                    className="w-full px-6 py-4 border border-white/10 hover:border-white/30 text-white/70 hover:text-white font-extrabold text-[10px] uppercase tracking-widest rounded-xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 font-sans text-center"
                  >
                    <span className="material-symbols-outlined text-xs">arrow_back</span>
                    Return to Hub
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* PDEA - AIR G GLOBAL AI TRANSFORMATION PROGRAM Section */}
        <div className="mt-24 border-t border-black/5 pt-20 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="font-headline text-3xl md:text-5xl font-black text-[#1a1a2e] uppercase tracking-tight leading-none">
              PDEA - AIR G <span className="text-primary text-glow-red">Global AI</span> Transformation Program
            </h2>
            <p className="text-xs md:text-sm text-primary font-bold tracking-[0.25em] uppercase font-mono">
              Today's Learning, Tomorrow's Leaders!
            </p>
          </div>

          {/* Curriculum / What Students Will Learn */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#1a1a2e] flex items-center gap-2.5 font-mono justify-center">
              <span className="material-symbols-outlined text-primary">school</span>
              Students Will Learn
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { title: "AI & Data", desc: "Understand and use AI to solve real problems", icon: "psychology" },
                { title: "Drone Technology", desc: "Build, fly and program drones", icon: "flight_takeoff" },
                { title: "VR Technology", desc: "Explore virtual worlds and learn by experience", icon: "vrpano" },
                { title: "Robotics", desc: "Design, build and automate robots", icon: "precision_manufacturing" },
                { title: "Innovation & Projects", desc: "Work on real-life projects and build solutions", icon: "hub" }
              ].map((item, idx) => (
                <div key={idx} className="glass-premium p-6 rounded-2xl border border-black/5 hover:border-primary/30 transition-all flex flex-col items-center text-center justify-between group h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                  </div>
                  <div className="mt-4 flex-grow">
                    <h4 className="text-sm font-bold text-[#1a1a2e] uppercase tracking-tight font-sans">{item.title}</h4>
                    <p className="text-xs text-[#1a1a2e]/55 mt-2 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* School Services We Provide */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#1a1a2e] flex items-center gap-2.5 font-mono justify-center">
              <span className="material-symbols-outlined text-primary">design_services</span>
              School Services We Provide
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Physical Lab Setup", desc: "Turnkey layout configuration, secure power lines management, safety branding, and ergonomic workstation setups built for group learning.", icon: "room" },
                { title: "Teacher Training (FDP)", desc: "Intensive 3-5 days Faculty Development Programs, ongoing monthly webinars, and continuous technical support with complete manuals.", icon: "group" },
                { title: "Curriculum Integration", desc: "Grade-specific activity booklets, video lessons libraries, and evaluation rubrics designed to blend with CBSE/ICSE or global curricula.", icon: "menu_book" },
                { title: "Advanced Kit Logistics", desc: "Direct delivery of certified drone assembly components, 3D printing filaments, VR headsets, and micro-controller modules.", icon: "local_shipping" },
                { title: "Global Certifications", desc: "Providing authorized certificates in AI, Drones, and IoT upon course completions to build students' academic profiles.", icon: "workspace_premium" },
                { title: "Club Hosting & Hackathons", desc: "Providing project mentors to run intra-school competitions, regional robotics tournaments, and science exhibitions.", icon: "emoji_events" }
              ].map((service, idx) => (
                <div key={idx} className="glass-premium p-6 rounded-[2rem] border border-black/5 hover:border-primary/20 transition-all duration-300 text-left flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined text-xl">{service.icon}</span>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-sm text-[#1a1a2e] uppercase tracking-wide leading-tight">{service.title}</h4>
                    <p className="text-xs text-[#1a1a2e]/55 leading-relaxed">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why Students Need Bharat AI Engine & How It Works */}
          <div className="glass-premium p-8 md:p-12 rounded-[2.5rem] border border-primary/20 bg-gradient-to-r from-primary/5 via-transparent to-transparent text-left">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Why & Detailing */}
              <div className="lg:col-span-7 space-y-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest font-mono">
                  // THE ENGINE OF STEM EDUCATION
                </span>
                <h3 className="font-headline text-2xl md:text-3xl font-black text-[#1a1a2e] uppercase tracking-tight">
                  Why Students Need the Bharat AI Engine
                </h3>
                <p className="text-sm text-[#1a1a2e]/65 leading-relaxed font-light">
                  Artificial Intelligence is reshaping the world, yet true hands-on AI learning is often limited by expensive cloud dependencies, security threats, and lack of specialized hardware. The <strong>Bharat AI Engine</strong> changes this by providing a localized, hardware-integrated AI cluster right in the school lab.
                </p>
                
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <span className="material-symbols-outlined text-primary shrink-0 mt-0.5">verified_user</span>
                    <div>
                      <h4 className="font-bold text-[#1a1a2e] text-sm uppercase tracking-wide">100% Safe Offline Sandbox</h4>
                      <p className="text-[#1a1a2e]/55 text-xs font-medium">Students can interact with large language models, image generators, and robotics controllers locally without internet access—preventing exposure to online hazards.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="material-symbols-outlined text-primary shrink-0 mt-0.5">hardware</span>
                    <div>
                      <h4 className="font-bold text-[#1a1a2e] text-sm uppercase tracking-wide">Direct Hardware Integration</h4>
                      <p className="text-[#1a1a2e]/55 text-xs font-medium">Allows students to write code that controls physical hardware—drones, smart sensors, and automated robotics arms—in real-time through the local Edge GPU engine.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: How it works step-by-step */}
              <div className="lg:col-span-5 space-y-6 border-l border-black/5 pl-0 lg:pl-8">
                <h4 className="text-xs font-mono font-black text-primary uppercase tracking-[0.2em]">
                  How Does It Work?
                </h4>
                <div className="space-y-6">
                  {[
                    { step: "01", title: "Local Edge Host", desc: "The Bharat AI Engine acts as a central offline server node deployed directly in the school computer lab." },
                    { step: "02", title: "MESH Connection", desc: "Multiple student workstations connect to the server over a high-speed local network with zero lag." },
                    { step: "03", title: "Interactive Experiments", desc: "Students load pre-configured offline labs (SIA chat, vision recognition, drone automation) and execute code." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center text-primary font-mono font-bold text-xs shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h5 className="font-bold text-[#1a1a2e] text-xs uppercase tracking-wide">{item.title}</h5>
                        <p className="text-[#1a1a2e]/50 text-[11px] leading-relaxed mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Two-Column Grid: Importance vs Good News */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Column 1: Why Is This Important? */}
            <div className="glass-premium p-8 md:p-10 rounded-[2.5rem] border border-black/5 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold uppercase tracking-widest text-[#1a1a2e] flex items-center gap-2.5 font-mono mb-8">
                  <span className="w-1.5 h-6 bg-primary rounded-full" />
                  Why Is This Important?
                </h3>
                <div className="space-y-6">
                  {[
                    { text: "Future Ready Skills for the 21st Century", icon: "school" },
                    { text: "Builds Confidence, Creativity & Innovation", icon: "person" },
                    { text: "Better Career Opportunities", icon: "trending_up" },
                    { text: "Prepares Students to Compete in a Global World", icon: "public" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center text-primary shrink-0">
                        <span className="material-symbols-outlined text-base">{item.icon}</span>
                      </div>
                      <p className="text-sm text-[#1a1a2e]/70 leading-relaxed font-sans mt-1">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2: Good News for Parents */}
            <div className="glass-premium p-8 md:p-10 rounded-[2.5rem] border border-black/5 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold uppercase tracking-widest text-[#1a1a2e] flex items-center gap-2.5 font-mono mb-8">
                  <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                  Good News for Parents
                </h3>
                <div className="space-y-6">
                  {[
                    { num: "01", text: "Students learning cutting-edge technology at school" },
                    { num: "02", text: "Being ready for the future" },
                    { num: "03", text: "Learning coding, get certification & inspiration from school age" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 font-mono font-bold text-xs shrink-0">
                        {item.num}
                      </div>
                      <p className="text-sm text-[#1a1a2e]/70 leading-relaxed font-sans mt-1">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
