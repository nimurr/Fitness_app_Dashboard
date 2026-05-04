import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Checkbox } from "antd";
import { HiOutlineLockClosed, HiOutlineMail, HiEye, HiEyeOff } from "react-icons/hi";
import { useLoginMutation } from "../../../redux/features/auth/authApi";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { loggedUser } from "../../../redux/features/auth/authSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values) => {
    const { email, password } = values;
    const data = { email, password };
    try {
      const res = await login(data).unwrap();
      console.log(res)
      if (res.error) {
        toast.error(res.error.data.message);
      }
      if (res) {
        dispatch(loggedUser({ token: res?.token }));
        toast.success(res?.message);
      }
      // navigate("/");
    } catch (error) {
      console.log(error)
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

        {/* Title */}
        <div className="text-center mb-7">
          <h1 className="text-white text-2xl font-bold mb-1">Welcome!</h1>
          <p className="text-gray-500 text-sm">Fill Detail Below To Login.</p>
        </div>

        {/* Form */}
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ remember: true }}
          className="space-y-1"
        >
          {/* Email */}
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "The input is not a valid email!" },
            ]}
            className="mb-4"
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

          {/* Password */}
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            className="mb-4"
          >
            <div className="flex items-center bg-transparent border border-[#333] rounded-lg px-4 py-3 gap-3 focus-within:border-[#555] transition-colors">
              <HiOutlineLockClosed className="text-gray-500 text-lg shrink-0" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your Password"
                className="bg-transparent text-gray-300 text-sm placeholder-gray-600 outline-none w-full"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="text-gray-500 hover:text-gray-300 transition-colors shrink-0"
              >
                {showPassword ? (
                  <HiEyeOff className="text-lg" />
                ) : (
                  <HiEye className="text-lg" />
                )}
              </button>
            </div>
          </Form.Item>

          {/* Remember me + Forgot password */}
          <br />
          <div className="flex items-center justify-between my-5 ">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="text-gray-400 text-sm [&_.ant-checkbox-inner]:bg-transparent [&_.ant-checkbox-inner]:border-gray-500">
                <span className="text-gray-400 text-sm">Remember Me</span>
              </Checkbox>
            </Form.Item>
            <Link
              to="/auth/forget-password"
              className="text-gray-400 text-sm hover:text-white transition-colors no-underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <br />
          <Form.Item className="mb-0">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:opacity-60 text-white text-base font-semibold rounded-full py-3 transition-colors"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;