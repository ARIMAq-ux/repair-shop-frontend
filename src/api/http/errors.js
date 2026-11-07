// Единый класс ошибки API.
// status = 0 означает, что до сервера достучаться не удалось (сеть/бэкенд не запущен).
export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}
