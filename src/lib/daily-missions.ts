import { Zap, Swords, Sparkles, BookOpen, Target, Brain, Code2, Globe, Shield, Star } from "lucide-react";

export interface Mission {
  id: string;
  title: string;
  reward: number;
  icon: any;
  href?: string;
  category: string;
}

export const MISSION_POOL: Mission[] = [
  { id: "ai-m1", title: "Finish AI Mastery Module 1", reward: 50, icon: Zap, href: "/courses/mock-ai-mastery", category: "AI" },
  { id: "nextjs-video", title: "Watch Next.js Server Actions", reward: 30, icon: Globe, href: "/courses/mock-nextjs", category: "Web" },
  { id: "uiux-quiz", title: "Complete UI/UX Design Quiz", reward: 100, icon: Swords, href: "/video-demo", category: "Design" },
  { id: "ds-explore", title: "Explore Data Science Projects", reward: 40, icon: Brain, href: "/courses/mock-datascience", category: "Data" },
  { id: "genai-practice", title: "Practice Prompt Engineering", reward: 25, icon: Sparkles, href: "/courses/mock-gen-ai", category: "AI" },
  { id: "deep-review", title: "Review Deep Learning Concepts", reward: 60, icon: Target, href: "/courses/mock-neural-networks", category: "AI" },
  { id: "nlp-read", title: "Read NLP Sentiment Analysis", reward: 45, icon: BookOpen, href: "/courses/mock-nlp-python", category: "AI" },
  { id: "adv-enroll", title: "Enroll in Adv AI Architectures", reward: 20, icon: Trophy, href: "/firestore-courses", category: "AI" },
  { id: "rate-course", title: "Rate Your Recent Course", reward: 15, icon: Star, href: "/firestore-courses", category: "Feedback" },
  { id: "submit-hub", title: "Check Your Submissions Hub", reward: 10, icon: Code2, href: "/submissions", category: "Academic" }
];

// Simple helper to get icons since Lucide icons aren't easily serializable if we were to move this to DB
export const getMissionIcon = (iconName: string) => {
  const icons: any = { Zap, Swords, Sparkles, BookOpen, Target, Brain, Code2, Globe, Shield, Star };
  return icons[iconName] || BookOpen;
};

// Seeded random function
function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

export function getDailyMissions(count: number = 3): Mission[] {
  // Get date as a number (e.g. 20260509)
  const date = new Date();
  const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  
  const shuffled = [...MISSION_POOL];
  let currentSeed = seed;

  // Fisher-Yates shuffle with seeded random
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(currentSeed++) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
}

// Mock Trophy, ShoppingBag, MapPin since they weren't in the import
import { Trophy, ShoppingBag, MapPin } from "lucide-react";
