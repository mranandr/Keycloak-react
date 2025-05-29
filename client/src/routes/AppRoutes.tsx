import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/Transaction_History';
import Contact from '../pages/Contact';
import Success from '../pages/components/Success';
import Login from '../pages/components/login';
import AuthRoutes from '../routes/AuthRoutes';
import DrawerLayout from './Drawwerlayout';

function AppRoutes() {
  return (
    <Routes>
    <Route path="/login" element={<Login />} />
    
    {/* Routes inside DrawerLayout */}
    <Route element={<DrawerLayout />}>
      <Route
        path="/"
        element={<AuthRoutes><Home /></AuthRoutes>}
      />
      <Route
        path="about"
        element={<AuthRoutes><About /></AuthRoutes>}
      />
      <Route
        path="contact"
        element={<AuthRoutes><Contact /></AuthRoutes>}
      />
      <Route
        path="subscription-success"
        element={<AuthRoutes><Success /></AuthRoutes>}
      />
    </Route>
    <Route path="success" element={<Success />} />
  
    <Route path="*" element={<div>Page Not Found</div>} />
  </Routes>
  
  );
}

export default AppRoutes;
