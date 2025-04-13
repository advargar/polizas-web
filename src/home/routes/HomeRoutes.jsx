import { Router, Navigate, Route } from 'react-router-dom';
import { client,policy, auth  } from '../screens/'

export const HomeRoutes = () => {
  return (
    <Router>
      <Route exact path="/client" element={ client } />
      <Route exact path="/policy" element={ policy } />
      <Route exact path="/auth" element={ auth } />
      <Route path="/*" element={ <Navigate to="/" /> } />
    
    </Router>
  );
};

