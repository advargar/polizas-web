import { addNewEmptyClient, deleteClientById, savingNewClient, setClients, setSaving, updateClient } from "./clientSlice";
import Swal from "sweetalert2";
import { FetchConsult } from "../../helpers/FetchConsult";
import { TopLoaderService } from "../../services/TopLoaderService";

export const startNewClient = (clientData) => {
  return async (dispatch) => {
    dispatch(savingNewClient());
    await TopLoaderService.start();

    try {
      const resp = await FetchConsult('api/clients/create', clientData, 'POST');
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
      const resp = await FetchConsult('api/clients', {}, 'GET');
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
      const resp = await FetchConsult(`api/clients/${clientData.id}`, clientData, 'PUT');
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
      const resp = await FetchConsult(`api/clients/${id}`, {}, 'DELETE');
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
