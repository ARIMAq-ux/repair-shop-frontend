import { useState } from "react";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { validateLoginForm, hasErrors } from "../validation/authValidation";

function LoginPage() {
  const { isAuthenticated, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Уже авторизованный пользователь не должен видеть форму входа.
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Меняет значение поля и сразу убирает его ошибку (и общую ошибку сервера),
  // чтобы сообщения не «висели», пока пользователь исправляет ввод.
  const handleChange = (setter, field) => (event) => {
    setter(event.target.value);
    setError("");
    setFieldErrors((prev) => {
      if (!prev[field]) {
        return prev;
      }
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Защита от двойной отправки (Enter во время запроса).
    if (loading) {
      return;
    }

    setError("");

    const errors = validateLoginForm({ username, password });
    setFieldErrors(errors);
    if (hasErrors(errors)) {
      return;
    }

    setLoading(true);
    try {
      await signIn(username.trim(), password);
      navigate(location.state?.from || "/", { replace: true });
    } catch (err) {
      setError(err.message || "Не удалось войти в систему");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <h1>Вход в систему</h1>
        <p className="login-subtitle">Учёт заявок на ремонт техники</p>

        {error && <p className="error">{error}</p>}

        <label>
          Имя пользователя
          <input
            name="username"
            value={username}
            onChange={handleChange(setUsername, "username")}
            autoComplete="username"
            disabled={loading}
          />
          {fieldErrors.username && <span className="error">{fieldErrors.username}</span>}
        </label>

        <label>
          Пароль
          <input
            name="password"
            type="password"
            value={password}
            onChange={handleChange(setPassword, "password")}
            autoComplete="current-password"
            disabled={loading}
          />
          {fieldErrors.password && <span className="error">{fieldErrors.password}</span>}
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Вход…" : "Войти"}
        </button>

        <p className="login-hint">
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </p>
        {import.meta.env.DEV && (
          <p className="login-hint">Тестовый доступ: admin / password</p>
        )}
      </form>
    </div>
  );
}

export default LoginPage;
