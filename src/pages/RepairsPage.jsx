import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RepairForm from "../components/RepairForm";
import RepairList from "../components/RepairList";
import Spinner from "../components/Spinner";
import { useAuth } from "../auth/auth-context";
import {
  fetchRepairs,
  fetchClients,
  fetchDevices,
  addRepair,
  updateRepair,
  updateRepairStatus,
  deleteRepair,
  clearError,
} from "../features/repairs/repairsSlice";
import {
  selectRepairs,
  selectClients,
  selectLoading,
  selectError,
  selectDeleteLoadingId,
} from "../features/repairs/repairsSelectors";

function RepairsPage() {
  const { username, signOut } = useAuth();
  const dispatch = useDispatch();

  const repairs = useSelector(selectRepairs);
  const clients = useSelector(selectClients);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const deleteLoadingId = useSelector(selectDeleteLoadingId);

  const [editing, setEditing] = useState(null);

  const loadData = useCallback(() => {
    dispatch(fetchRepairs());
    dispatch(fetchClients());
    dispatch(fetchDevices());
  }, [dispatch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSubmit = async (data) => {
    dispatch(clearError());
    try {
      if (editing) {
        await dispatch(
          updateRepair({
            id: editing.id,
            data: {
              clientId: data.clientId,
              deviceId: data.deviceId,
              problemDescription: data.problemDescription,
            },
          })
        ).unwrap();
        if (data.status !== editing.status) {
          await dispatch(
            updateRepairStatus({
              id: editing.id,
              statusUpdate: { status: data.status },
            })
          ).unwrap();
        }
        setEditing(null);
      } else {
        await dispatch(
          addRepair({
            clientId: data.clientId,
            deviceId: data.deviceId,
            problemDescription: data.problemDescription,
            status: data.status,
          })
        ).unwrap();
      }
      await loadData();
    } catch {
      // Ошибка уже обработана в extraReducers (rejected -> state.error)
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Удалить эту заявку?")) {
      return;
    }
    dispatch(clearError());
    try {
      await dispatch(deleteRepair(id)).unwrap();
      if (editing && editing.id === id) {
        setEditing(null);
      }
      await loadData();
    } catch {
      // Ошибка уже обработана в extraReducers (rejected -> state.error)
    }
  };

  if (error) {
    return (
      <div className="app">
        <div className="app-header">
          <h1>Учёт заявок на ремонт техники</h1>
          <div className="user-box">
            <span>Пользователь: {username}</span>
            <button type="button" onClick={signOut}>
              Выйти
            </button>
          </div>
        </div>
        <p className="error">{error}</p>
        <button type="button" onClick={() => dispatch(clearError())}>
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="app-header">
        <h1>Учёт заявок на ремонт техники</h1>
        <div className="user-box">
          <span>Пользователь: {username}</span>
          <button type="button" onClick={signOut}>
            Выйти
          </button>
        </div>
      </div>

      <p className="subtitle">Всего заявок: {repairs.length}</p>

      <RepairForm
        key={editing ? editing.id : "new"}
        clients={clients}
        editing={editing}
        onSubmit={handleSubmit}
        onCancel={() => setEditing(null)}
      />

      <h2>Список заявок</h2>
      {loading ? (
        <Spinner size={32} text="Загрузка заявок…" />
      ) : (
        <RepairList
          repairs={repairs}
          onEdit={(repair) => setEditing(repair)}
          onDelete={handleDelete}
          deleteLoadingId={deleteLoadingId}
        />
      )}
    </div>
  );
}

export default RepairsPage;
