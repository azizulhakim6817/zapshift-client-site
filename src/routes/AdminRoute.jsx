import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Forbidden from "../components/Forbidden";

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <span className="loading loading-spinner loading-xs"></span>;
  }

  if (role !== "admin") {
    return <Forbidden></Forbidden>;
  }

  return children;
};

export default AdminRoute;
