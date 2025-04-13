import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startDeletingClient, startLoadingClients } from '../../store/clients/clientThunks';
import { setActiveClient } from '../../store/clients/clientSlice';
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export const clientView = () => {
  const dispatch = useDispatch();
  const { clients } = useSelector(state => state.clients);

  useEffect(() => {
    dispatch(startLoadingClients());
  }, []);

  const handleEdit = (client) => {
    dispatch(setActiveClient(client));
    // Abrir modal o navegar a formulario de edición
  };

  const handleDelete = (id) => {
    dispatch(startDeletingClient(id));
  };

  return (
    <>
      <Button variant="contained" color="primary" sx={{ mb: 2 }}>
        Agregar nuevo cliente
      </Button>
      <TableContainer component={Paper}>
        <Table aria-label="Clientes">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Cumpleanos</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.InsureId}>
                <TableCell>{client.Name}</TableCell>
                <TableCell>{client.FirstSurname}</TableCell>
                <TableCell>{client.SecondSurname}</TableCell>
                <TableCell>{client.PersonType}</TableCell>
                <TableCell>{client.Birthdate}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleEdit(client)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(client.InsureId)}>
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
