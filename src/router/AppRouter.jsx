import { Navigate, Route, Routes } from 'react-router-dom';
import HomeLayout from '../home/layout/HomeLayout';

export default function AppRouter () {
  return (
    <Routes>
      
    <Route path="/*" element={<HomeLayout />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
      );
    }
  