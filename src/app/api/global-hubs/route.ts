import { NextResponse } from "next/server";

export interface Hub {
  id: string;
  name: string;
  location: string;
  stats: { label: string; value: string }[];
  description: string;
  coordinates: { x: number; y: number };
  coordinator?: string;
  flyer?: string;
}

export async function GET() {
  const hubs: Record<string, Hub> = {
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

  return NextResponse.json({ success: true, hubs });
}
