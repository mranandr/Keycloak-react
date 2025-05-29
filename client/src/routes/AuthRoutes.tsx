import type { ReactNode, ReactElement } from "react";
import UserService from "../service/userServce";

interface AuthRoutesProps {
  children: ReactNode;
}

const AuthRoutes = ({ children }: AuthRoutesProps): ReactElement | null =>
  UserService.isLoggedIn() ? <>{children}</> : null;

export default AuthRoutes;
