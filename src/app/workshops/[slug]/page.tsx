import { Navbar } from "@/components/demo-navbar";
import { workshopsData } from "@/data/workshops";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function WorkshopDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const workshop = workshopsData.find((w) => w.slug === slug);

  if (!workshop) {
    notFound();
  }

  return (
    <main className="w-full h-screen overflow-y-auto custom-scrollbar bg-[#ffffff] text-[#1a1a2e] relative selection:bg-primary/30 selection:text-[#1a1a2e]">
      {/* Background Grid & Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[45%] h-[45%] bg-secondary/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(235,0,40,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-70" />
      </div>

      <Navbar />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-20 pt-32 pb-24">
        {/* Breadcrumb & Navigation helper */}
        <div className="flex items-center gap-2 text-[10px] text-[#1a1a2e]/30 font-mono tracking-widest uppercase mb-8">
          <Link href="/" className="hover:text-primary transition-colors">OPERATIONS</Link>
          <span>/</span>
          <Link href="/#workshops" className="hover:text-primary transition-colors">FIELD RECORDS</Link>
          <span>/</span>
          <span className="text-primary">{workshop.title}</span>
        </div>

        {/* Hero Title Grid */}
        <div className="mb-16 relative">
          <div className="absolute left-[-20px] top-0 h-full w-[2.5px] bg-gradient-to-b from-[#EE2C3C] via-[#EE2C3C]/20 to-transparent">
            <div className="absolute top-0 left-[-5px] w-3 h-3 bg-primary rounded-full animate-pulse shadow-[0_0_12px_#EE2C3C]" />
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-primary/10 border border-primary/25 rounded-full text-[8.5px] font-black font-mono text-primary uppercase tracking-widest">
              {workshop.category}
            </span>
            <span className="text-[10px] text-[#1a1a2e]/20 font-mono">/ ARCHIVE-ID: {slug.toUpperCase()}</span>
            <span className="text-[#1a1a2e]/20 font-mono">|</span>
            <span className="text-[10px] text-primary font-mono font-bold uppercase">{workshop.location}</span>
            <span className="text-[#1a1a2e]/20 font-mono">|</span>
            <span className="text-[10px] text-[#1a1a2e]/40 font-mono">{workshop.date}</span>
          </div>

          <h1 className="font-headline text-4xl md:text-7xl font-black text-[#1a1a2e] uppercase tracking-tighter leading-none mb-6">
            {workshop.title}
          </h1>
          <p className="text-[#1a1a2e]/50 text-lg md:text-xl font-light leading-relaxed max-w-3xl border-l border-primary/20 pl-6">
            {workshop.desc}
          </p>
        </div>

        {/* 2-Column Details Layout */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Left Column: Description & Highlights (3 cols) */}
          <div className="lg:col-span-3 space-y-12">
            {/* Mission Overview */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-black/5 pb-4">
                <span className="material-symbols-outlined text-primary text-xl">segment</span>
                <h3 className="font-headline text-xl font-bold uppercase tracking-widest text-[#1a1a2e]">Mission Overview</h3>
              </div>
              <p className="text-[#1a1a2e]/60 leading-relaxed font-light text-base text-justify">
                {workshop.detailedDesc}
              </p>
            </div>

            {/* Key Accomplishments & Highlights */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-black/5 pb-4">
                <span className="material-symbols-outlined text-primary text-xl">emoji_events</span>
                <h3 className="font-headline text-xl font-bold uppercase tracking-widest text-[#1a1a2e]">Key Accomplishments</h3>
              </div>
              <ul className="space-y-4">
                {workshop.highlights.map((highlight, i) => (
                  <li key={i} className="flex gap-4 items-start group">
                    <span className="w-6 h-6 rounded border border-primary/20 bg-primary/5 flex items-center justify-center text-[10px] font-mono font-bold text-primary shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      0{i + 1}
                    </span>
                    <p className="text-[#1a1a2e]/60 text-sm md:text-base font-light leading-relaxed">
                      {highlight}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Visual Preview & Meta Info (2 cols) */}
          <div className="lg:col-span-2 space-y-8 sticky top-28">
            {/* Visual Record */}
            <div className="glass-premium rounded-3xl overflow-hidden border border-black/10 bg-white/40 relative aspect-[16/10] w-full shadow-md">
              <div className="scanning-line" />
              <Image
                src={workshop.url}
                alt={workshop.title}
                fill
                className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 500px"
                priority
              />
              <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/75 backdrop-blur-md rounded border border-black/10 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                <span className="text-[8px] font-mono font-black text-[#1a1a2e]/60 uppercase tracking-widest">Live Feed Record</span>
              </div>
            </div>

            {/* Simple date and location info */}
            <div className="glass-premium p-6 rounded-2xl border border-black/5 space-y-4 font-mono text-[11px] bg-gradient-to-br from-black/[0.01] to-transparent shadow-sm">
              <div className="flex justify-between items-center text-[#1a1a2e]/40">
                <span>LOCATION</span>
                <span className="text-[#1a1a2e] font-bold font-headline uppercase text-right">{workshop.location}</span>
              </div>
              <div className="flex justify-between items-center text-[#1a1a2e]/40">
                <span>DATE</span>
                <span className="text-[#1a1a2e] font-bold font-headline uppercase text-right">{workshop.date}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions / Interactive Panel */}
        <div className="mt-20 border-t border-black/5 pt-12">
          <div className="glass-premium p-10 rounded-[2.5rem] border border-primary/20 bg-gradient-to-r from-primary/5 via-transparent to-transparent flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
            <div className="space-y-2">
              <h3 className="font-headline text-2xl font-black text-[#1a1a2e] uppercase tracking-tight">Need Archival Telemetry?</h3>
              <p className="text-[#1a1a2e]/40 text-sm max-w-xl font-light">
                Request full data logs, sensor streams, and codebase repositories related to this deployment for educational or audit purposes.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 shrink-0 w-full md:w-auto justify-end">
              <button className="px-8 py-4 bg-primary text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] glow-red shrink-0 w-full sm:w-auto">
                Request Access
              </button>
              <Link 
                href="/#workshops" 
                className="px-8 py-4 glass-premium text-[#1a1a2e]/60 hover:text-[#1a1a2e] font-bold text-xs uppercase tracking-widest rounded-xl border border-black/5 hover:border-black/20 transition-all duration-300 flex items-center justify-center gap-2 shrink-0 w-full sm:w-auto shadow-sm"
              >
                Return to Matrix
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
