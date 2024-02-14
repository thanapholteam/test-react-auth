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
      const res = await axiosInstance.post("/user/reset", {
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
      <h1 className="text-3xl">Forgot Password</h1>
      <ForgetForm
        name="email"
        handleSubmit={handleSubmitEmail}
        setValue={setEmail}
        loading={loading}
      />
      {url !== "" ? (
        <ForgetForm
          name="OTP"
          handleSubmit={handleSubmitOTP}
          setValue={setOtp}
          loading={loading}
        />
      ) : null}
      {isOTPVefified ? (
        <ForgetForm
          name="newPassword"
          handleSubmit={handleChangePassword}
          setValue={setNewPassword}
          loading={loading}
        />
      ) : null}
      {/* <form onSubmit={(e) => handleSubmitEmail(e)}>
        <div className="mt-4">
          <label className="block font-medium">
            Email
            <label>
              <input
                type="text"
                placeholder="Email"
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-600"
                required
              />
            </label>
          </label>
        </div>
        <div className="text-center">
          <button
            className="px-6 py-2 mt-4 text-white font-semibold bg-red-600 rounded-lg hover:bg-black hover:text-white transition ease-linear duration-200"
            type="submit"
            disabled={loading}
          >
            Send Email
          </button>
        </div>
      </form> */}
    </div>
  );
};

export default ForgotPassword;
