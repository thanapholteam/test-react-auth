// import ForgetForm from "@/components/ForgetPassword/ForgetForm";
import { axiosInstance } from "@/utils/Axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MySwal } from "@/utils/Swal";
import { checkPassword, checkEmail } from "@/utils/validate";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [otp, setOtp] = useState("");
  const [isOTPVefified, setIsOTPVefified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [renewPassword, setReNewPassword] = useState("");
  const [errEmail, setErrEmail] = useState(true);
  const [errPassword, setErrPassword] = useState(true);
  // const [errOtp, setErrOtp] = useState(true);

  // const checkOtp = () => {
  //   const regEx = new RegExp("^[0-9]+$");
  //   return regEx.test(otp);
  // };
  const handleSubmitEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    if (email) {
      const res = await axiosInstance.post("/user/forgot", { email: email });
      console.log(res);
      if (res.status === 201) {
        setUrl(res.data.url);
      } else if (res.status === 204) {
        MySwal.fire({
          icon: "error",
          title: "Something went wrong!",
          text: "Could not find your account.",
          showConfirmButton: true,
          timer: 2000,
        });
      }
      // For other status code like 400, 404, 500
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
      } else if (res.status === 204) {
        MySwal.fire({
          icon: "error",
          title: "Something went wrong!",
          text: "the OTP code is invalid.",
          showConfirmButton: true,
          timer: 2000,
        });
      }
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
        newPassword: newPassword,
        code: otp,
      });

      console.log(res);
      if (res.status === 201) {
        MySwal.fire({
          icon: "success",
          title: "Success",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => navigate("/login"));
      }
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full p-6 bg-white rounded-lg shadow border md:mt-0 sm:max-w-md sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Forgot Password
          </h2>
          <div className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
            <form onSubmit={(e) => handleSubmitEmail(e)}>
              <div className="grid grid-cols-12 gap-4 items-end">
                <div className="col-span-8">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrEmail(checkEmail(e.target.value));
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 disabled:bg-slate-200"
                    placeholder="test@mail.com"
                    disabled={url.length > 0 || loading}
                  />
                </div>
                <div className="col-span-4">
                  <button
                    className="w-full px-3 py-2 mx-3 mt-4 text-white font-semibold bg-emerald-600 rounded-lg hover:bg-emerald-700 hover:text-white transition ease-linear duration-200 disabled:opacity-40 "
                    type="submit"
                    disabled={url.length > 0 || loading}
                  >
                    Send OTP
                  </button>
                </div>
              </div>
            </form>
            {!errEmail ? (
              <p className="text-sm text-red-700">
                Please use a valid email address.
              </p>
            ) : (
              ""
            )}
            {url ? (
              <div>
                <form onSubmit={(e) => handleSubmitOTP(e)}>
                  <div className="grid grid-cols-12 gap-4 items-end">
                    <div className="col-span-8">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        OTP
                      </label>
                      <input
                        type="text"
                        name="otp"
                        id="otp"
                        maxLength={6}
                        minLength={6}
                        onChange={(e) => {
                          setOtp(e.target.value);
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 disabled:bg-slate-200"
                        placeholder="••••••"
                        disabled={!url || loading || isOTPVefified}
                      />
                    </div>
                    <div className="col-span-4">
                      <button
                        className="w-full px-3 py-2 mx-3 mt-4 text-white font-semibold bg-emerald-600 rounded-lg hover:bg-emerald-700 hover:text-white transition ease-linear duration-200 disabled:opacity-40 "
                        type="submit"
                        disabled={!url || loading || isOTPVefified}
                      >
                        {!isOTPVefified ? "Verify" : "Verified"}
                      </button>
                    </div>
                  </div>
                </form>
                {isOTPVefified ? (
                  <form onSubmit={(e) => handleChangePassword(e)}>
                    <div className="my-1">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        New Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        minLength={8}
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                          setErrPassword(checkPassword(newPassword));
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 disabled:bg-slate-200"
                        disabled={!isOTPVefified || loading}
                      />
                    </div>
                    <div className="my-1">
                      <label
                        htmlFor="confirm-password"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Confirm password
                      </label>
                      <input
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        placeholder="••••••••"
                        minLength={8}
                        onChange={(e) => {
                          setReNewPassword(e.target.value);
                          setErrPassword(checkPassword(renewPassword));
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 disabled:bg-slate-200"
                        disabled={!isOTPVefified || loading}
                      />
                    </div>
                    <div className="my-3 px-4">
                      <ul className="text-sm text-red-700 list-disc">
                        {newPassword !== renewPassword ? (
                          <li>Password not match.</li>
                        ) : (
                          ""
                        )}
                        {!errPassword ? (
                          <li>
                            Minimum eight characters, at least one letter, one
                            number and one special character (@,$,!,%,*,#,?,&)
                          </li>
                        ) : (
                          ""
                        )}
                      </ul>
                    </div>
                    <button
                      type="submit"
                      className="w-full px-3 py-2 mt-4 text-white font-semibold bg-emerald-600 rounded-lg hover:bg-emerald-700 hover:text-white transition ease-linear duration-200 disabled:opacity-40 "
                      disabled={
                        !isOTPVefified ||
                        loading ||
                        newPassword !== renewPassword ||
                        !errPassword
                      }
                    >
                      Reset password
                    </button>
                  </form>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
