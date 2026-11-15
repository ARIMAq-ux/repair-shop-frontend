import { createSelector } from "reselect";

// --- Root slice selector ---

const selectRepairsDomain = (state) => state.repairs;

// --- Primitive fields (memoized, return same reference when slice unchanged) ---

export const selectRepairs = createSelector(
  [selectRepairsDomain],
  (domain) => domain.repairs
);

export const selectClients = createSelector(
  [selectRepairsDomain],
  (domain) => domain.clients
);

export const selectDevices = createSelector(
  [selectRepairsDomain],
  (domain) => domain.devices
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

// --- Derived data ---

export const selectRepairsCount = createSelector(
  [selectRepairs],
  (repairs) => repairs.length
);

// --- Factory selectors with arguments (memoized per last arguments) ---

// Reselect 5 caches only the last call by default, which is enough for our UI:
// one open repair card and one active client filter at a time.
export const makeSelectRepairById = () =>
  createSelector(
    [selectRepairs, (_, id) => id],
    (repairs, id) => repairs.find((r) => String(r.id) === String(id))
  );

export const makeSelectDevicesByClient = () =>
  createSelector(
    [selectDevices, (_, clientId) => clientId],
    (devices, clientId) =>
      clientId
        ? devices.filter((d) => String(d.clientId) === String(clientId))
        : []
  );
