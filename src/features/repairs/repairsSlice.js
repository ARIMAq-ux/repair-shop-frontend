import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import repairApi from "../../api/repair/repairApi";

// --- Асинхронные экшены (thunks) ---

export const fetchRepairs = createAsyncThunk(
  "repairs/fetchRepairs",
  async (_, { rejectWithValue }) => {
    try {
      return await repairApi.all();
    } catch (err) {
      return rejectWithValue(err.message || "Не удалось загрузить заявки");
    }
  }
);

export const addRepair = createAsyncThunk(
  "repairs/addRepair",
  async (repair, { rejectWithValue }) => {
    try {
      return await repairApi.add(repair);
    } catch (err) {
      return rejectWithValue(err.message || "Не удалось создать заявку");
    }
  }
);

export const updateRepair = createAsyncThunk(
  "repairs/updateRepair",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await repairApi.update(id, data);
    } catch (err) {
      return rejectWithValue(err.message || "Не удалось обновить заявку");
    }
  }
);

export const deleteRepair = createAsyncThunk(
  "repairs/deleteRepair",
  async (id, { rejectWithValue }) => {
    try {
      await repairApi.delete(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message || "Не удалось удалить заявку");
    }
  }
);

export const fetchClients = createAsyncThunk(
  "repairs/fetchClients",
  async (_, { rejectWithValue }) => {
    try {
      return await repairApi.clients();
    } catch (err) {
      return rejectWithValue(err.message || "Не удалось загрузить клиентов");
    }
  }
);

export const fetchDevices = createAsyncThunk(
  "repairs/fetchDevices",
  async (_, { rejectWithValue }) => {
    try {
      return await repairApi.devices();
    } catch (err) {
      return rejectWithValue(err.message || "Не удалось загрузить устройства");
    }
  }
);

// --- Начальное состояние ---

const initialState = {
  repairs: [],
  clients: [],
  devices: [],
  loading: false,
  error: null,
  deleteLoadingId: null,
};

// --- slice ---

const repairsSlice = createSlice({
  name: "repairs",
  initialState,
  reducers: {
    // Простые редюсеры (пустые, действия можно добавить позже)
    clearError: (state) => {
      state.error = null;
    },
    setRepairs: (state, action) => {
      state.repairs = action.payload;
    },
  },
  extraReducers: (builder) => {
    // --- fetchRepairs ---
    builder.addCase(fetchRepairs.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchRepairs.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.repairs = action.payload;
    });
    builder.addCase(fetchRepairs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // --- addRepair ---
    builder.addCase(addRepair.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addRepair.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.repairs.push(action.payload);
    });
    builder.addCase(addRepair.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // --- updateRepair ---
    builder.addCase(updateRepair.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateRepair.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      const index = state.repairs.findIndex((r) => r.id === action.payload.id);
      if (index !== -1) {
        state.repairs[index] = action.payload;
      }
    });
    builder.addCase(updateRepair.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // --- deleteRepair ---
    builder.addCase(deleteRepair.pending, (state, action) => {
      state.deleteLoadingId = action.meta.arg;
      state.error = null;
    });
    builder.addCase(deleteRepair.fulfilled, (state, action) => {
      state.deleteLoadingId = null;
      state.repairs = state.repairs.filter((r) => r.id !== action.payload);
    });
    builder.addCase(deleteRepair.rejected, (state, action) => {
      state.deleteLoadingId = null;
      state.error = action.payload;
    });

    // --- fetchClients ---
    builder.addCase(fetchClients.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchClients.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.clients = action.payload;
    });
    builder.addCase(fetchClients.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // --- fetchDevices ---
    builder.addCase(fetchDevices.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchDevices.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.devices = action.payload;
    });
    builder.addCase(fetchDevices.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearError, setRepairs } = repairsSlice.actions;

export default repairsSlice.reducer;