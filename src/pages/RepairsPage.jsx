import { useCallback, useEffect, useState } from "react";
import repairApi from "../api/repairApi";
import RepairForm from "../components/RepairForm";
import RepairList from "../components/RepairList";
import { useAuth } from "../auth/auth-context";

function RepairsPage() {
  const { username, logout } = useAuth();
  const [repairs, setRepairs] = useState([]);
  const [clients, setClients] = useState([]);
  const [devices, setDevices] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Загрузка данных. Сеттеры вызываются в колбэках промиса —
  // это не «синхронный setState в эффекте».
  const loadData = useCallback(() => {
    return Promise.all([repairApi.all(), repairApi.clients(), repairApi.devices()])
      .then(([repairsData, clientsData, devicesData]) => {
        setRepairs(repairsData);
        setClients(clientsData);
        setDevices(devicesData);
        setError("");
      })
      .catch((err) => {
        setError(err.message || "Не удалось загрузить данные");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSubmit = async (data) => {
    setError("");
    try {
      if (editing) {
        // PUT /api/requests/{id} — клиент, устройство и описание.
        await repairApi.update(editing.id, {
          clientId: data.clientId,
          deviceId: data.deviceId,
          problemDescription: data.problemDescription,
        });
        // Статус меняется отдельным эндпоинтом.
        if (data.status !== editing.status) {
          await repairApi.updateStatus(editing.id, { status: data.status });
        }
        setEditing(null);
      } else {
        // POST /api/requests — статус по умолчанию NEW на бэкенде.
        const created = await repairApi.add({
          clientId: data.clientId,
          deviceId: data.deviceId,
          problemDescription: data.problemDescription,
        });
        if (data.status !== created.status) {
          await repairApi.updateStatus(created.id, { status: data.status });
        }
      }
      await loadData();
    } catch (err) {
      setError(err.message || "Не удалось сохранить заявку");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Удалить эту заявку?")) {
      return;
    }
    setError("");
    try {
      await repairApi.delete(id);
      if (editing && editing.id === id) {
        setEditing(null);
      }
      await loadData();
    } catch (err) {
      setError(err.message || "Не удалось удалить заявку");
    }
  };

  return (
    <div className="app">
      <div className="app-header">
        <h1>Учёт заявок на ремонт техники</h1>
        <div className="user-box">
          <span>Пользователь: {username}</span>
          <button type="button" onClick={logout}>
            Выйти
          </button>
        </div>
      </div>

      <p className="subtitle">Всего заявок: {repairs.length}</p>

      {error && <p className="error">{error}</p>}

      <RepairForm
        key={editing ? editing.id : "new"}
        clients={clients}
        devices={devices}
        editing={editing}
        onSubmit={handleSubmit}
        onCancel={() => setEditing(null)}
      />

      <h2>Список заявок</h2>
      {loading ? (
        <p className="muted">Загрузка…</p>
      ) : (
        <RepairList
          repairs={repairs}
          onEdit={(repair) => setEditing(repair)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default RepairsPage;
