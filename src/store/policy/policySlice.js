import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { usePolicy } from '../../hooks/usePolicy.js'; 


// Async actions
export const fetchPolicies = createAsyncThunk("Policies/fetchAll", async () => {
    const res = await usePolicy.getPolicies();
    return res.data;
  });
  
  export const fetchPolicyById = createAsyncThunk("Policies/fetchById", async (id) => {
    const res = await usePolicy.getPolicyById(id);
    return res.data;
  });
  
  export const createPolicy = createAsyncThunk("Policies/create", async (data) => {
    const res = await usePolicy.createPolicy(data);
    return res.data;
  });
  
  export const updatePolicy = createAsyncThunk("Policies/update", async ({ id, data }) => {
    const res = await usePolicy.updatePolicy(id, data);
    return res.data;
  });
  
  export const deletePolicy = createAsyncThunk("Policies/delete", async (id) => {
    await usePolicy.deletePolicy(id);
    return id;
  });

 const policySlice = createSlice({
   name: "policies",
  initialState: {
    policies: [],
    selectedPolicy: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedPolicy: (state) => {
      state.selectedPolicy = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET all
      .addCase(fetchPolicies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPolicies.fulfilled, (state, action) => {
        state.loading = false;
        state.policies = action.payload;
      })
      .addCase(fetchPolicies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // GET by id
      .addCase(fetchPolicyById.fulfilled, (state, action) => {
        state.selectedPolicy = action.payload;
      })

      // CREATE
      .addCase(createPolicy.fulfilled, (state, action) => {
        state.policies.push(action.payload);
      })

      // UPDATE
      .addCase(updatePolicy.fulfilled, (state, action) => {
        const index = state.policies.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) state.policies[index] = action.payload;
      })

      // DELETE
      .addCase(deletePolicy.fulfilled, (state, action) => {
        state.policies = state.policies.filter((c) => c.id !== action.payload);
      });
  },
});


export const { clearSelectedPolicy } = policySlice.actions;
export default policySlice.reducer;