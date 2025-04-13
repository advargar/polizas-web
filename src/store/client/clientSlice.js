import { createSlice } from '@reduxjs/toolkit';

export const clientSlice = createSlice({
    name: 'clients',
    initialState: {
        isSaving: false,
        messageSaved: '',
        clients: [],
        active: null,
    },
    reducers: {
        savingNewClient: ( state ) => {
            state.isSaving = true;
        },
        addNewEmptyClient: (state, action ) => {
            state.clients.push( action.payload );
            state.isSaving = false;
        },
        setClients: (state, action ) => {
            state.clients = action.payload;
        },
        setSaving: (state ) => {
            state.isSaving = true;
            state.messageSaved = '';
        },

        updateClient: (state, action ) => { // payload = { id, ...client }
            state.isSaving = false;
            state.clients = state.clients.map( client => {

                if ( client.InsuranceId === action.payload.InsuranceId ) {
                    return action.payload;
                }

                return client;
            });

            state.messageSaved = `${ action.payload.Name }, actualizada correctamente`;
        },

        clearClientsLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.clients = [];
            state.active = null;
        },

        deleteClientById: (state, action ) => {
            state.active = null;
            state.clients = state.clients.filter( client => client.InsuranceId !== action.payload );
        },
    }
});


export const { 
    addNewEmptyClient,
    clearClientsLogout,
    deleteClientById,
    savingNewClient,
    setActiveClient,
    setClients,
    setSaving,
    updateClient
} = clientSlice.actions;