import {
  createContext,
  useCallback,
  useContext,
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

type AuthProviderProps = {
  children: React.JSX.Element[];
};

const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthen, setIsAuthen] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const login = async (data: LoginPayload) => {
    try {
      const res = await axiosInstance.post("/user/login", data);
      console.log(res);

      if (res.status === 200) {
        setIsAuthen(true);
        navigate("/user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      const res = await axiosInstance.get("/user/logout");
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
      console.log(res);

      if (res.status === 200) {
        setEmail(res.data.data.email);
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
  return useContext(AuthContext);
};
