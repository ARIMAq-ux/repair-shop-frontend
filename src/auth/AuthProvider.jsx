import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginRequest, register as registerRequest } from "../api/auth/authApi";
import { clearAuth, getToken, getUsername, saveAuth } from "./tokenStorage";
import { AuthContext } from "./auth-context";
import { authEvents, AUTH_UNAUTHORIZED } from "../api/auth/authEvents";

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => getToken());
  // username — это ДАННЫЕ (имя пользователя), не путать с функциями ниже.
  const [username, setUsername] = useState(() => getUsername());

  // Чистим сессию и уводим на логин.
  const clearSession = useCallback(() => {
    clearAuth();
    setToken(null);
    setUsername(null);
    navigate("/login", { replace: true });
  }, [navigate]);

  // Сохраняет полученные от сервера токен и имя в state и localStorage.
  const applyAuth = useCallback((data) => {
    saveAuth(data.token, data.username);
    setToken(data.token);
    setUsername(data.username);
  }, []);

  // Действие «войти». Параметр name, чтобы не смешивать с данными username.
  const signIn = useCallback(
    async (name, password) => {
      const data = await loginRequest(name, password);
      applyAuth(data);
    },
    [applyAuth]
  );

  // Действие «зарегистрироваться». Бэкенд сразу возвращает токен,
  // поэтому после регистрации пользователь считается вошедшим.
  const signUp = useCallback(
    async (name, password) => {
      const data = await registerRequest(name, password);
      applyAuth(data);
    },
    [applyAuth]
  );

  // Действие «выйти».
  const signOut = useCallback(() => {
    clearSession();
  }, [clearSession]);

  // Реакция на 401 из api/http/authRequest.js: токен истёк — уводим на логин.
  useEffect(() => {
    authEvents.addEventListener(AUTH_UNAUTHORIZED, clearSession);
    return () => authEvents.removeEventListener(AUTH_UNAUTHORIZED, clearSession);
  }, [clearSession]);

  const value = {
    token,
    username,
    isAuthenticated: Boolean(token),
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
