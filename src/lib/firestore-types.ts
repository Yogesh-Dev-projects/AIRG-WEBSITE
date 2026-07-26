// Local Data Structure for Online Course Platform

/**
 * DATA STRUCTURE:
 * 
 * Courses
 *   - id: string
 *   - title: string
 *   - description: string
 *   - videoUrl: string
 *   - thumbnailUrl: string
 *   - price: number
 *   - originalPrice: number
 *   - instructorId: string
 *   - instructorName: string
 *   - category: string
 *   - level: "beginner" | "intermediate" | "advanced"
 *   - duration: string
 *   - totalLessons: number
 *   - rating: number
 *   - reviewCount: number
 *   - studentCount: number
 *   - tags: string[]
 *   - createdAt: string (ISO Date)
 *   - updatedAt: string (ISO Date)
 *   - published: boolean
 */

// Course document type
export interface Course {
  id: string;
  title: string;
  description: string;
  assignmentBrief?: string;
  videoUrl: string;
  thumbnailUrl: string;
  price: number;
  originalPrice?: number;
  instructorId: string;
  instructorName: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  totalLessons: number;
  rating: number;
  reviewCount: number;
  studentCount: number;
  tags: string[];
  createdAt: string | any;
  updatedAt: string | any;
  published: boolean;
}

// Lesson subdocument type
export interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  order: number;
  isFree: boolean;
  assignment?: {
    title: string;
    instructions: string;
    type: "quiz" | "graded_task";
    questions?: string[];
  };
}

// User document type
export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  photoUrl: string;
  role: "student" | "instructor" | "admin";
  bio?: string;
  enrolledCourses: string[];
  createdCourses?: string[];
  createdAt: string;
  updatedAt: string;
}

// Enrollment document type
export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  progress: number;
  completedLessons: string[];
  lastAccessedAt: string;
}

// Course input type (for creating/updating)
export type CourseInput = Omit<Course, "id" | "createdAt" | "updatedAt">;

// User input type (for creating/updating)
export type UserInput = Omit<UserProfile, "id" | "createdAt" | "updatedAt">;
