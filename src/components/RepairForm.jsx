function RepairForm() {
    return (
      <div className="form">
        <h2>Новая заявка</h2>
  
        <input placeholder="Что сломано (описание)" />
        <input placeholder="ФИО клиента" />
        <input placeholder="Устройство" />
  
        <select defaultValue="Новая">
          <option>Новая</option>
          <option>В работе</option>
          <option>Завершена</option>
        </select>
  
        <div className="buttons">
          <button>Добавить</button>
        </div>
      </div>
    );
  }
  
  export default RepairForm;