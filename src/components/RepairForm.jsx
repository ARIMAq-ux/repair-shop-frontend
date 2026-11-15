import { useState } from "react";
import { useSelector } from "react-redux";
import { STATUS_OPTIONS } from "../constants/statuses";
import { makeSelectDevicesByClient } from "../features/repairs/repairsSelectors";

// Экземпляр селектора создаётся один раз на уровне модуля, чтобы его внутренний
// кэш (reselect 5 хранит последний вызов) не сбрасывался при каждом рендере.
const selectClientDevices = makeSelectDevicesByClient();

const emptyForm = {
  problemDescription: "",
  clientId: "",
  deviceId: "",
  status: "NEW",
};

// Форма работает в двух режимах: создание (editing = null) и редактирование.
function RepairForm({ clients, editing, onSubmit, onCancel }) {
  const [form, setForm] = useState(() =>
    editing
      ? {
          problemDescription: editing.problemDescription || "",
          clientId: String(editing.clientId ?? ""),
          deviceId: String(editing.deviceId ?? ""),
          status: editing.status || "NEW",
        }
      : emptyForm
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => {
      // При смене клиента сбрасываем устройство — список устройств зависит от клиента.
      if (name === "clientId") {
        return { ...prev, clientId: value, deviceId: "" };
      }
      return { ...prev, [name]: value };
    });
  };

  const clientDevices = useSelector((state) =>
    selectClientDevices(state, form.clientId)
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.problemDescription.trim() || !form.clientId || !form.deviceId) {
      return;
    }

    onSubmit({
      clientId: Number(form.clientId),
      deviceId: Number(form.deviceId),
      problemDescription: form.problemDescription.trim(),
      status: form.status,
    });

    if (!editing) {
      setForm({ ...emptyForm });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>{editing === null ? "Новая заявка" : "Редактирование"}</h2>
      <textarea
        name="problemDescription"
        placeholder="Что сломано (описание)"
        value={form.problemDescription}
        onChange={handleChange}
        rows={2}
        maxLength={1000}
        required
      />

      <select name="clientId" value={form.clientId} onChange={handleChange} required>
        <option value="">— выберите клиента —</option>
        {clients.map((client) => (
          <option key={client.id} value={client.id}>
            {client.fullName}
          </option>
        ))}
      </select>

      <select
        name="deviceId"
        value={form.deviceId}
        onChange={handleChange}
        required
        disabled={!form.clientId}
      >
        <option value="">— выберите устройство —</option>
        {clientDevices.map((device) => (
          <option key={device.id} value={device.id}>
            {device.brand} {device.model}
          </option>
        ))}
      </select>

      <select name="status" value={form.status} onChange={handleChange}>
        {STATUS_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <div className="buttons">
        <button type="submit">
          {editing === null ? "Добавить" : "Сохранить"}
        </button>
        {editing !== null && (
          <button type="button" onClick={onCancel}>
            Отмена
          </button>
        )}
      </div>
    </form>
  );
}

export default RepairForm;
