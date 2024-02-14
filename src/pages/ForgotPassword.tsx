import ForgetForm from "@/components/ForgetPassword/ForgetForm";
import { axiosInstance } from "@/utils/Axios";
import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [otp, setOtp] = useState("");
  const [isOTPVefified, setIsOTPVefified] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const handleSubmitEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    if (email) {
      const res = await axiosInstance.post("/user/forgot", { email: email });
      console.log(res);
      if (res.status === 201) {
        setUrl(res.data.url);
      }
      setLoading(false);
    }
    setLoading(false);
  };

  const handleSubmitOTP = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    if (otp) {
      const res = await axiosInstance.post("/user/verify/otp", {
        email: email,
        id: url,
        code: otp,
      });
      console.log(res);
      if (res.status === 201) {
        setIsOTPVefified(true);
      }
      setLoading(false);
    }
    setLoading(false);
  };

  const handleChangePassword = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    setLoading(true);
    event.preventDefault();
    if (newPassword) {
      const res = await axiosInstance.post("/user/reset-password/", {
        email: email,
        id: url,
        password: newPassword,
      });
      console.log(res);
      if (res.status === 200) {
        // setIsOTPVefified(true); redirect to login
        //TODO : Sweetalert
      }
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="px-12 py-6 mt-4 text-left bg-white rounded-xl border border-black shadow-lg">
        <h1 className="text-2xl font-bold mt-3">Forgot Password</h1>
        <ForgetForm
          name="email"
          handleSubmit={handleSubmitEmail}
          setValue={setEmail}
          loading={loading}
        />
        {url === "" ? (
          <ForgetForm
            name="OTP"
            handleSubmit={handleSubmitOTP}
            setValue={setOtp}
            loading={loading}
          />
        ) : null}
        {!isOTPVefified ? (
          <ForgetForm
            name="newPassword"
            handleSubmit={handleChangePassword}
            setValue={setNewPassword}
            loading={loading}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ForgotPassword;
