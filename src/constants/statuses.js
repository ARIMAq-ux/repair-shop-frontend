// Статусы заявки на бэкенде — enum RequestStatus (NEW, DIAGNOSTICS, ...).
export const STATUS_OPTIONS = [
  { value: "NEW", label: "Новая" },
  { value: "DIAGNOSTICS", label: "Диагностика" },
  { value: "IN_PROGRESS", label: "В работе" },
  { value: "WAITING_PARTS", label: "Ожидание запчастей" },
  { value: "READY", label: "Готова" },
  { value: "COMPLETED", label: "Завершена" },
  { value: "CANCELLED", label: "Отменена" },
];

const STATUS_LABELS = STATUS_OPTIONS.reduce((acc, option) => {
  acc[option.value] = option.label;
  return acc;
}, {});

export function statusLabel(value) {
  return STATUS_LABELS[value] || value;
}

export function statusClassName(value) {
  return "status status-" + String(value || "").toLowerCase();
}
