import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { validateRegisterForm, hasErrors } from "../validation/authValidation";

function RegisterPage() {
  const { isAuthenticated, signUp } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Уже авторизованный пользователь не должен видеть форму регистрации.
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

    const errors = validateRegisterForm({ username, password, passwordConfirm });
    setFieldErrors(errors);
    if (hasErrors(errors)) {
      return;
    }

    setLoading(true);
    try {
      await signUp(username.trim(), password);
    } catch (err) {
      setError(err.message || "Не удалось зарегистрироваться");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <h1>Регистрация</h1>
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
            autoComplete="new-password"
            disabled={loading}
          />
          {fieldErrors.password && <span className="error">{fieldErrors.password}</span>}
        </label>

        <label>
          Подтверждение пароля
          <input
            name="passwordConfirm"
            type="password"
            value={passwordConfirm}
            onChange={handleChange(setPasswordConfirm, "passwordConfirm")}
            autoComplete="new-password"
            disabled={loading}
          />
          {fieldErrors.passwordConfirm && (
            <span className="error">{fieldErrors.passwordConfirm}</span>
          )}
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Регистрация…" : "Зарегистрироваться"}
        </button>

        <p className="login-hint">
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
