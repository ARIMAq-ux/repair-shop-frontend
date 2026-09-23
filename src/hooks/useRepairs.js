import { useState } from "react";
import RepairAPI from "../api/RepairAPI";

function useRepairs() {
  const [repairs, setRepairs] = useState(RepairAPI.all());

    const [editId, setEditId] = useState(null);

    const [editData, setEditData] = useState(null);

    const refresh = () => {
    setRepairs([...RepairAPI.all()]);
  };

  
  const saveRepair = (data) => {
    if (editId === null) {
      RepairAPI.add(data);
    } else {
      RepairAPI.update({ ...data, id: editId });
      setEditId(null);
      setEditData(null);
    }
    refresh();
  };

  
  const startEdit = (repair) => {
    setEditId(repair.id);
    setEditData(repair);
  };

  
  const cancelEdit = () => {
    setEditId(null);
    setEditData(null);
  };

  
  const removeRepair = (id) => {
    if (window.confirm("Удалить заявку?")) {
      RepairAPI.delete(id);
      refresh();
    }
  };

  
  return {
    repairs,
    editId,
    editData,
    saveRepair,
    startEdit,
    cancelEdit,
    removeRepair,
  };
}

export default useRepairs;