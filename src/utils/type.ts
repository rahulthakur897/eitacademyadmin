export type CourseFormData = {
  name: string;
  category_id: string;
  shortdesc: string;
  overview: string;
  course_logo: File | string;
  price: number;
  duration: string;
  module_count: number;
  course_level: string;
  provide_certificate: string;
  course_language: string;
  instructor_support: string;
  course_advantage: string;
  couse_faq: string;
  slug: string;
  id?: number;
};

export interface CourseFormErrors {
  name?: string;
  slug?: string;
  category_id?: string;
  shortdesc?: string;
  overview?: string;
  price?: string;
  duration?: string;
  module_count?: string;
  course_level?: string;
  course_language?: string;
}


export type Category = {
  id: string;
  name: string;
};

export interface UpcomingCourse {
  id?: number;

  course_id: number;              // Course title
  category_id: number | "";  // Category
  faculty_id: number | "";   // Instructor
  level: string;             // Beginner | Intermediate | Advanced

  batch_start: string;       // YYYY-MM-DD
  demo_date: string;         // YYYY-MM-DD
  demo_duration: string;     // e.g. "6 Weeks"
  classes: string;           // e.g. "Mon, Wed, Fri"
}
