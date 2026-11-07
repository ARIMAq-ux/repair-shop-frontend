// Правила валидации форм авторизации (вход и регистрация).
// Все сообщения — на русском, чтобы их можно было показывать пользователю как есть.

export const AUTH_LIMITS = {
  usernameMin: 3,
  usernameMax: 50,
  passwordMin: 6,
  passwordMax: 100,
};

// Разрешённые символы имени пользователя: латиница, цифры, точка, дефис, подчёркивание.
const USERNAME_PATTERN = /^[a-zA-Z0-9._-]+$/;

// Проверка имени пользователя.
// Возвращает строку с ошибкой или null, если всё в порядке.
export function validateUsername(value) {
  const username = (value ?? "").trim();

  if (!username) {
    return "Введите имя пользователя";
  }
  if (username.length < AUTH_LIMITS.usernameMin) {
    return `Имя пользователя должно содержать минимум ${AUTH_LIMITS.usernameMin} символа`;
  }
  if (username.length > AUTH_LIMITS.usernameMax) {
    return `Имя пользователя не должно превышать ${AUTH_LIMITS.usernameMax} символов`;
  }
  if (!USERNAME_PATTERN.test(username)) {
    return "Имя пользователя может содержать только латинские буквы, цифры, точку, дефис и подчёркивание";
  }

  return null;
}

// Проверка пароля.
export function validatePassword(value) {
  const password = value ?? "";

  if (!password) {
    return "Введите пароль";
  }
  if (password.length < AUTH_LIMITS.passwordMin) {
    return `Пароль должен содержать минимум ${AUTH_LIMITS.passwordMin} символов`;
  }
  if (password.length > AUTH_LIMITS.passwordMax) {
    return `Пароль не должен превышать ${AUTH_LIMITS.passwordMax} символов`;
  }
  if (password.trim().length !== password.length) {
    return "Пароль не должен начинаться или заканчиваться пробелом";
  }

  return null;
}

// Проверка подтверждения пароля (только для регистрации).
export function validatePasswordConfirm(password, confirm) {
  if (!confirm) {
    return "Подтвердите пароль";
  }
  if (password !== confirm) {
    return "Пароли не совпадают";
  }

  return null;
}

// Мягкая проверка имени пользователя для ВХОДА.
// Не применяем правила длины/символов: существующий аккаунт может быть
// создан по старым/другим правилам. Проверяем только, что поле не пустое.
export function validateUsernameForLogin(value) {
  const username = (value ?? "").trim();

  if (!username) {
    return "Введите имя пользователя";
  }

  return null;
}

// Мягкая проверка пароля для ВХОДА.
// Проверяем только, что пароль введён: правила состава — забота регистрации.
export function validatePasswordForLogin(value) {
  if (!(value ?? "")) {
    return "Введите пароль";
  }

  return null;
}

// Валидация формы входа: { username, password }.
// Возвращает объект { username?, password? } только с ошибками.
export function validateLoginForm({ username, password }) {
  const errors = {};

  const usernameError = validateUsernameForLogin(username);
  if (usernameError) {
    errors.username = usernameError;
  }

  const passwordError = validatePasswordForLogin(password);
  if (passwordError) {
    errors.password = passwordError;
  }

  return errors;
}

// Валидация формы регистрации: { username, password, passwordConfirm }.
export function validateRegisterForm({ username, password, passwordConfirm }) {
  const errors = validateLoginForm({ username, password });

  const confirmError = validatePasswordConfirm(password, passwordConfirm);
  if (confirmError) {
    errors.passwordConfirm = confirmError;
  }

  return errors;
}

// Есть ли хотя бы одна ошибка в объекте errors.
export function hasErrors(errors) {
  return Object.keys(errors).length > 0;
}
