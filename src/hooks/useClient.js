import { addNewEmptyClient, deleteClientById, savingNewClient, setClients, setSaving, updateClient } from "./clientSlice";
import Swal from "sweetalert2";
import { api } from "../../api/API"; 
import { TopLoaderService } from "../../services/TopLoaderService";
import { create } from "@mui/material/styles/createTransitions";


export const getClients = createAsyncThunk(
  '/client/clientes',
  async () => {
    const { data } = await api.get('/client/clientes');
    return data.clients;
  }
);

export const startNewClient = (clientData) => {
  return async (dispatch) => {
    dispatch(savingNewClient());
    await TopLoaderService.start();

    try {
      const resp = await api('/client/crearCliente', clientData, 'POST');
      const body = await resp.json();

      if (body.status) {
        dispatch(addNewEmptyClient(body.client));
        Swal.fire('Cliente creado', 'El cliente fue registrado correctamente', 'success');
      } else {
        throw new Error(body.msg);
      }
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    } finally {
      await TopLoaderService.end();
    }
  };
};

export const startLoadingClients = () => {
  return async (dispatch) => {
    try {
      const resp = await api('/client/clientes', {}, 'GET');
      const body = await resp.json();
      dispatch(setClients(body.clients));
    } catch (error) {
      Swal.fire('Error', 'No se pudo cargar los clientes', 'error');
    }
  };
};

export const startUpdateClient = (clientData) => {
  return async (dispatch) => {
    dispatch(setSaving());
    try {
      const resp = await api(`/client/editarCliente/${clientData.id}`, clientData, 'PUT');
      const body = await resp.json();

      if (body.status) {
        dispatch(updateClient(body.client));
        Swal.fire('Actualizado', 'El cliente fue actualizado', 'success');
      } else {
        throw new Error(body.msg);
      }
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };
};

export const startDeletingClient = (id) => {
  return async (dispatch) => {
    try {
      const resp = await api(`/client/eliminarCliente/${id}`, {}, 'DELETE');
      const body = await resp.json();

      if (body.status) {
        dispatch(deleteClientById(id));
        Swal.fire('Eliminado', 'El cliente fue eliminado', 'success');
      } else {
        throw new Error(body.msg);
      }
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };
};
