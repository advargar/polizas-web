import { Route, Routes } from 'react-router-dom';
// import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { HomeLayout } from '../home/layout/HomeLayout';


export const AppRouter = () => {
  return (
    <Routes>

        {/* Login y Registro 
        <Route path="/auth/*" element={ <AuthRoutes /> } />
        */}
        
        {/* JournalApp */}
        <Route path="/*" element={ <HomeLayout /> } />

    </Routes>
  )
}
