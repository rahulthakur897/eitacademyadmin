"use client";
import { Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import { SignInSchema } from "@/validation/authValidation";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: SignInSchema,
    onSubmit: (values) => {
      console.log('==>', values);
      sessionStorage.setItem("isAdminLoggedIn", "true");
      router.push("/dashboard");
    },
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =formik;

  const isActive =
    values.email &&
    !errors.email &&
    values.password &&
    !errors.password;

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center bg-white">
      {/* Background Image */}
      <div
        className="absolute top-0 left-0 w-full h-[456px] z-0 bg-repeat-x bg-top"
        style={{
          backgroundImage: "url('/assets/images/login/background.png')",
          backgroundSize: "auto 100%",
        }}
      ></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white border border-blue-300 
        shadow-[0_4px_15px_rgba(0,0,0,0.08)] rounded-2xl p-8 w-full max-w-md"
      >
        {/* LOGO + COMPANY NAME */}
        <div className="flex flex-col items-center mb-4">
          <img src="/assets/images/logo.png" className="w-40" alt="logo" />

          <h3 className="mt-2 text-lg font-semibold text-[#003b7d] text-center tracking-wide">
            EXPERT IT ACADEMY & CONSULTANCY SERVICES
          </h3>
        </div>

        {/* EMAIL */}
        <div className="w-full mb-4">
          <Label className="text-sm font-semibold text-gray-700">
            Email Address <span className="text-blue-600">*</span>
          </Label>

          <div className="relative mt-1">
            <Mail className="absolute left-3 top-3 text-blue-600" size={18} />
            <Input
              id="email"
              type="email"
              placeholder="admin@example.com"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="pl-10 bg-white border border-blue-300 
              rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-700"
            />
          </div>

          {touched.email && errors.email && (
            <p className="text-sm text-blue-600 mt-1">{errors.email}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div className="w-full mb-6">
          <Label className="text-sm font-semibold text-gray-700">
            Password <span className="text-blue-600">*</span>
          </Label>

          <div className="relative mt-1">
            <Lock className="absolute left-3 top-3 text-blue-600" size={18} />
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="pl-10 bg-white border border-blue-300 
              rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-700"
            />
          </div>

          {touched.password && errors.password && (
            <p className="text-sm text-blue-600 mt-1">{errors.password}</p>
          )}
        </div>

        {/* LOGIN BUTTON */}
        <Button
          type="submit"
          disabled={!isActive}
          className={`w-full text-[15px] font-medium py-3 rounded-lg transition ${
            isActive
              ? "bg-blue-600 text-white hover:bg-[#003b7d]"
              : "bg-blue-300 text-white cursor-not-allowed"
          }`}
        >
          Login
        </Button>

        {/* FOOTER */}
        <p className="mt-8 text-center text-xs text-gray-500">
          © 2025 EXPERT IT ACADEMY & CONSULTANCY SERVICES
        </p>
      </form>
    </div>
  );
}
