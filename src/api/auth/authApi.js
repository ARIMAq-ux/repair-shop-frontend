import { publicRequest } from "../http/publicRequest";

// POST /api/auth/login -> { token, type, username }
// 401 здесь означает «неверный логин или пароль», а не истёкшую сессию.
export function login(username, password) {
  return publicRequest("/api/auth/login", {
    method: "POST",
    body: { username, password },
  });
}

// POST /api/auth/register -> { token, type, username }
// 400 обычно означает «пользователь уже существует» или ошибку валидации.
export function register(username, password) {
  return publicRequest("/api/auth/register", {
    method: "POST",
    body: { username, password },
  });
}
