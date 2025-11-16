import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuthStore } from "../stores/authStore";


export const useAuth = () => {
const navigate = useNavigate();
const setAuth = useAuthStore((s) => s.setAuth);
const clearAuth = useAuthStore((s) => s.clearAuth);


const login = async (email: string, password: string) => {
const res = await api.post("/auth/login", { email, password });
setAuth(res.data.token, res.data.user);
navigate("/");
};


const signup = async (email: string, password: string, name?: string) => {
const res = await api.post("/auth/signup", { email, password, name });
setAuth(res.data.token, res.data.user);
navigate("/");
};


const logout = () => {
clearAuth();
navigate("/login");
};


return { login, signup, logout };
};