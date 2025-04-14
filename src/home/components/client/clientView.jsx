import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients, createClient, updateClient, deleteClient } from '../../../store/client/clientSlice';
import {
  Button, TextField, Dialog, DialogActions, DialogContent,
  DialogTitle, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Box, Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export const ClientView = () => {
  const dispatch = useDispatch();
  const { clients, loading, error } = useSelector((state) => state.client);

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    insureId: '',
    name: '',
    firstSurname: '',
    secondSurname: '',
    personType: '',
    birthdate: ''
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  const handleOpen = (client = null) => {
    if (client) {
      setEditMode(true);
      setEditId(client.insureId);
      setFormData(client);
    } else {
      setEditMode(false);
      setFormData({
        name: '',
        firstSurname: '',
        secondSurname: '',
        insureId: '',
        personType: '',
        birthdate: ''
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (editMode) {
      dispatch(updateClient({ id: editId, data: formData }));
    } else {
      dispatch(createClient(formData));
    }
    handleClose();
  };

  const handleDelete = (id) => {
    dispatch(deleteClient(id));
  };

  return (
    <div style={{ padding: 20 }}>
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Clientes
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
       <AddIcon /> Agregar Cliente
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="client table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido Paterno</TableCell>
              <TableCell>Apellido Materno</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Cumpleaños</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow 
                key={client.insureId}  // Make sure this is unique for each client
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{client.insureId}</TableCell>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.firstSurname}</TableCell>
                <TableCell>{client.secondSurname}</TableCell>
                <TableCell>{client.personType}</TableCell>
                <TableCell>{client.birthdate}</TableCell>
                <TableCell>
                    <Button variant="outlined" onClick={() => handleOpen(client)}><EditIcon /></Button>
                    <Button variant="outlined" color="error" onClick={() => handleDelete(client.id)} sx={{ ml: 1 }}>
                      <DeleteIcon />  
                    </Button>
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  
 <Dialog open={open} onClose={handleClose}>
 <DialogTitle>{editMode ? 'Editar Cliente' : 'Nuevo Cliente'}</DialogTitle>
 <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
   <TextField label="Nombre" name="name" value={formData.name} onChange={handleChange} fullWidth />
   <TextField label="Primer Apellido" name="firstSurname" value={formData.firstSurname} onChange={handleChange} fullWidth />
   <TextField label="Segundo Apellido" name="secondSurname" value={formData.secondSurname} onChange={handleChange} fullWidth />
   <TextField label="Cédula" name="insureId" value={formData.insureId} onChange={handleChange} fullWidth />
   <TextField label="Tipo de Persona" name="personType" value={formData.personType} onChange={handleChange} fullWidth />
   <TextField type="date" label="Fecha Nacimiento" name="birthdate" value={formData.birthdate?.slice(0, 10)} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth />
 </DialogContent>
 <DialogActions>
   <Button onClick={handleClose}>Cancelar</Button>
   <Button onClick={handleSubmit} variant="contained">{editMode ? 'Actualizar' : 'Guardar'}</Button>
 </DialogActions>
</Dialog>
</div>
  );
};


export default ClientView;