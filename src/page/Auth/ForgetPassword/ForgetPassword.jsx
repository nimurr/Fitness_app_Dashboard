import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import { Form } from "antd";
import { useForgotPasswordMutation } from "../../../redux/features/auth/authApi";
import { toast } from "sonner";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const submit = async (values) => {
    try {
      const res = await forgotPassword(values);
      if (res.error) {
        toast.error(res?.error?.data?.message);
      }
      if (res.data) {
        toast.success(res.data.message);
        navigate(`/auth/otp/${values?.email}`);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0d0d0d] flex items-center justify-center px-4">
      {/* Card */}
      <div className="w-full max-w-[480px] bg-[#181818] border border-[#2a2a2a] rounded-2xl px-10 py-10">

        {/* Logo */}
        <div className="flex justify-center mb-7">
          <img className="w-36" src="/public/Auth/authlogo.png" alt="" />
        </div>

        {/* Back + Title */}
        <div className="text-center mb-2">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Link
              to="/auth/login"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <IoIosArrowBack className="text-xl" />
            </Link>
            <h1 className="text-white text-2xl font-bold">Forgot Password</h1>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed mt-2">
            Enter the email address associated with your account. We'll send you
            a verification code to your email.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-[#2a2a2a] my-6" />

        {/* Form */}
        <Form
          layout="vertical"
          onFinish={submit}
          initialValues={{ email: "" }}
        >
          {/* Email */}
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
            className="mb-6"
          >
            <div className="flex items-center bg-transparent border border-[#333] rounded-lg px-4 py-3 gap-3 focus-within:border-[#555] transition-colors">
              <HiOutlineMail className="text-gray-500 text-lg shrink-0" />
              <input
                type="email"
                placeholder="Enter Your Email Address"
                className="bg-transparent text-gray-300 text-sm placeholder-gray-600 outline-none w-full"
              />
            </div>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item className="mb-0">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:opacity-60 text-white text-base font-semibold rounded-full py-3 transition-colors"
            >
              {isLoading ? "Sending..." : "Send Verification Code"}
            </button>
          </Form.Item>
        </Form>

        {/* Back to login */}
        <p className="text-center text-gray-600 text-sm mt-5">
          Remember your password?{" "}
          <Link
            to="/auth/login"
            className="text-red-500 hover:text-red-400 transition-colors font-medium no-underline"
          >
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;