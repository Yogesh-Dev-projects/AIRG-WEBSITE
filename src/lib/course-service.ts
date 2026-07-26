import {
  isFirebaseConfigured,
} from "./firebase";
import type { Course, CourseInput, Lesson } from "./firestore-types";

// Collection reference name (kept for localStorage key)
const COURSES_STORAGE_KEY = "local_courses";

// Mock data for fallback (YouTube courses)
export const MOCK_COURSES: Course[] = [
  {
    id: "mock-ai-mastery",
    title: "AI Mastery with Python (CS50)",
    description: "Learn the foundations of artificial intelligence and machine learning using Python. This course explores the concepts and algorithms that foundation modern AI.",
    videoUrl: "https://www.youtube.com/watch?v=5NgNicANyqM",
    thumbnailUrl: "https://img.youtube.com/vi/5NgNicANyqM/hqdefault.jpg",
    price: 499,
    originalPrice: 1999,
    instructorId: "youtube-cs50",
    instructorName: "Harvard CS50",
    category: "Artificial Intelligence",
    level: "intermediate",
    duration: "12h 45m",
    totalLessons: 7,
    rating: 4.9,
    reviewCount: 15420,
    studentCount: 85000,
    tags: ["AI", "Python", "Machine Learning"],
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "mock-nextjs",
    title: "Next.js 14 Full Stack Development",
    description: "Master the latest Next.js 14 features including App Router, Server Actions, and Data Fetching. Build a full-stack application from scratch.",
    videoUrl: "https://www.youtube.com/watch?v=wm5gMKuwSYk",
    thumbnailUrl: "https://img.youtube.com/vi/wm5gMKuwSYk/hqdefault.jpg",
    price: 299,
    originalPrice: 999,
    instructorId: "youtube-jsmastery",
    instructorName: "JavaScript Mastery",
    category: "Web Development",
    level: "beginner",
    duration: "8h 15m",
    totalLessons: 12,
    rating: 4.8,
    reviewCount: 8900,
    studentCount: 45000,
    tags: ["Next.js", "React", "Full Stack"],
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "mock-uiux",
    title: "Modern UI/UX Design Fundamentals",
    description: "Learn the principles of modern UI/UX design. Master color theory, typography, and layout to create stunning user interfaces.",
    videoUrl: "https://www.youtube.com/watch?v=68w2VwalD5w",
    thumbnailUrl: "https://img.youtube.com/vi/68w2VwalD5w/hqdefault.jpg",
    price: 0,
    originalPrice: 499,
    instructorId: "youtube-designcourse",
    instructorName: "DesignCourse",
    category: "Design",
    level: "beginner",
    duration: "5h 30m",
    totalLessons: 10,
    rating: 4.7,
    reviewCount: 5600,
    studentCount: 22000,
    tags: ["UI/UX", "Design", "Figma"],
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "mock-datascience",
    title: "Data Science for Beginners",
    description: "Start your journey into Data Science. Learn NumPy, Pandas, Matplotlib, and Scikit-Learn to analyze data and build models.",
    videoUrl: "https://www.youtube.com/watch?v=rfscVS0vtbw",
    thumbnailUrl: "https://img.youtube.com/vi/rfscVS0vtbw/hqdefault.jpg",
    price: 699,
    originalPrice: 2499,
    instructorId: "youtube-freecodecamp",
    instructorName: "freeCodeCamp",
    category: "Data Science",
    level: "beginner",
    duration: "10h 20m",
    totalLessons: 15,
    rating: 4.9,
    reviewCount: 21000,
    studentCount: 120000,
    tags: ["Data Science", "Python", "Analysis"],
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "mock-gen-ai",
    title: "Generative AI for Beginners",
    description: "Master the fundamentals of Large Language Models (LLMs) and Prompt Engineering. Learn how to build AI-powered applications from scratch.",
    videoUrl: "https://www.youtube.com/watch?v=Jm3Xm2xXWJ8",
    thumbnailUrl: "/images/gen-ai.png",
    price: 0,
    originalPrice: 2999,
    instructorId: "youtube-google",
    instructorName: "Google Cloud",
    category: "Artificial Intelligence",
    level: "beginner",
    duration: "12h 45m",
    totalLessons: 18,
    rating: 4.9,
    reviewCount: 45200,
    studentCount: 250000,
    tags: ["Gen AI", "LLM", "Google"],
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "mock-neural-networks",
    title: "Deep Learning & Neural Networks",
    description: "A comprehensive guide to building neural networks. Explore Backpropagation, CNNs, and RNNs in depth with practical implementations.",
    videoUrl: "https://www.youtube.com/watch?v=aircAruvnKk",
    thumbnailUrl: "https://img.youtube.com/vi/aircAruvnKk/hqdefault.jpg",
    price: 499,
    originalPrice: 1999,
    instructorId: "youtube-3blue1brown",
    instructorName: "3Blue1Brown",
    category: "Artificial Intelligence",
    level: "advanced",
    duration: "8h 30m",
    totalLessons: 12,
    rating: 5.0,
    reviewCount: 128000,
    studentCount: 850000,
    tags: ["Neural Networks", "Math", "AI"],
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "mock-nlp-python",
    title: "NLP with Python Masterclass",
    description: "Learn Natural Language Processing (NLP) from basics to advanced. Covers Tokenization, Sentiment Analysis, and Transformer models.",
    videoUrl: "https://www.youtube.com/watch?v=X2vAabgKiuM",
    thumbnailUrl: "https://img.youtube.com/vi/X2vAabgKiuM/hqdefault.jpg",
    price: 299,
    originalPrice: 1499,
    instructorId: "youtube-krishnaik",
    instructorName: "Krish Naik",
    category: "Artificial Intelligence",
    level: "intermediate",
    duration: "15h 20m",
    totalLessons: 22,
    rating: 4.8,
    reviewCount: 12500,
    studentCount: 65000,
    tags: ["NLP", "Python", "AI"],
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "mock-prompt-eng",
    title: "Deep Learning: Advanced Architectures",
    description: "Explore the sophisticated mathematics behind state-of-the-art neural networks. Master complex architectures, optimization functions, and high-dimensional vector spaces.",
    videoUrl: "https://www.youtube.com/watch?v=aircAruvnKk",
    thumbnailUrl: "/images/prompt-eng.png",
    price: 0,
    originalPrice: 1999,
    instructorId: "youtube-3blue1brown",
    instructorName: "3Blue1Brown",
    category: "Artificial Intelligence",
    level: "advanced",
    duration: "4h 45m",
    totalLessons: 10,
    rating: 4.9,
    reviewCount: 85400,
    studentCount: 450000,
    tags: ["AI", "Harvard", "CS50"],
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

// Helper to get merged courses (Static + Local Storage)
function getMergedCourses(): Course[] {
  if (typeof window === "undefined") return MOCK_COURSES;
  
  const localCoursesJson = localStorage.getItem(COURSES_STORAGE_KEY);
  const localCourses: Course[] = localCoursesJson ? JSON.parse(localCoursesJson) : [];
  
  return [...MOCK_COURSES, ...localCourses];
}

// Get all published courses
export async function getCourses(maxResults?: number): Promise<Course[]> {
  try {
    const res = await fetch(`/api/courses?limit=${maxResults || 20}`);
    if (!res.ok) throw new Error("Failed to fetch courses");
    return res.json();
  } catch (error) {
    console.error("getCourses error:", error);
    return MOCK_COURSES.slice(0, maxResults || 20); // Fallback
  }
}

// Get courses by category
export async function getCoursesByCategory(category: string): Promise<Course[]> {
  try {
    const res = await fetch(`/api/courses?category=${category}`);
    if (!res.ok) throw new Error("Failed to fetch courses by category");
    return res.json();
  } catch (error) {
    console.error("getCoursesByCategory error:", error);
    return MOCK_COURSES.filter(c => c.category === category);
  }
}

// Get a single course by ID
export async function getCourseById(courseId: string): Promise<Course | null> {
  try {
    const res = await fetch(`/api/courses/${courseId}`);
    if (!res.ok) throw new Error("Failed to fetch course");
    return res.json();
  } catch (error) {
    console.error("getCourseById error:", error);
    return MOCK_COURSES.find(c => c.id === courseId) || null;
  }
}

// Get lessons for a course
export async function getLessons(courseId: string): Promise<Lesson[]> {
  try {
    const res = await fetch(`/api/courses/${courseId}`);
    if (!res.ok) throw new Error("Failed to fetch course for lessons");
    const course = await res.json();
    
    if (course.lessons && course.lessons.length > 5) {
      return course.lessons.map((l: any, i: number) => ({
        id: l._id || `lesson-${i + 1}`,
        title: l.title,
        description: l.description || "",
        videoUrl: l.videoUrl || "",
        duration: l.duration || "10:00",
        order: l.order || i + 1,
        isFree: l.isFree || i === 0,
        startTime: l.startTime || 0
      }));
    }

    // If it's a known educational video, use the verified curriculum even if it's a custom course
    const mockCurriculum = generateMockLessons(courseId, course);
    if (mockCurriculum.length > 1) {
       return mockCurriculum;
    }

    // Fallback to whatever lessons exist if any
    if (course.lessons && course.lessons.length > 0) {
      return course.lessons.map((l: any, i: number) => ({
        id: l._id || `lesson-${i + 1}`,
        title: l.title,
        description: l.description || "",
        videoUrl: l.videoUrl || "",
        duration: l.duration || "10:00",
        order: l.order || i + 1,
        isFree: l.isFree || i === 0,
        startTime: l.startTime || 0
      }));
    }
  } catch (error) {
    console.error("getLessons real-fetch error:", error);
  }
  return generateMockLessons(courseId);
}

// Helper to generate mock lessons based on course ID
function generateMockLessons(courseId: string, providedCourse?: any): Lesson[] {
  const courses = getMergedCourses();
  const course = providedCourse || courses.find(c => c.id === courseId);
  const titlePrefix = course ? course.title.split(' ')[0] : "Lesson";

  // Data structure for real chapters across all courses
  const courseDataMap: Record<string, { title: string, start: number, assignment?: any }[]> = {
    "mock-ai-mastery": [
      { title: "Introduction to AI", start: 0 },
      { title: "Types of AI", start: 750 },
      { title: "AI Fundamentals Quiz", start: 1695, assignment: { title: "Foundations Quiz", instructions: "Test your knowledge on AI history and basic concepts.", type: "quiz" } },
      { title: "Machine Learning Basics", start: 2295 },
      { title: "Neural Networks Explained", start: 4995 },
      { title: "ML & Neural Networks Quiz", start: 6515, assignment: { title: "Neural Logic Quiz", instructions: "Identify different neural network architectures.", type: "quiz" } },
      { title: "AI Practical Lab 1: Getting Started", start: 7415 },
      { title: "Deep Learning Foundations", start: 9705 },
      { title: "Deep Learning Quiz", start: 12825, assignment: { title: "Deep Tech Quiz", instructions: "Evaluate your understanding of backpropagation and weights.", type: "quiz" } },
      { title: "AI in the Real World", start: 14025 },
      { title: "Ethics in AI: A Global Perspective", start: 15145 },
      { title: "Final AI Mastery Project", start: 16480, assignment: { title: "The Elite AI Challenge", instructions: "Design a conceptual AI solution for a real-world social problem. Explain the ethics and the architecture.", type: "graded_task" } }
    ],
    "mock-nextjs": [
      { 
        title: "Setup & Project Structure", 
        start: 0,
        assignment: {
          title: "Environment Setup",
          instructions: "Initialize a new Next.js 14 project using 'npx create-next-app@latest' and configure TailwindCSS and TypeScript.",
          type: "graded_task"
        }
      },
      { title: "App Router & Navigation", start: 600 },
      { 
        title: "Server Components vs Client Components", 
        start: 1200,
        assignment: {
          title: "Component Strategy Quiz",
          instructions: "Answer questions about when to use 'use client' versus default Server Components.",
          type: "quiz",
          questions: [
            "Which component type should be used for complex state management?",
            "Can a Server Component import a Client Component?",
            "Where does a Server Component render?"
          ]
        }
      },
      { title: "Data Fetching & Caching", start: 1800 },
      { title: "Server Actions & Mutations", start: 2400 },
      { title: "Authentication with NextAuth", start: 3000 },
      { title: "Deployment to Vercel", start: 3600 }
    ],
    "mock-uiux": [
      { title: "What is UI & UX? (Introduction)", start: 81 },
      { 
        title: "Core Principles of Design", 
        start: 372,
        assignment: {
          title: "Principle Audit",
          instructions: "Select one popular application (e.g., Spotify, Airbnb) and identify how they use Visual Hierarchy and Proximity in their home screen.",
          type: "graded_task"
        }
      },
      { 
        title: "Mastering Color Theory", 
        start: 825,
        assignment: {
          title: "Palette Generation",
          instructions: "Using a tool like Adobe Color, create a Complementary Color Palette for a 'Health & Fitness' app. Explain your primary color choice.",
          type: "graded_task"
        }
      },
      { title: "Typography for Modern Interfaces", start: 1530 },
      { title: "Layout & Visual Hierarchy", start: 2700 },
      { 
        title: "Grid Systems & Alignment", 
        start: 4500,
        assignment: {
          title: "Responsive Grid Layout",
          instructions: "Design a simple 3-column grid layout for a desktop view and show how it would stack on a mobile device (4-column vs 12-column logic).",
          type: "graded_task"
        }
      },
      { title: "Interactive Prototyping Basics", start: 6300 },
      { title: "UX Research & User Personas", start: 8100 },
      { 
        title: "Building a Full Project", 
        start: 10200,
        assignment: {
          title: "The Elite Challenge",
          instructions: "Design a high-fidelity landing page for a premium sneakers store. Include a Hero section, Product grid, and a stylized Checkout modal.",
          type: "graded_task"
        }
      },
      { title: "Final Review & Exporting", start: 12600 }
    ],
    "mock-datascience": [
      { title: "Introduction to Data Science", start: 0 },
      { title: "NumPy Fundamentals", start: 450 },
      { title: "Pandas for Data Manipulation", start: 1200 },
      { title: "Matplotlib Data Visualization", start: 2400 },
      { title: "Exploratory Data Analysis (EDA)", start: 3600 },
      { title: "Linear Regression Concepts", start: 4800 },
      { title: "Classification & Decision Trees", start: 6000 }
    ],
    "mock-gen-ai": [
      { title: "The Generative AI Revolution", start: 0 },
      { title: "Large Language Models Explained", start: 300 },
      { title: "Prompt Engineering Best Practices", start: 900 },
      { title: "Fine-tuning & RAG Overview", start: 1800 },
      { title: "Building AI Agents", start: 2700 },
      { title: "Ethics & Safety in Gen AI", start: 3600 }
    ],
    "mock-nlp-python": [
      { title: "NLP Basics & Tokenization", start: 0 },
      { title: "Stop Words & Lemmatization", start: 600 },
      { title: "POS Tagging & NER", start: 1200 },
      { title: "TF-IDF & Word Embeddings", start: 2400 },
      { title: "Sentiment Analysis Project", start: 3600 },
      { title: "Transformers & BERT", start: 4800 }
    ]
  };

  const specificLessons = courseDataMap[courseId];
  
  // Also check by video URL if the ID doesn't match
  let curriculum = specificLessons;
  if (!curriculum && course?.videoUrl) {
    const mockMatch = MOCK_COURSES.find(m => m.videoUrl === course.videoUrl);
    if (mockMatch) {
      curriculum = courseDataMap[mockMatch.id];
    }
  }

  if (curriculum) {
    return curriculum.map((item, i) => ({
      id: `lesson-${i + 1}`,
      title: item.title,
      description: "Master this fundamental course module.",
      videoUrl: course?.videoUrl || "",
      duration: `${Math.floor(Math.random() * 5) + 10}:00`,
      order: i + 1,
      isFree: i === 0,
      startTime: item.start,
      assignment: item.assignment
    }));
  }

  const count = course?.totalLessons || 5;
  
  return Array.from({ length: count }, (_, i) => ({
    id: `lesson-${i + 1}`,
    title: `${titlePrefix} Module ${i + 1}: ${getMockLessonTitle(i)}`,
    description: "Learn essential concepts in this module.",
    videoUrl: course?.videoUrl || "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    duration: `${Math.floor(Math.random() * 20) + 10}:00`,
    order: i + 1,
    isFree: i === 0,
  }));
}

function getMockLessonTitle(index: number): string {
  const titles = [
    "Introduction and Overview", "Fundamental Concepts", "Setting Up the Environment",
    "Deep Dive into Core Principles", "Hands-on Practical Exercise", "Advanced Techniques",
    "Troubleshooting and Best Practices", "Real-world Application Case Study",
    "Future Trends and Innovations", "Course Summary and Next Steps"
  ];
  return titles[index % titles.length];
}

// Search courses
export async function searchCourses(searchTerm: string): Promise<Course[]> {
  try {
    const res = await fetch(`/api/courses?search=${encodeURIComponent(searchTerm)}`);
    if (!res.ok) throw new Error("Search failed");
    return res.json();
  } catch (error) {
    console.error("searchCourses error:", error);
    const term = searchTerm.toLowerCase();
    return MOCK_COURSES.filter(c => 
      c.published && 
      (c.title.toLowerCase().includes(term) || c.description.toLowerCase().includes(term))
    );
  }
}

// Get featured courses
export async function getFeaturedCourses(maxResults = 4): Promise<Course[]> {
  try {
    const res = await fetch(`/api/courses?featured=true&limit=${maxResults}`);
    if (!res.ok) throw new Error("Failed to fetch featured courses");
    return res.json();
  } catch (error) {
    console.error("getFeaturedCourses error:", error);
    return MOCK_COURSES
      .filter(c => c.published)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, maxResults);
  }
}

// Administrative functions
export async function createCourse(courseData: CourseInput): Promise<string | null> {
  const id = `local-${Math.random().toString(36).substring(2, 9)}`;
  const newCourse: Course = {
    ...courseData,
    id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const localCoursesJson = localStorage.getItem(COURSES_STORAGE_KEY);
  const localCourses: Course[] = localCoursesJson ? JSON.parse(localCoursesJson) : [];
  
  localCourses.push(newCourse);
  localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(localCourses));
  
  return id;
}

export async function updateCourse(courseId: string, courseData: Partial<CourseInput>): Promise<boolean> {
  const localCoursesJson = localStorage.getItem(COURSES_STORAGE_KEY);
  if (!localCoursesJson) return false;

  let localCourses: Course[] = JSON.parse(localCoursesJson);
  const index = localCourses.findIndex(c => c.id === courseId);
  
  if (index === -1) return false;

  localCourses[index] = { 
    ...localCourses[index], 
    ...courseData, 
    updatedAt: new Date().toISOString() 
  };
  
  localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(localCourses));
  return true;
}

export async function deleteCourse(courseId: string): Promise<boolean> {
  const localCoursesJson = localStorage.getItem(COURSES_STORAGE_KEY);
  if (!localCoursesJson) return false;

  let localCourses: Course[] = JSON.parse(localCoursesJson);
  const filteredCourses = localCourses.filter(c => c.id !== courseId);
  
  if (filteredCourses.length === localCourses.length) return false;

  localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(filteredCourses));
  return true;
}
