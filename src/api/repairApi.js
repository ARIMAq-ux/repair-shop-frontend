import { request } from "./http";

const repairApi = {
  all: () => request("/api/requests"),
  get: (id) => request(`/api/requests/${id}`),
  add: (repair) => request("/api/requests", { method: "POST", body: repair }),
  update: (id, repair) => request(`/api/requests/${id}`, { method: "PUT", body: repair }),
  updateStatus: (id, statusUpdate) =>
    request(`/api/requests/${id}/status`, { method: "PUT", body: statusUpdate }),
  delete: (id) => request(`/api/requests/${id}`, { method: "DELETE" }),

  clients: () => request("/api/clients"),
  devices: () => request("/api/devices"),
};

export default repairApi;
