
import ClientView from '../components/client/clientView';
import PolicyView from '../components/policy/policyView';
import { Container, Typography } from '@mui/material';

const HomeLayout = () => {
  return (
    <Container>
       <Typography variant="h4" component="h1" gutterBottom>
        Gestión de Clientes
      </Typography>
      <ClientView />


    <Typography variant="h4" mt="h4" component="h1" gutterBottom>
        Gestión de Polizas
      </Typography>
      <PolicyView />

    </Container>
  );
};

export default HomeLayout;
