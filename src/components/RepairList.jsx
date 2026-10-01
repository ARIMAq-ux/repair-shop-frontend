import { statusClassName, statusLabel } from "../constants/statuses";

function RepairList({ repairs, onEdit, onDelete }) {
<<<<<<< Updated upstream
    if (repairs.length === 0) {
      return <p>Заявок нет</p>;
    }
  
    return (
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Описание</th>
            <th>Клиент</th>
            <th>Устройство</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {repairs.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.title}</td>
              <td>{r.client}</td>
              <td>{r.device}</td>
              <td>
                <span className={"status status-" + r.status.replace(/\s/g, "")}>
                  {r.status}
                </span>
              </td>
              <td>
                <button onClick={() => onEdit(r)}>✏️</button>
                <button onClick={() => onDelete(r.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
=======
  if (repairs.length === 0) {
    return <p className="muted">Заявок пока нет.</p>;
>>>>>>> Stashed changes
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Описание</th>
          <th>Клиент</th>
          <th>Устройство</th>
          <th>Статус</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        {repairs.map((r) => (
          <tr key={r.id}>
            <td>{r.id}</td>
            <td>{r.problemDescription}</td>
            <td>{r.clientName}</td>
            <td>{r.deviceInfo}</td>
            <td>
              <span className={statusClassName(r.status)}>{statusLabel(r.status)}</span>
            </td>
            <td className="actions">
              <button type="button" onClick={() => onEdit(r)}>
                Редактировать
              </button>
              <button type="button" onClick={() => onDelete(r.id)}>
                Удалить
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RepairList;
