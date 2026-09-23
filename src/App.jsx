import RepairAPI from "./api/RepairAPI";
import RepairForm from "./components/RepairForm";
import RepairList from "./components/RepairList";
import "./App.css";

function App() {
  const repairs = RepairAPI.all();

  return (
    <div className="app">
      <h1>🔧 Учёт заявок на ремонт техники</h1>
      <p className="subtitle">Всего заявок: {repairs.length}</p>

      <RepairForm />

      <h2>Список заявок</h2>
      <RepairList repairs={repairs} />
    </div>
  );
}

export default App;