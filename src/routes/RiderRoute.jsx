import Forbidden from "../components/Forbidden";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const RiderRoute = ({ children }) => {
  const {  loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <span className="loading loading-spinner loading-xs"></span>;
  }

  if (role !== "rider") {
    return <Forbidden></Forbidden>;
  }

  return children;
};

export default RiderRoute;
