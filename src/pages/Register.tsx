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
          <div className="px-8 py-6 mt-4 text-left bg-white rounded-xl border-2 border-black shadow-lg">
            <h3 className="text-2xl font-bold text-center mt-3">Register</h3>
            <form onSubmit={(e) => handleRegister(e)}>
              <div className="mt-4">
                <label className="block font-medium">
                  Email
                  <label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      onChange={onFormChange}
                      className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-600"
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
                      placeholder="Password"
                      onChange={onFormChange}
                      className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-600"
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
                      placeholder="Password"
                      className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-600"
                      onChange={(e) => {
                        setConfirmPass(e.target.value);
                      }}
                      required
                    />
                  </label>
                </label>
              </div>

              <div className="flex items-baseline justify-between my-1">
                <button className="px-6 py-2 mt-4 text-white font-semibold bg-red-600 rounded-lg hover:bg-black hover:text-white transition ease-linear duration-200">
                  Register
                </button>
                <Link to="/login" className="text-sm hover:underline">
                  already have an account?
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
