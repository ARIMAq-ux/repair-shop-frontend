import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/auth-context";

function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Уже авторизованный пользователь не должен видеть форму входа.
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(username.trim(), password);
    } catch (err) {
      setError(err.message || "Не удалось войти в систему");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Вход в систему</h1>
        <p className="login-subtitle">Учёт заявок на ремонт техники</p>

        {error && <p className="error">{error}</p>}

        <label>
          Имя пользователя
          <input
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
            required
          />
        </label>

        <label>
          Пароль
          <input
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Вход…" : "Войти"}
        </button>

        <p className="login-hint">Тестовый доступ: admin / password</p>
      </form>
    </div>
  );
}

export default LoginPage;
