function RepairList({ repairs, onEdit, onDelete }) {
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
  }
  
  export default RepairList;