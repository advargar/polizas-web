import { createSlice } from '@reduxjs/toolkit';

export const policySlice = createSlice({
  name: 'policies',
  initialState: {
    policies: [],
    active: null,
    isSaving: false
  },
  reducers: {
    setPolicies: (state, action) => {
      state.policies = action.payload;
    },
    setActivePolicy: (state, action) => {
      state.active = action.payload;
    },
    addPolicy: (state, action) => {
      state.policies.push(action.payload);
      state.isSaving = false;
    },
    updatePolicy: (state, action) => {
      state.policies = state.policies.map(policy =>
        policy.policyNumber === action.payload.policyNumber ? action.payload : policy
      );
    },
    deletePolicy: (state, action) => {
      state.policies = state.policies.filter(policy => policy.policyNumber !== action.payload);
    },
    setSaving: (state) => {
      state.isSaving = true;
    }
  }
});

export const { setPolicies, setActivePolicy, addPolicy, updatePolicy, deletePolicy, setSaving } = policySlice.actions;
