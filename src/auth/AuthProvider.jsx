import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginRequest } from "../api/authApi";
import { clearAuth, getToken, getUsername, saveAuth } from "./tokenStorage";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => getToken());
  const [username, setUsername] = useState(() => getUsername());

  const resetAuth = useCallback(() => {
    clearAuth();
    setToken(null);
    setUsername(null);
    navigate("/login", { replace: true });
  }, [navigate]);

  const login = useCallback(async (userName, password) => {
    const data = await loginRequest(userName, password);
    saveAuth(data.token, data.username);
    setToken(data.token);
    setUsername(data.username);
  }, []);

  const logout = useCallback(() => {
    resetAuth();
  }, [resetAuth]);

  // Реакция на 401 из api/http.js: токен истёк — уводим на логин.
  useEffect(() => {
    window.addEventListener("auth:unauthorized", resetAuth);
    return () => window.removeEventListener("auth:unauthorized", resetAuth);
  }, [resetAuth]);

  const value = {
    token,
    username,
    isAuthenticated: Boolean(token),
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
