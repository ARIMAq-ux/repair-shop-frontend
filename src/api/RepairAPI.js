const RepairAPI = {
    repairs: [
      { id: 1, title: "Замена экрана", client: "Иван Петров", device: "Ноутбук Lenovo", status: "Новая" },
      { id: 2, title: "Чистка от пыли", client: "Анна Смирнова", device: "ПК HP", status: "В работе" },
      { id: 3, title: "Замена батареи", client: "Сергей Иванов", device: "Ноутбук Asus", status: "Новая" },
      { id: 4, title: "Переустановка ОС", client: "Мария Козлова", device: "ПК Dell", status: "Завершена" },
      { id: 5, title: "Ремонт клавиатуры", client: "Дмитрий Волков", device: "Ноутбук Acer", status: "В работе" },
      { id: 6, title: "Диагностика материнской платы", client: "Елена Морозова", device: "ПК Custom", status: "Новая" },
    ],
  
    all: function () {
      return this.repairs;
    },
  
    get: function (id) {
      const isRepair = (p) => p.id === id;
      return this.repairs.find(isRepair);
    },
  
    delete: function (id) {
      const isNotDelRepair = (p) => p.id !== id;
      this.repairs = this.repairs.filter(isNotDelRepair);
      return true;
    },
  
    add: function (repair) {
      if (!repair.id)
        repair = {
          ...repair,
          id:
            this.repairs.reduce((prev, current) => {
              return prev.id > current.id ? prev : current;
            }, { id: 0 }).id + 1,
        };
      this.repairs = [...this.repairs, repair];
      return repair;
    },
  
    update: function (repair) {
      const index = this.repairs.findIndex((p) => p.id === repair.id);
      if (index !== -1) {
        this.repairs[index] = repair;
      }
      return repair;
    },
  };
  
  export default RepairAPI;