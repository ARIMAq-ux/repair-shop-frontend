import useRepairs from "./hooks/useRepairs";
import RepairForm from "./components/RepairForm";
import RepairList from "./components/RepairList";
import "./App.css";

function App() {
  const {
    repairs,
    editId,
    editData,
    saveRepair,
    startEdit,
    cancelEdit,
    removeRepair,
  } = useRepairs();

  return (
    <div className="app">
      <h1>🔧 Учёт заявок на ремонт техники</h1>
      <p className="subtitle">Всего заявок: {repairs.length}</p>

      <RepairForm
        onSubmit={saveRepair}
        editId={editId}
        initialData={editData}
        onCancel={cancelEdit}
      />

      <h2>Список заявок</h2>

      <RepairList
        repairs={repairs}
        onEdit={startEdit}
        onDelete={removeRepair}
      />
    </div>
  );
}

export default App;