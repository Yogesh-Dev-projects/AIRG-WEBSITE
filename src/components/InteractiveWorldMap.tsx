import { useState, useEffect } from "react";
import worldMapPaths from "./worldMapPaths.json";

export interface Hub {
  id: string;
  name: string;
  location: string;
  stats: { label: string; value: string }[];
  description: string;
  coordinates: { x: number; y: number }; // Tooltip position on SVG
  coordinator?: string;
  flyer?: string;
}

interface InteractiveWorldMapProps {
  onSelectHub: (hub: Hub | null) => void;
}

// Fallback initial hubs
const fallbackHubs: Record<string, Hub> = {
  in: {
    id: "in",
    name: "India Core Hub",
    location: "Pune / Satara, MH",
    stats: [
      { label: "Active Centres", value: "15 Centres" },
      { label: "Students Reached", value: "3,500+" },
      { label: "Focus", value: "Robotics Labs" }
    ],
    description: "The primary operational and development center hosting curriculum development, engineering workshops, and IoT school deployments.",
    coordinates: { x: 719, y: 207 },
    coordinator: "Pratap Pawar"
  },
  ke: {
    id: "ke",
    name: "Kenya Outreach Hub",
    location: "Nairobi Academy, Nairobi",
    stats: [
      { label: "Active Centres", value: "3 Centres" },
      { label: "Students Reached", value: "850+" },
      { label: "Focus", value: "AgriTech & Coding" }
    ],
    description: "Empowering rural students with IoT sensor deployment and drone navigation.",
    coordinates: { x: 605, y: 250 },
    coordinator: "Mr. Haggai Mosses",
    flyer: "/kenya-founder-v2.png"
  },
  ng: {
    id: "ng",
    name: "Nigeria Core Hub",
    location: "Nigeria School Network",
    stats: [
      { label: "Active Centres", value: "8 Centres" },
      { label: "Students Reached", value: "2,100+" },
      { label: "Focus", value: "AIG Innovation & STEM" }
    ],
    description: "Empowering students in Nigeria through advanced curriculum integration, robotics training, and technology-driven education solutions.",
    coordinates: { x: 520, y: 220 },
    coordinator: "Mr. Abdulrazaq Chubado",
    flyer: "/nigeria-founder.png"
  },
  sd: {
    id: "sd",
    name: "Sudan Core Hub",
    location: "Sudan Education Grid",
    stats: [
      { label: "Active Centres", value: "4 Centres" },
      { label: "Students Reached", value: "1,200+" },
      { label: "Focus", value: "STEM & Robotics" }
    ],
    description: "Driving digital literacy and technical training initiatives in collaboration with local schools.",
    coordinates: { x: 570, y: 220 },
    coordinator: "Mr. Yassin Adam",
    flyer: "/sudan-founder.png"
  },
  kh: {
    id: "kh",
    name: "Cambodia Core Hub",
    location: "Western International School, Phnom Penh",
    stats: [
      { label: "Active Centres", value: "4 Centres" },
      { label: "Students Reached", value: "1,200+" },
      { label: "Focus", value: "Robotics Labs" }
    ],
    description: "Deploying high-quality modular educational kits and training local teachers.",
    coordinates: { x: 791, y: 226 },
    coordinator: "Western International School",
    flyer: "/cambodia-founder.png"
  },
  np: {
    id: "np",
    name: "Nepal Outreach Hub",
    location: "Kathmandu Valley Network",
    stats: [
      { label: "Active Centres", value: "5 Centres" },
      { label: "Students Reached", value: "1,500+" },
      { label: "Focus", value: "STEM Education" }
    ],
    description: "Promoting scientific reasoning and technical bootcamps for primary and secondary students.",
    coordinates: { x: 745, y: 205 },
    coordinator: "Mr. Aniket Singh",
    flyer: "/nepal-founder.png"
  },
  ye: {
    id: "ye",
    name: "Yemen Core Hub",
    location: "Yemen Tech Outreach",
    stats: [
      { label: "Active Centres", value: "3 Centres" },
      { label: "Students Reached", value: "750+" },
      { label: "Focus", value: "Digital Skills & IoT" }
    ],
    description: "Delivering modern computing courses and practical training workshops in robotics and automation.",
    coordinates: { x: 645, y: 215 },
    coordinator: "Mr. Murhib Alahmar",
    flyer: "/yemen-founder.png"
  }
};

export default function InteractiveWorldMap({ onSelectHub }: InteractiveWorldMapProps) {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [hoveredCountryName, setHoveredCountryName] = useState<string | null>(null);
  const [activeHubId, setActiveHubId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [globalHubs, setGlobalHubs] = useState<Record<string, Hub>>(fallbackHubs);

  useEffect(() => {
    // Fetch live global hubs data from API
    fetch("/api/global-hubs")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.hubs) {
          setGlobalHubs(data.hubs);
        }
      })
      .catch((err) => console.error("Error fetching global hubs:", err));
  }, []);

  const handleSelect = (id: string) => {
    const hub = globalHubs[id];
    if (hub) {
      setActiveHubId(id);
      onSelectHub(hub);
    }
  };

  return (
    <div 
      className="relative w-full aspect-[4/3] md:aspect-[2/1] bg-slate-50/50 rounded-[2rem] md:rounded-[3rem] border border-black/5 p-2 flex items-center justify-center overflow-hidden"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
    >
      {/* Geographically Accurate Outlined SVG World Map */}
      <svg
        viewBox={worldMapPaths.viewBox}
        className="w-full h-auto drop-shadow-[0_0_80px_rgba(235,0,40,0.06)] select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* State Hover Gradient */}
          <linearGradient id="state-hover-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff5c6c" />
            <stop offset="100%" stopColor="#EB0028" />
          </linearGradient>
        </defs>

        {/* World Countries political boundaries */}
        <g strokeWidth="0.5" className="transition-all duration-300">
          {worldMapPaths.features.map((feature) => {
            const countryId = feature.id.toLowerCase();
            const isHovered = hoveredCountry === countryId;
            
            // Check if this country is a hub region and should be highlighted
            const isHub = globalHubs[countryId] !== undefined;
            const isActive = activeHubId === countryId;

            return (
              <path
                key={feature.id}
                d={feature.path}
                fill={
                  isHovered
                    ? "url(#state-hover-gradient)"
                    : isHub || isActive
                      ? "rgba(235, 0, 40, 0.10)"
                      : "rgba(0,0,0,0.04)"
                }
                stroke={
                  isHovered
                    ? "#ff5c6c"
                    : isHub || isActive
                      ? "rgba(235, 0, 40, 0.70)"
                      : "rgba(0,0,0,0.22)"
                }
                strokeWidth={isHovered ? "2.2" : isHub || isActive ? "1.6" : "0.8"}
                className="transition-all duration-150"
                style={{
                  cursor: isHub ? "pointer" : "default",
                  transform: isHovered ? "scale(1.005)" : "scale(1)",
                  transformOrigin: "center",
                  transformBox: "fill-box",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                onMouseEnter={() => {
                  setHoveredCountry(countryId);
                  setHoveredCountryName(feature.name);
                }}
                onMouseLeave={() => {
                  setHoveredCountry(null);
                  setHoveredCountryName(null);
                }}
                onClick={() => {
                  if (isHub) {
                    handleSelect(countryId);
                  }
                }}
              />
            );
          })}
        </g>
      </svg>

      {/* Floating Tooltip for Country Hover */}
      {hoveredCountry && hoveredCountryName && (
        <div
          className="absolute z-[200] pointer-events-none"
          style={{
            left: mousePos.x + 20,
            top: mousePos.y - 10,
          }}
        >
          <div className="px-5 py-4 rounded-xl border border-black/10 shadow-xl min-w-[200px] bg-white text-[#1a1a2e] font-sans">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono text-[#1a1a2e]/40 uppercase tracking-widest">
                {hoveredCountry.toUpperCase()}
              </span>
            </div>
            <h4 className="text-sm font-headline font-bold text-[#1a1a2e] uppercase tracking-tight">
              {hoveredCountryName}
            </h4>
            {globalHubs[hoveredCountry] && (
              <div className="mt-2 pt-2 border-t border-black/10">
                <span className="text-[9px] font-mono text-primary font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[10px]">touch_app</span>
                  Click to view hub profile
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
