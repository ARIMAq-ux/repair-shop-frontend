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
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>{editId === null ? "Новая заявка" : "Редактирование"}</h2>

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