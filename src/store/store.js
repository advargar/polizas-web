import { configureStore } from '@reduxjs/toolkit'
import { clientSlice } from './client/clientSlice';
import { policySlice } from './policy/policySlice';

export const store = configureStore ({
    reducer: {
        client: clientSlice.reducer,
        product: policySlice.reducer
    }
})
