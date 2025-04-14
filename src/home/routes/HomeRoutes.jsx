import { Routes, Route } from 'react-router-dom';
import HomeLayout from '../Layout/HomeLayout';
import clientView from '../components/client/clientView';

const HomeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout><clientView /></HomeLayout>} />
    </Routes>
  );
};

export default HomeRoutes;

