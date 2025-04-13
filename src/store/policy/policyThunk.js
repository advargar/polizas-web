import { addPolicy, deletePolicy, setPolicies, setSaving, updatePolicy } from './policySlice';
import Swal from 'sweetalert2';
import { FetchConsult } from '../../helpers/FetchConsult';

export const startLoadingPolicies = () => {
  return async (dispatch) => {
    try {
      const resp = await FetchConsult('api/policy/polizas', {}, 'GET');
      const body = await resp.json();
      dispatch(setPolicies(body.policies));
    } catch (error) {
      Swal.fire('Error', 'Error cargando pólizas', 'error');
    }
  };
};

export const startSavingPolicy = (policyData) => {
  return async (dispatch) => {
    dispatch(setSaving());
    try {
      const resp = await FetchConsult('api/policy/crearPoliza', policyData, 'POST');
      const body = await resp.json();
      dispatch(addPolicy(body.policy));
    } catch (error) {
      Swal.fire('Error', 'No se pudo guardar la póliza', 'error');
    }
  };
};

export const startUpdatingPolicy = (policyData) => {
  return async (dispatch) => {
    dispatch(setSaving());
    try {
      const resp = await FetchConsult(`api/policy/editarPoliza/${policyData.policyNumber}`, policyData, 'PUT');
      const body = await resp.json();
      dispatch(updatePolicy(body.policy));
    } catch (error) {
      Swal.fire('Error', 'No se pudo actualizar la póliza', 'error');
    }
  };
};

export const startDeletingPolicy = (policyNumber) => {
  return async (dispatch) => {
    try {
      const resp = await FetchConsult(`api/policy/eliminarPoliza/${policyNumber}`, {}, 'DELETE');
      const body = await resp.json();
      dispatch(deletePolicy(policyNumber));
    } catch (error) {
      Swal.fire('Error', 'No se pudo eliminar la póliza', 'error');
    }
  };
};
