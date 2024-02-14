import { axiosInstance } from "@/utils/Axios";
import { useAuth } from "@/utils/context/AuthContext";
import { useCallback, useEffect, useState } from "react";

const User = () => {
  const { logout } = useAuth();
  const [user, setUser] = useState(null);

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
    <div className="text-center">
      <div className="w-full p-6 bg-white rounded-lg shadow border md:mt-0 sm:max-w-md sm:p-8">
      <h1 className="text-lg font-bold">Welcome {user?.email || ''}</h1>
      <button onClick={logout} className="bg-blue-400 rounded-lg p-1">
        Logout
      </button>
      </div>
    </div>
  );
};

export default User;
