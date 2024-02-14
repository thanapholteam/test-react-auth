import { axiosInstance } from "@/utils/Axios";
import { useAuth } from "@/utils/context/AuthContext";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const User = () => {
  const { logout } = useAuth();
  const [user, setUser] = useState(null);

  let navigate = useNavigate();
  const gohome = () => {
    console.log('go home');
    navigate('/');
  }

  const handleGetUser = useCallback(async (): Promise<void> => {
    try {
      const res = await axiosInstance.get("/user/me");

      if (res.status === 200) {
        setUser(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    handleGetUser();
  }, [handleGetUser]);

  return (
    <div className="bg-[url('images/bg.jpeg')] bg-center bg-cover bg-repeat">
    <div className="flex justify-center items-center h-screen backdrop-blur-md">
      <div className="text-center w-full p-6 bg-white rounded-lg shadow border md:mt-0 sm:max-w-md sm:p-8">
      <h1 className="text-[32px] font-bold">Welcome!</h1>
      <div className="block my-5 py-6">
        <h1 className="text-2xl font-bold mb-4">{user?.email || ''}</h1>
        <span className="text-md font-bold">Hope you enjoy your visit to our website.</span>
      </div>
      <button onClick={gohome} className="bg-blue-500 rounded-lg py-2 w-full my-2 text-white font-bold hover:bg-blue-600">
        Back to Home
      </button>
      <button onClick={logout} className="bg-red-500 rounded-lg py-2 w-full my-2 text-white font-bold hover:bg-red-600">
        Logout
      </button>
      </div>
    </div>
    </div>
  );
};

export default User;
