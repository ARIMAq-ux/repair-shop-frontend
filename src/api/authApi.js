import { request } from "./http";

// POST /api/auth/login -> { token, type: "Bearer", username }
export function login(username, password) {
  return request("/api/auth/login", { method: "POST", body: { username, password } });
}
