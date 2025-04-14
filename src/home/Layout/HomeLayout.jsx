import { Container, Typography } from '@mui/material';

const HomeLayout = ({ children }) => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Gestión de Clientes
      </Typography>
      {children}
    </Container>
  );
};

export default HomeLayout;