import * as Yup from "yup";
import { CourseFormData, CourseFormErrors, UpcomingCourse } from "./type";

export const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .trim()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const SignUpSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Full Name is required")
    .min(2, "Name is too short"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .required("Phone Number is required")
    .min(5, "Enter a valid phone number"),
  password: Yup.string()
    .trim()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const validateCourseForm = (values: CourseFormData) => {
  const errors: CourseFormErrors = {};

  if (!values.name?.trim()) {
    errors.name = "Course name is required";
  } else if (values.name.length < 3) {
    errors.name = "Course name must be at least 3 characters";
  }

  if (!values.slug?.trim()) {
    errors.slug = "Slug is required";
  }

  if (!values.category_id) {
    errors.category_id = "Category is required";
  }

  // ✅ ReactQuill-safe checks
  if (!values.shortdesc || values.shortdesc.replace(/<[^>]*>/g, "").trim() === "") {
    errors.shortdesc = "Short description is required";
  }

  if (!values.overview || values.overview.replace(/<[^>]*>/g, "").trim() === "") {
    errors.overview = "Overview is required";
  }

  if (values.price < 0) {
    errors.price = "Price cannot be negative";
  }

  if (!values.duration?.trim()) {
    errors.duration = "Duration is required";
  }

  if (!values.module_count || values.module_count <= 0) {
    errors.module_count = "Module count must be greater than 0";
  }

  if (!values.course_language?.trim()) {
    errors.course_language = "Course language is required";
  }

  return errors; // ✅ EMPTY OBJECT = submit allowed
};


export const upcomingCourseForm = (values: UpcomingCourse) => {
  const errors: any = {};

  if (!values.name?.trim()) {
    errors.name = "Course title is required";
  }

  if (!values.category_id) {
    errors.category_id = "Category is required";
  }

  if (!values.faculty_id) {
    errors.faculty_id = "Instructor is required";
  }

  if (!values.level) {
    errors.level = "Level is required";
  }

  if (!values.batch_start) {
    errors.batch_start = "Start date is required";
  }

  if (!values.demo_date) {
    errors.demo_date = "Demo date is required";
  }

  if (!values.demo_duration?.trim()) {
    errors.demo_duration = "Duration is required";
  }

  return errors;
};

