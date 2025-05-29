import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../service/userServce';
import { CircularProgress, Box } from '@mui/material';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    UserService.initKeycloak(() => {
      if (UserService.isLoggedIn()) {
        // Redirect to previous page or home after successful login
        navigate('/', { replace: true });
      } else {
        // User is not logged in, trigger login flow
        UserService.doLogin();
      }
    });
  }, [navigate]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <CircularProgress />
    </Box>
  );
};

export default Login;
