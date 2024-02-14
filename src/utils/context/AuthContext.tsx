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
import { LoginPayload, RegisterPayload } from "@/types/payload";
import { MySwal } from "../Swal";

export interface AuthContextValue {
  email: string;
  isAuthen: boolean;
  login: (data: LoginPayload) => Promise<void>;
  register: (data: RegisterPayload) => Promise<void>;
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
        MySwal.fire({
          icon: "success",
          title: "Login Success",
          timer: 1500,
        });
      }
      else if(res.status === 204){
        MySwal.fire({
          icon: "error",
          title: "Something went wrong!",
          text: "Could not find your account.",
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
      MySwal.fire({
        icon: "error",
        title: "Something went wrong!",
        text:"Email or password is incorrect.",
        timer: 1500,
      });
    }
  };

  const register = async (data: RegisterPayload) => {
    try {
      const res = await axiosInstance.post("/user/register", data);
      console.log(res);

      if (res.status === 201) {
        MySwal.fire({
          icon: "success",
          title: "Register Success",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => navigate("/login"));
      }
    } catch (error) {
      console.log(error);
      MySwal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: "This email address is already used by another.",
        timer: 1500,
      });
    }
  };

  const logout = async () => {
    try {
      const res = await axiosInstance.get("/user/logout");

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
      register,
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
