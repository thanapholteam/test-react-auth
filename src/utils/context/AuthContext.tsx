import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../Axios";
import { LoginPayload } from "@/types/payload";

export interface AuthContextValue {
  email: string;
  isAuthen: boolean;
  login: (data: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
}

// interface AuthContextType {
//   authContext: AuthContextValue;
//   setAuthContext: (value: AuthContextValue) => void;
// }

export const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.JSX.Element }) => {
  const [isAuthen, setIsAuthen] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const login = async (data: LoginPayload) => {
    try {
      const res = await axiosInstance.post("/user/login", data);
      console.log(res);

      if (res.status === 200) {
        setEmail(res.data.email);
        setIsAuthen(true);
        navigate("/user");
      }
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };

  const logout = async () => {
    try {
      const res = await axiosInstance.post("/user/logout");
      console.log(res);
      if (res.status === 200) {
        setIsAuthen(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setIsAuthen(false);
      navigate("/");
    }
  };

  const handleLogin = useCallback(async (): Promise<void> => {
    try {
      const res = await axiosInstance.get("/user/me");

      if (res.status === 200) {
        setEmail(res.data.email);
        setIsAuthen(true);
      }
    } catch (err) {
      setIsAuthen(false);
    }
  }, []);

  useEffect(() => {
    handleLogin();
  }, [handleLogin]);

  const contextValue = useMemo(() => {
    return {
      email,
      isAuthen,
      login,
      logout,
    };
  }, [isAuthen]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return createContext(AuthContext);
};
