import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import OTPInput from "react-otp-input";
import {
  useForgotPasswordMutation,
  useVerifyEmailMutation,
} from "../../../redux/features/auth/authApi";
import { toast } from "sonner";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const { email } = useParams();
  const navigate = useNavigate();
  const [forgotPassword] = useForgotPasswordMutation();
  const [verifyOtp, { isLoading }] = useVerifyEmailMutation();

  const handleMatchOtp = async () => {
    try {
      const res = await verifyOtp({ otp }).unwrap();
      if (res.error) {
        toast.error(res?.error?.data?.message);
      }
      if (res) {
        localStorage.setItem("jwtToken", res?.changePasswordToken);
        toast.success(res?.data?.message);
        navigate(`/auth/new-password/${email}`);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleResendPassword = async () => {
    try {
      const res = await forgotPassword({ email });
      if (res.error) {
        toast.error(res?.error?.data?.message);
      }
      if (res.data) {
        toast.success(res.data.message);
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
              to="/auth/forget-password"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <IoIosArrowBack className="text-xl" />
            </Link>
            <h1 className="text-white text-2xl font-bold">Verify OTP</h1>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed mt-2">
            We'll send a verification code to your email. Check your inbox and
            enter the code here.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-[#2a2a2a] my-6" />

        {/* OTP Inputs */}
        <div className="flex justify-center mb-7">
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props) => (
              <input
                {...props}
                style={{}}
                className="
                  !w-11 !h-12 mx-1.5
                  bg-transparent
                  border-b-2 border-[#3a3a3a]
                  focus:border-red-600
                  text-white text-xl font-bold
                  text-center outline-none
                  transition-colors
                "
              />
            )}
          />
        </div>

        {/* Verify Button */}
        <button
          onClick={handleMatchOtp}
          disabled={isLoading || otp.length < 6}
          className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:opacity-50 text-white text-base font-semibold rounded-full py-3 transition-colors"
        >
          {isLoading ? "Verifying..." : "Verify"}
        </button>

        {/* Resend */}
        <div className="flex items-center justify-between mt-5">
          <p className="text-gray-500 text-sm">Didn't receive code?</p>
          <button
            onClick={handleResendPassword}
            className="text-red-500 hover:text-red-400 transition-colors text-sm font-medium"
          >
            Resend Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default Otp;