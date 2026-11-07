import { sendRequest } from "./sendRequest";

// Запросы, которые не требуют авторизации (login/register).
// Токен не подставляется, 401 НЕ приводит к авто-разлогину —
// здесь 401 значит «неверные логин/пароль».
export function publicRequest(path, { method = "GET", body } = {}) {
  return sendRequest(path, { method, body });
}
