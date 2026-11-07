import { useContext } from "react";
import { AuthContext } from "./auth-context";

// Хук доступа к контексту авторизации.
// Вынесен отдельно от auth-context.js, чтобы файл контекста
// содержал только создание контекста, без логики React-хуков.
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth должен использоваться внутри AuthProvider");
  }
  return context;
}
