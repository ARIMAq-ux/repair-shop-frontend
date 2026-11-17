import { createContext, useContext } from "react";

// Контекст авторизации.
export const AuthContext = createContext(null);

// Хук доступа к контексту авторизации.
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth должен использоваться внутри AuthProvider");
  }
  return context;
}
