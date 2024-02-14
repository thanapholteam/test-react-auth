import { RegisterPayload } from "@/types/payload";
import { MySwal } from "@/utils/Swal";
import { useAuth } from "@/utils/context/AuthContext";
import { checkPassword, checkEmail } from "@/utils/validate";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const { register } = useAuth();
  const [errEmail, setErrEmail] = useState(true);
  const [errPassword, setErrPassword] = useState(true);
  const [regisForm, setRegisForm] = useState<RegisterPayload>({
    email: "",
    name: "",
    password: "",
  });
  const [confirmPass, setConfirmPass] = useState("");

  const onFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setRegisForm({ ...regisForm, [name]: value });
    setErrEmail(checkEmail(regisForm.email));
    setErrPassword(checkPassword(regisForm.password));
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(regisForm);
    if (regisForm.password !== confirmPass) {
      MySwal.fire({
        icon: "error",
        title: "รหัสผ่านไม่ตรงกัน",
        showConfirmButton: false,
        timer: 1300,
      });
    } else if (regisForm.email !== "" && regisForm.password !== "")
      await register(regisForm);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-4 px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow border md:mt-0 sm:max-w-md sm:p-8">
            <h3 className="text-2xl font-bold mt-3">Create an account</h3>
            <form onSubmit={(e) => handleRegister(e)}>
              <div className="mt-4">
                <label className="block font-medium">
                  Your email
                  <label>
                    <input
                      type="email"
                      name="email"
                      placeholder="name@mail.com"
                      onChange={onFormChange}
                      className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                      required
                    />
                  </label>
                </label>
                {!errEmail ? (
                  <p className="text-sm text-red-700">
                    Please use a valid email address.
                  </p>
                ) : (
                  ""
                )}
              </div>

              <div className="mt-4">
                <label className="block font-medium">
                  Password
                  <label>
                    <input
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      minLength={8}
                      onChange={onFormChange}
                      className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                      required
                    />
                  </label>
                </label>
              </div>

              <div className="mt-4">
                <label className="block font-medium">
                  Confirm Password
                  <label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      minLength={8}
                      className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                      onChange={(e) => {
                        setConfirmPass(e.target.value);
                        setErrPassword(checkPassword(confirmPass));
                      }}
                      required
                    />
                  </label>
                </label>
              </div>
              <div className="my-3 px-4">
                <ul className="text-sm text-red-700 list-disc">
                  {confirmPass !== regisForm.password ? (
                    <li>Password not match.</li>
                  ) : (
                    ""
                  )}
                  {!errPassword ? (
                    <li>
                      Minimum eight characters, at least one letter, one number
                      and one special character (@,$,!,%,*,#,?,&)
                    </li>
                  ) : (
                    ""
                  )}
                </ul>
              </div>
              <div className="flex items-baseline justify-center my-1">
                <button className="w-full py-2 mt-4 text-white font-semibold bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:opacity-40 hover:text-white transition ease-linear duration-200"
                  disabled={!errPassword || confirmPass !== regisForm.password || !errEmail}
                  >
                  Register
                </button>
              </div>
              <hr className="my-6" />
              <div className="flex justify-center items-center my-2">
                <Link
                  to="/login"
                  className="hover:underline text-blue-600 font-semibold mx-1"
                >
                  Already have an account?
                </Link>
              </div>
            </form>
          </div>
    </div>
  );
};

export default Register;
