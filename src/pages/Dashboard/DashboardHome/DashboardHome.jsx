import useRole from "../../../hooks/useRole";
import LoadingPay from "./../Payments/LoadingPay";
import AdminDashboardHome from "./AdminDashboardHome";
import RiderDashboardHome from "./RiderDashboardHome";
import UserDashboardHome from "./UserDashboardHome";

const DashboardHome = () => {
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return <LoadingPay></LoadingPay>;
  }

  if (role === "admin") {
    return <AdminDashboardHome></AdminDashboardHome>;
  } else if (role === "rider") {
    return <RiderDashboardHome></RiderDashboardHome>;
  } else {
    return <UserDashboardHome></UserDashboardHome>;
  }
};

export default DashboardHome;
