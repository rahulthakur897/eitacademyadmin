import * as Yup from "yup";

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


export const RoleSchema = Yup.object().shape({
  companyName: Yup.string().required("Company Name is required"),
  designation: Yup.string().required("Designation is required"),
});


export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("Please enter a valid email")
    .required("Email is required"),
});