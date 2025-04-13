import { Login } from '@mui/icons-material';
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // 'checking', 'authenticated', 'not-authenticated'
        uid: null,
        email: null,
        displayName: null,
        errorMessage: null,
    },
    reducers: {
        login: (state, action) => {
            state.status = 'authenticated';
            state.uid = action.payload.uid;
            state.email = action.payload.email;
            state.displayName = action.payload.displayName;
            state.errorMessage = null;
        },
        logout: (state, action) => {
            state.status = 'not-authenticated';
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.errorMessage = action.payload?.errorMessage;
        },
        checkingCredentials: (state) => {
            state.status = 'checking';
        },
    },
});

export const { login, logout, checkingCredentials, reducer } = authSlice;  