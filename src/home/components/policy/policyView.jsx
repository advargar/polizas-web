import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startDeletingPolicy, startLoadingPolicies } from '../../store/policies/policyThunks';
import { setActivePolicy } from '../../store/policies/policySlice';
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export const policyView = () => {
  const dispatch = useDispatch();
  const { policies } = useSelector(state => state.policies);

  useEffect(() => {
    dispatch(startLoadingPolicies());
  }, []);

  const handleEdit = (policy) => {
    dispatch(setActivePolicy(policy));
    // Abrir modal o formulario
  };

  const handleDelete = (policyNumber) => {
    dispatch(startDeletingPolicy(policyNumber));
  };

  return (
    <>
      <Button variant="contained" color="primary" sx={{ mb: 2 }}>
        Nueva Póliza
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Número</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {policies.map((policy) => (
              <TableRow key={policy.policyNumber}>
                <TableCell>{policy.policyNumber}</TableCell>
                <TableCell>{policy.policyType}</TableCell>
                <TableCell>{policy.policyStatus}</TableCell>
                <TableCell>{policy.clientId}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleEdit(policy)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(policy.policyNumber)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
