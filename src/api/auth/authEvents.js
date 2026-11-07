// События авторизации: единая точка, через которую слой API сообщает UI,
// что сессия больше недействительна (401 от сервера).
export const authEvents = new EventTarget();

// Имя события «требуется повторный вход».
export const AUTH_UNAUTHORIZED = "auth:unauthorized";
