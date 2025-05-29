import { useEffect } from "react";
import UserService from "../../service/userServce";
const Login = () => {
  useEffect(() => {
    UserService.doLogin(); 
  }, []);

  return null; 
};
export default Login;
