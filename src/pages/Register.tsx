import { RegisterPayload } from "@/types/payload";
import { MySwal } from "@/utils/Swal";
import { useAuth } from "@/utils/context/AuthContext";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const { register } = useAuth();

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
    <div className="flex flex-col items-center justify-center">
      <div className="flex-grow">
        <div className="flex items-center justify-center">
          <div className="flex flex-col relative px-12 py-6 mt-4 text-left bg-white rounded-xl border border-black shadow-lg">
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
              </div>

              <div className="mt-4">
                <label className="block font-medium">
                  Password
                  <label>
                    <input
                      type="password"
                      name="password"
                      placeholder="••••••••"
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
                      className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                      onChange={(e) => {
                        setConfirmPass(e.target.value);
                      }}
                      required
                    />
                  </label>
                </label>
              </div>

              <div className="flex items-baseline justify-center my-1">
                <button className="w-full py-2 mt-4 text-white font-semibold bg-emerald-600 rounded-lg hover:bg-black hover:text-white transition ease-linear duration-200">
                  Register
                </button>
              </div>
              <hr className="my-6"/>
              <div className="flex justify-center items-center my-2">
                <Link to="/login" className="hover:underline text-blue-600 font-semibold mx-1">
                Already have an account?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
