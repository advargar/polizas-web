import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPolicy, deletePolicy, fetchPolicies, updatePolicy } from '../../../store/policy/policySlice';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import TableCell, { tableCellClasses } from '@mui/material/TableCell'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const PolicyView = () => {
  const dispatch = useDispatch();
  const { policies, loading, error } = useSelector((state) => state.policy);

  useEffect(() => {
    dispatch(fetchPolicies());
  }, [dispatch]);

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    policyNumber: '',
    policyType: '',
    coverageAmount: '',
    expirationDate: '',
    issueDate: '',
    coverage: '',
    policyStatus: '',
    premium: '',
    inclusionDate: '',
    insuranceCompany: '',
    clientId: ''
  });
  const [editId, setEditId] = useState(null);

  const handleOpen = (policy = null) => {
    if (policy) {
      setEditMode(true);
      setEditId(policy.policyNumber);
      setFormData(policy);
    } else {
      setEditMode(false);
      setFormData({
        policyNumber: '',
        policyType: '',
        coverageAmount: '',
        expirationDate: '',
        issueDate: '',
        coverage: '',
        policyStatus: '',
        premium: '',
        inclusionDate: '',
        insuranceCompany: '',
        clientId: ''
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
      dispatch(updatePolicy({ id: editId, data: formData }));
    } else {
      dispatch(createPolicy(formData));
    }
    handleClose();
  };

  const handleDelete = (id) => {
    dispatch(deletePolicy(id));
  };

  return (
    <div style={{ padding: 20 }}>
      <TableContainer component={Paper}>
        <Typography variant="h4" gutterBottom>
          Polizas
        </Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          <AddIcon /> Agregar Poliza
        </Button>
        <TextField
          label="Buscar por número de póliza"
          variant="outlined"
          size="small"
         onChange={(e) => dispatch(searchPolicies({ policyNumber: e.target.value }))}/>
         
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Numero Poliza</StyledTableCell>
              <StyledTableCell align="right">Tipo</StyledTableCell>
              <StyledTableCell align="right">Fecha Vencimiento</StyledTableCell>
              <StyledTableCell align="right">Monto asegurado</StyledTableCell>
              <StyledTableCell align="right">Coberturas</StyledTableCell>
              <StyledTableCell align="right">Prima</StyledTableCell>
              <StyledTableCell align="right">Aseguradora</StyledTableCell>
              <StyledTableCell align="right">ID Asegurado</StyledTableCell>
              <StyledTableCell align="right">Estado</StyledTableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {policies.map((policy) => (
              <StyledTableRow key={policy.policyNumber}>
                <StyledTableCell component="th" scope="row">
                  {policy.policyNumber}
                </StyledTableCell>
                <StyledTableCell align="right">{policy.policyType}</StyledTableCell>
                <StyledTableCell align="right">{policy.expirationDate}</StyledTableCell>
                <StyledTableCell align="right">{policy.coverageAmount}</StyledTableCell>
                <StyledTableCell align="right">{policy.coverage}</StyledTableCell>
                <StyledTableCell align="right">{policy.premium}</StyledTableCell>
                <StyledTableCell align="right">{policy.insuranceCompany}</StyledTableCell>
                <StyledTableCell align="right">{policy.clientId}</StyledTableCell>
                <StyledTableCell align="right">{policy.policyStatus}</StyledTableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleOpen(policy)}><EditIcon /></Button>
                  <Button variant="outlined" color="error" onClick={() => handleDelete(policy.policyNumber)} sx={{ ml: 1 }}>
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? 'Editar Poliza' : 'Nueva Poliza'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Número de Póliza"
            name="policyNumber"
            value={formData.policyNumber}
            onChange={handleChange}
            fullWidth
            disabled={editMode}
          />
          <TextField
            select
            label="Tipo de Póliza"
            name="policyType"
            value={formData.policyType}
            onChange={handleChange}
            fullWidth
          >
            {['Alto', 'Medio', 'Bajo'].map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </TextField>
          <TextField
            type="number"
            label="Monto Asegurado"
            name="coverageAmount"
            value={formData.coverageAmount}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            type="date"
            label="Fecha de Emisión"
            name="issueDate"
            value={formData.issueDate?.slice(0, 10)}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            type="date"
            label="Fecha de Vencimiento"
            name="expirationDate"
            value={formData.expirationDate?.slice(0, 10)}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            select
            label="Cobertura"
            name="coverage"
            value={formData.coverage}
            onChange={handleChange}
            fullWidth
          >
            {['Full', 'Regular', 'Basic'].map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </TextField>
          <TextField
            type="number"
            label="Prima"
            name="premium"
            value={formData.premium}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            type="date"
            label="Fecha de Inclusión"
            name="inclusionDate"
            value={formData.inclusionDate?.slice(0, 10)}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="Aseguradora"
            name="insuranceCompany"
            value={formData.insuranceCompany}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="ID del Cliente"
            name="clientId"
            value={formData.clientId}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            select
            label="Estado de la Póliza"
            name="policyStatus"
            value={formData.policyStatus}
            onChange={handleChange}
            fullWidth
          >
            {['Activo', 'Inactivo', 'Proceso'].map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">{editMode ? 'Actualizar' : 'Guardar'}</Button>
        </DialogActions>
      </Dialog>

    </div>

  );
};

export default PolicyView;
