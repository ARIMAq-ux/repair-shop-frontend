import { createContext, useContext } from "react";

// Контекст лежит отдельно от компонента AuthProvider, чтобы файл
// с компонентом экспортировал только компонент (требование react-refresh).
export const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth должен использоваться внутри AuthProvider");
  }
  return context;
}
