import { authRequest } from "../http/authRequest";

// Все эндпоинты заявок/клиентов/устройств требуют авторизации,
// поэтому используем authRequest (токен + авто-разлогин на 401).
const repairApi = {
  all: () => authRequest("/api/requests"),
  get: (id) => authRequest(`/api/requests/${id}`),
  add: (repair) => authRequest("/api/requests", { method: "POST", body: repair }),
  update: (id, repair) => authRequest(`/api/requests/${id}`, { method: "PUT", body: repair }),
  updateStatus: (id, statusUpdate) =>
    authRequest(`/api/requests/${id}/status`, { method: "PUT", body: statusUpdate }),
  delete: (id) => authRequest(`/api/requests/${id}`, { method: "DELETE" }),

  clients: () => authRequest("/api/clients"),
  devices: () => authRequest("/api/devices"),
};

export default repairApi;
