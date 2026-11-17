import { createSelector } from "reselect";

// Селектор среза корневого состояния

const selectRepairsDomain = (state) => state.repairs;

// Примитивные поля (мемоизированы)

const selectDevices = createSelector(
  [selectRepairsDomain],
  (domain) => domain.devices
);

export const selectRepairs = createSelector(
  [selectRepairsDomain],
  (domain) => domain.repairs
);

export const selectClients = createSelector(
  [selectRepairsDomain],
  (domain) => domain.clients
);

export const selectLoading = createSelector(
  [selectRepairsDomain],
  (domain) => domain.loading
);

export const selectError = createSelector(
  [selectRepairsDomain],
  (domain) => domain.error
);

export const selectDeleteLoadingId = createSelector(
  [selectRepairsDomain],
  (domain) => domain.deleteLoadingId
);

// Фабричные селекторы с аргументами
export const makeSelectDevicesByClient = () =>
  createSelector(
    [selectDevices, (_, clientId) => clientId],
    (devices, clientId) =>
      clientId
        ? devices.filter((d) => String(d.clientId) === String(clientId))
        : []
  );
