import { sendRequest } from "./sendRequest";
import { ApiError } from "./errors";
import { clearAuth, getToken } from "../../auth/tokenStorage";
import { authEvents, AUTH_UNAUTHORIZED } from "../auth/authEvents";

// Запросы, требующие авторизации.
// Подставляет Bearer-токен и при 401 разлогинивает (сессия истекла/токен неверный).
export async function authRequest(path, { method = "GET", body, headers = {} } = {}) {
  const finalHeaders = { ...headers };
  const token = getToken();

  if (token) {
    finalHeaders.Authorization = `Bearer ${token}`;
  }

  try {
    return await sendRequest(path, { method, body, headers: finalHeaders });
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      clearAuth();
      // Сигнал AuthProvider'у — разлогинить и увести на /login.
      authEvents.dispatchEvent(new Event(AUTH_UNAUTHORIZED));
      throw new ApiError("Требуется авторизация. Войдите в систему заново.", 401);
    }
    throw error;
  }
}
