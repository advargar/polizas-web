import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useClient } from '../../hooks/useClient.js'; 


// Async actions
export const fetchClients = createAsyncThunk("Clients/fetchAll", async () => {
    const res = await useClient.getClients();
    return res.data;
  });
  
  export const fetchClientById = createAsyncThunk("Clients/fetchById", async (id) => {
    const res = await useClient.getClientById(id);
    return res.data;
  });
  
  export const createClient = createAsyncThunk("Clients/create", async (data) => {
    const res = await useClient.createClient(data);
    return res.data;
  });
  
  export const updateClient = createAsyncThunk("Clients/update", async ({ id, data }) => {
    const res = await useClient.updateClient(id, data);
    return res.data;
  });
  
  export const deleteClient = createAsyncThunk("Clients/delete", async (id) => {
    await useClient.deleteClient(id);
    return id;
  });

 const clientSlice = createSlice({
   name: "clients",
  initialState: {
    clients: [],
    selectedClient: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedClient: (state) => {
      state.selectedClient = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET all
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // GET by id
      .addCase(fetchClientById.fulfilled, (state, action) => {
        state.selectedClient = action.payload;
      })

      // CREATE
      .addCase(createClient.fulfilled, (state, action) => {
        state.clients.push(action.payload);
      })

      // UPDATE
      .addCase(updateClient.fulfilled, (state, action) => {
        const index = state.clients.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) state.clients[index] = action.payload;
      })

      // DELETE
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.clients = state.clients.filter((c) => c.id !== action.payload);
      });
  },
});


export const { clearSelectedClient } = clientSlice.actions;
export default clientSlice.reducer;