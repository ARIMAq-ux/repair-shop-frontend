<<<<<<< Updated upstream
import { useState, useEffect } from "react";

function RepairForm({ onSubmit, editId, initialData, onCancel }) {
  const [title, setTitle] = useState("");
  const [client, setClient] = useState("");
  const [device, setDevice] = useState("");
  const [status, setStatus] = useState("Новая");

  // Когда нажимаем "Редактировать" в списке — заполняем поля
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setClient(initialData.client);
      setDevice(initialData.device);
      setStatus(initialData.status);
    } else {
      // если отменили редактирование — сбрасываем форму
      setTitle("");
      setClient("");
      setDevice("");
      setStatus("Новая");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault(); // чтобы страница не перезагружалась

    // простая проверка
    if (title === "" || client === "") {
      alert("Заполни описание и клиента");
      return;
    }

    // отдаём данные наверх, в App
    onSubmit({ title, client, device, status });
=======
import { useState } from "react";
import { STATUS_OPTIONS } from "../constants/statuses";

const emptyForm = {
  problemDescription: "",
  clientId: "",
  deviceId: "",
  status: "NEW",
};

// Форма работает в двух режимах: создание (editing = null) и редактирование.
// Состояние инициализируется из props за счёт key на компоненте в RepairsPage.
function RepairForm({ clients, devices, editing, onSubmit, onCancel }) {
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

  const clientDevices = devices.filter(
    (device) => String(device.clientId) === form.clientId
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
      setForm(emptyForm);
    }
>>>>>>> Stashed changes
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>{editId === null ? "Новая заявка" : "Редактирование"}</h2>

<<<<<<< Updated upstream
      <input
        placeholder="Что сломано (описание)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="ФИО клиента"
        value={client}
        onChange={(e) => setClient(e.target.value)}
      />
      <input
        placeholder="Устройство"
        value={device}
        onChange={(e) => setDevice(e.target.value)}
      />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option>Новая</option>
        <option>В работе</option>
        <option>Завершена</option>
=======
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
>>>>>>> Stashed changes
      </select>

      <div className="buttons">
        <button type="submit">
          {editId === null ? "Добавить" : "Сохранить"}
        </button>
        {editId !== null && (
          <button type="button" onClick={onCancel}>
            Отмена
          </button>
        )}
      </div>
    </form>
  );
}

export default RepairForm;
