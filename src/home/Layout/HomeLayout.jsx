import { Toolbar } from '@mui/material';
import { Box } from '@mui/system'
import { NavBar } from '../components';
import { HomeRoutes } from '../routes/HomeRoutes';


const drawerWidth = 280;

export const HomeLayout = () => {
    <Box sx={{ display: 'flex' }} className='animate__animated animate__fadeIn animate__faster'>

    <NavBar drawerWidth={ drawerWidth } />

    <Box 
        component='main'
        sx={{ flexGrow: 1, p: 3 }}
    >
        <Toolbar />

       <HomeRoutes />
        
    </Box>
</Box>
}
