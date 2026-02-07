import { Link, Outlet } from "react-router";
import { MdHome, MdOutlinePayment } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { GoSidebarExpand } from "react-icons/go";
import { CiDeliveryTruck } from "react-icons/ci";
import { MdDirectionsBike } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import useRole from "../hooks/useRole";
import { RiEBikeFill } from "react-icons/ri";
import { MdOutlineAssignment } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import logImg from "../../assets/logo.png";

const DashboardLayout = () => {
  const { role } = useRole();

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-base-300">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
              <GoSidebarExpand size={20} />
            </label>
            <div className="px-4 font-bold text-xl md:text-2xl text-secondary">
              Zap Shift Dashboard
            </div>
          </nav>
          {/* Page content here ----------------------------------------*/}
          {/* Outlate dashboard--*/}
          <Outlet></Outlet>
          {/* <div className="p-4">Page Content</div> */}
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
            {/* Sidebar content here */}
            <ul className="menu w-full grow">
              {/* home_page --> List item */}
              <li>
                <Link
                  to="/"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Homepage"
                >
                  {/* Home icon */}
                  <img className="w-8 h-8" src={logImg} alt="" />
                  <span className="is-drawer-close:hidden">Home page</span>
                </Link>
              </li>
              {/* dashboard --> List item */}
              <li>
                <Link
                  to="/dashboard"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Dashboard"
                >
                  {/* Home icon */}
                  <MdHome size={22} />
                  <span className="is-drawer-close:hidden">Dashboard</span>
                </Link>
              </li>
              {/* out dashboard manu links------------------- */}
              {/* home_page --> List item */}
              <li>
                <Link
                  to="/dashboard/my-parcels"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="My-parcels"
                >
                  {/* Home icon */}
                  <CiDeliveryTruck size={22} />
                  <span className="is-drawer-close:hidden">My Parcels</span>
                </Link>
              </li>
              {/* payment-history-----------> */}
              <li>
                <Link
                  to="/dashboard/payment-history"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Payment History"
                >
                  {/* payment-history icon */}
                  <MdOutlinePayment size={18} />
                  <span className="is-drawer-close:hidden">
                    Payment History
                  </span>
                </Link>
              </li>
              {/* role => "rider"-----------> */}
              {role === "rider" && (
                <>
                  <li>
                    <Link
                      to="/dashboard/assigned-deliveries"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Assigned Deliveries"
                    >
                      {/* payment-history icon */}
                      <MdOutlineAssignment size={22} />
                      <span className="is-drawer-close:hidden">
                        Assigned Deliveries
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/complated-deliveries"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Complated Deliveries"
                    >
                      {/* payment-history icon */}
                      <FaCheckCircle size={22} />
                      <span className="is-drawer-close:hidden">
                        Complated Deliveries
                      </span>
                    </Link>
                  </li>
                </>
              )}
              {/* role => "admin" approval-rider-----------> */}
              {role === "admin" && (
                <>
                  {/* Assign Riders-------------------*/}
                  <li>
                    <Link
                      to="/dashboard/assign-riders"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Assign Riders"
                    >
                      {/* payment-history icon */}
                      <RiEBikeFill size={22} />
                      <span className="is-drawer-close:hidden">
                        Appproval Riders
                      </span>
                    </Link>
                  </li>
                  {/* Appproval Riders-----------> */}
                  <li>
                    <Link
                      to="/dashboard/approval-riders"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Approval Riders"
                    >
                      {/* payment-history icon */}
                      <MdDirectionsBike size={22} />
                      <span className="is-drawer-close:hidden">
                        Appproval Riders
                      </span>
                    </Link>
                  </li>
                  {/* users-management-----------> */}
                  <li>
                    <Link
                      to="/dashboard/users-management"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Users Management"
                    >
                      {/* payment-history icon */}
                      <FaUsers size={22} />
                      <span className="is-drawer-close:hidden">
                        Users Management
                      </span>
                    </Link>
                  </li>
                </>
              )}
              {/* sitting----------------> List item */}
              <li>
                <Link
                  to="/dashboard/settings"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Settings"
                >
                  {/* Settings icon */}
                  <IoSettingsOutline size={20} />
                  <span className="is-drawer-close:hidden">Settings</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
