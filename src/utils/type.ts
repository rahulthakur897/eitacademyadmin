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
  course_id: string;
  category_id: number | "";
  faculty_id: number | "";
  level: string;
  batch_start: string;
  demo_date: string;
  demo_duration: string;
}

export interface Blog {
  id?: number;
  image: File | string;
  title: string;
  slug: string;
  category_id: string;
  author: "";
  shortdesc: string;
  description: string;

}