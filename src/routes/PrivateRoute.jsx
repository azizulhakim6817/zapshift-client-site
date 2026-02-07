import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const locatoin = useLocation();
  if (loading) {
    return <span className="loading loading-spinner loading-xs"></span>;
  }
  if (user) {
    return children;
  }

  return <Navigate to="/login" state={locatoin?.pathname}></Navigate>;
};

export default PrivateRoute;
