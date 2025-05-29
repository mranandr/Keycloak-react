import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { useEffect, useState } from 'react';
import UserService from './service/userServce';

function App() {
  // const [authenticated, setAuthenticated] = useState(false);

  // useEffect(() => {
  //   UserService.initKeycloak(() => {
  //     setAuthenticated(UserService.isLoggedIn());
  //   });
  // }, []);

  return (
    <BrowserRouter>
      <AppRoutes />      
    </BrowserRouter>
  );
}

export default App;
