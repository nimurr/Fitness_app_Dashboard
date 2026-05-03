import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { HiOutlineLockClosed, HiEye, HiEyeOff } from "react-icons/hi";
import { Form } from "antd";
import { toast } from "sonner";
import { useResetPasswordMutation } from "../../../redux/features/auth/authApi";

const PasswordField = ({ placeholder, value, onChange }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex items-center bg-transparent border border-[#333] rounded-lg px-4 py-3 gap-3 focus-within:border-[#555] transition-colors">
      <HiOutlineLockClosed className="text-gray-500 text-lg shrink-0" />
      <input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-transparent text-gray-300 text-sm placeholder-gray-600 outline-none w-full"
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        className="text-gray-500 hover:text-gray-300 transition-colors shrink-0"
      >
        {show ? <HiEyeOff className="text-lg" /> : <HiEye className="text-lg" />}
      </button>
    </div>
  );
};

const NewPassword = () => {
  const navigate = useNavigate();
  const { email } = useParams();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const jwtToken = localStorage.getItem("jwtToken");

  const submit = async (values) => {
    const { password, confirmPassword } = values;

    if (!password || !confirmPassword) {
      toast.error("Password is required");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const res = await resetPassword({ jwtToken, newPassword: password });
      if (res.error) {
        toast.error(res.error.data.message);
      }
      if (res.data) {
        toast.success(res.data.message);
        navigate("/auth/login");
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
            <h1 className="text-white text-2xl font-bold">Update Password</h1>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed mt-2">
            Enter your new password below. Make sure it's strong and secure.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-[#2a2a2a] my-6" />

        {/* Form */}
        <Form
          layout="vertical"
          onFinish={submit}
          initialValues={{ password: "", confirmPassword: "" }}
        >
          {/* New Password */}
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your new password" }]}
            className="mb-4"
          >
            <PasswordField placeholder="Enter New Password" />
          </Form.Item>

          {/* Confirm Password */}
          <Form.Item
            name="confirmPassword"
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
            className="mb-6"
          >
            <PasswordField placeholder="Confirm New Password" />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item className="mb-0">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:opacity-60 text-white text-base font-semibold rounded-full py-3 transition-colors"
            >
              {isLoading ? "Updating..." : "Update Password"}
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

export default NewPassword;