import { LoginPayload } from "@/types/payload";
import { useAuth } from "@/utils/context/AuthContext";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const [loginForm, setLoginForm] = useState<LoginPayload>({
    email: "",
    password: "",
  });

  const onFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(loginForm);
    if (loginForm.email && loginForm.password) {
      await login(loginForm);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-start mt-4 px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex-grow">
          <div className="flex items-center justify-center">
            <div className="w-full p-6 bg-white rounded-lg shadow border md:mt-0 sm:max-w-md sm:p-8">
              <h3 className="text-2xl font-bold mt-3">Sign in to your account</h3>
              <form onSubmit={(e) => handleLogin(e)}>
                <div className="mt-4">
                  <label className="block font-medium">
                    Email
                    <label>
                      <input
                        type="email"
                        placeholder="name@mail.com"
                        name="email"
                        onChange={(e) => {
                          onFormChange(e);
                        }}
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
                        minLength={8}
                        onChange={(e) => {
                          onFormChange(e);
                        }}
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        required
                      />
                    </label>
                  </label>
                </div>
                <div className="mt-3 flex justify-end">
                    <Link
                    to="/forgot-password"
                    className="text-sm italic hover:underline "
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="flex items-baseline justify-center my-1">
                  <button
                    className="w-full py-2 mt-4 text-white font-semibold bg-emerald-600 rounded-lg hover:bg-black hover:text-white transition ease-linear duration-200"
                    type="submit"
                  >
                    Login
                  </button>
                </div>
                <hr className="my-6"/>
                <div className="mt-3 flex flex-row items-center justify-start text-sm">
                    Don't have an account yet?
                    <Link
                    to="/register"
                    className="hover:underline text-blue-600 font-semibold mx-1"
                  >
                    Sign up
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
