import { Link } from "react-router-dom";

const Login = () => {
  const handleLogin = () => {};
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex-grow">
          <div className="flex items-center justify-center">
            <div className="px-8 py-6 mt-4 text-left bg-white rounded-xl border-2 border-black shadow-lg">
              <h3 className="text-2xl font-bold text-center mt-3">Sign In</h3>
              <form action="">
                <div className="mt-4">
                  <div>
                    <label className="block font-medium">
                      Email
                      <label>
                        <input
                          type="text"
                          placeholder="Email"
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
                          placeholder="Password"
                          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-600"
                          required
                        />
                      </label>
                    </label>
                  </div>
                  <div className="flex items-baseline justify-between my-1">
                    <button
                      className="px-6 py-2 mt-4 text-white font-semibold bg-red-600 rounded-lg hover:bg-black hover:text-white transition ease-linear duration-200"
                      onClick={handleLogin}
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
                  <div className="mt-3 my-1 text-center mx-3 font-semibold">
                    Or
                  </div>

                  <div className="text-center">
                    <button
                      className="px-4 py-3 mt-4 mr-1 text-black font-medium bg-gray-200 rounded-lg hover:bg-black hover:text-white transition ease-linear duration-00"
                      // onClick={() => handleLogin(googleProvider)}
                    >
                      <img
                        src="images/google_logo.png"
                        alt="google"
                        width={20}
                        height={20}
                        className="inline mr-2 mb-1"
                      />
                      Sign in with Google
                    </button>
                  </div>
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
