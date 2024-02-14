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
      <h1 className="text-lg font-bold">User Info</h1>
      <p>{JSON.stringify(user)}</p>
      <button onClick={logout} className="bg-blue-400 rounded-lg p-1">
        Logout
      </button>
    </div>
  );
};

export default User;
