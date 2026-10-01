import { clearAuth, getToken } from "../auth/tokenStorage";

// Адрес бэкенда. При необходимости задаётся через .env (VITE_API_URL).
export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function parseBody(response) {
  const text = await response.text();
  if (!text) {
    return null;
  }
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

// Единая точка обращения к API: подставляет Bearer-токен, разбирает ошибки
// и автоматически разлогинивает при истёкшем/неверном токене (401).
export async function request(path, { method = "GET", body } = {}) {
  const headers = {};
  const token = getToken();

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError(
      `Не удалось соединиться с сервером (${BASE_URL}). Проверьте, запущен ли backend.`,
      0
    );
  }

  if (response.status === 401) {
    clearAuth();
    // Сигнал AuthProvider'у — разлогинить и увести на /login.
    window.dispatchEvent(new Event("auth:unauthorized"));
    throw new ApiError("Требуется авторизация. Войдите в систему заново.", 401);
  }

  if (!response.ok) {
    const data = await parseBody(response);
    throw new ApiError(data?.message || `Ошибка запроса (${response.status})`, response.status);
  }

  return parseBody(response);
}
