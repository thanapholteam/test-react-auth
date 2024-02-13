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
      <div className="flex flex-col items-center justify-center">
        <div className="flex-grow">
          <div className="flex items-center justify-center">
            <div className="px-8 py-6 mt-4 text-left bg-white rounded-xl border-2 border-black shadow-lg">
              <h3 className="text-2xl font-bold text-center mt-3">Sign In</h3>
              <form onSubmit={(e) => handleLogin(e)}>
                <div className="mt-4">
                  <label className="block font-medium">
                    Email
                    <label>
                      <input
                        type="text"
                        placeholder="Email"
                        name="email"
                        onChange={(e) => {
                          onFormChange(e);
                        }}
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
                        onChange={(e) => {
                          onFormChange(e);
                        }}
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-600"
                        required
                      />
                    </label>
                  </label>
                </div>
                <div className="flex items-baseline justify-between my-1">
                  <button
                    className="px-6 py-2 mt-4 text-white font-semibold bg-red-600 rounded-lg hover:bg-black hover:text-white transition ease-linear duration-200"
                    type="submit"
                    // onClick={handleLogin}
                  >
                    Login
                  </button>
                  <Link
                    to="/forgot-password"
                    className="text-sm hover:underline"
                  >
                    Forgot password?
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
