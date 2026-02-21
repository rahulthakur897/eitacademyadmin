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

  if (!values.course_id) {
    errors.course_id = "Course title is required";
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



import { FormikErrors } from "formik";
import { Blog } from "@/utils/type";

export const validateBlogForm = (
  values: Blog
): FormikErrors<Blog> => {
  const errors: FormikErrors<Blog> = {};

  // 🔹 Title
  if (!values.title?.trim()) {
    errors.title = "Title is required";
  } else if (values.title.length < 3) {
    errors.title = "Title must be at least 3 characters";
  }

  // 🔹 Slug
  if (!values.slug?.trim()) {
    errors.slug = "Slug is required";
  } else if (!/^[a-z0-9-]+$/.test(values.slug)) {
    errors.slug = "Slug must contain only lowercase letters, numbers, and hyphens";
  }

  // 🔹 Category
  if (!values.category_id) {
    errors.category_id = "Category is required";
  }

  // 🔹 Author
  if (!values.author?.trim()) {
    errors.author = "Author name is required";
  } else if (!/^[A-Za-z\s]+$/.test(values.author)) {
    errors.author = "Author name should contain only letters";
  }

  // 🔹 Short Description
  if (!values.shortdesc || values.shortdesc === "<p><br></p>") {
    errors.shortdesc = "Short description is required";
  }

  // 🔹 Overview
  if (!values.description || values.description === "<p><br></p>") {
    errors.description = "Description is required";
  }

  // 🔹 Image
  if (!values.image) {
    errors.image = "Image is required";
  }

  return errors;
};
