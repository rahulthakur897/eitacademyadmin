"use client";
import { useState } from "react";
import { MailIcon, EyeIcon, EyeOffIcon, LockKeyholeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import { SignInSchema } from "@/utils/validation";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { adminLogin } from "@/redux/actions/user";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { loading } = useSelector((state: any) => state.user);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignInSchema,
    onSubmit: (values) => {
      dispatch(adminLogin(values));
      router.push("/dashboard");
    },
  });

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
        onSubmit={formik.handleSubmit}
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
        <Input
          className="mb-4"
          type="email"
          placeholder="Enter your email"
          fieldLabel="Email Address"
          required
          startIcon={<MailIcon className="h-5 w-5 text-[#99A0AE]" />}
          error={formik.touched.email && formik.errors.email}
          {...formik.getFieldProps("email")}
        />

        {/* PASSWORD */}
        <Input
          className="mb-4"
          type={isPasswordVisible ? "text" : "password"}
          placeholder="Enter your password"
          fieldLabel="Password"
          required
          startIcon={<LockKeyholeIcon className="h-5 w-5 text-[#99A0AE]" />}
          error={formik.touched.password && formik.errors.password}
          endIcon={
            isPasswordVisible ? (
              <EyeIcon
                className="h-5 w-5 text-[#99A0AE] cursor-pointer"
                onClick={() => setIsPasswordVisible(false)}
              />
            ) : (
              <EyeOffIcon
                className="h-5 w-5 text-[#99A0AE] cursor-pointer"
                onClick={() => setIsPasswordVisible(true)}
              />
            )
          }
          {...formik.getFieldProps("password")}
        />

        <Button
          type="submit"
          size="lg"
          className="w-full bg-[#003b7d] hover:bg-[#0056b3]"
          disabled={loading}
        >
          {loading ? "Logging In..." : "Log In"}
        </Button>

        {/* FOOTER */}
        <p className="mt-8 text-center text-xs text-gray-500">
          © 2025 EXPERT IT ACADEMY & CONSULTANCY SERVICES
        </p>
      </form>
    </div>
  );
}
