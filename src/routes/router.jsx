import RootLayout from "../layouts/RootLayout";
import { createBrowserRouter } from "react-router";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import AboutUs from "../pages/AboutUs/AboutUs";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";

import PrivateRoute from "./PrivateRoute";
import SendParcel from "../pages/SendParcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcel from "./../pages/Dashboard/MyParcel/MyParcel";
import Payment from "../pages/Dashboard/Payments/Payment";
import PaymentSuccess from "../pages/Dashboard/Payments/PaymentSuccess";
import PaymentCancel from "../pages/Dashboard/Payments/PaymentCancel ";
import PaymentHistory from "../pages/Dashboard/Payments/paymentHistory";
import Rider from "../pages/Rider/Rider";
import ApproveRider from "../pages/Dashboard/ApproveRider/ApproveRider";
import UsersManagement from "../pages/Dashboard/UsersManagement/UsersManagement";
import AdminRoute from "./AdminRoute";
import AssignRiders from "../pages/Dashboard/AssignRiders/AssignRiders";
import AssignedDeliveries from "../pages/Dashboard/AssignedDeliveries/AssignedDeliveries";
import RiderRoute from "./RiderRoute";
import Settings from "../pages/Dashboard/Settings/Settings";
import ComplatedDeliveries from "../pages/Dashboard/ComplatedDeliveries/ComplatedDeliveries";
import ParcelTracking from "../pages/ParcelTracking/ParcelTracking";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import ErrorPage from './../pages/ErrorPage/ErrorPage';

const router = createBrowserRouter([
  /* rootLayout----------------- */
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage />,
    //hydrateFallbackElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "rider",
        loader: () => fetch(`/data/warehouses.json`).then((res) => res.json()),
        element: (
          <PrivateRoute>
            <Rider></Rider>
          </PrivateRoute>
        ),
      },
      {
        path: "send-parcel",
        loader: () => fetch(`/data/warehouses.json`).then((res) => res.json()),
        element: (
          <PrivateRoute>
            <SendParcel />
          </PrivateRoute>
        ),
      },
      {
        path: "coverage",
        loader: () => fetch(`/data/warehouses.json`).then((res) => res.json()),
        Component: Coverage,
      },
      {
        path: "parcel-tracking/:trackingId",
        Component: ParcelTracking,
      },

      {
        path: "about-us",
        Component: AboutUs,
      },
    ],
  },
  /* Auth layout---------- */
  {
    path: "/",
    Component: AuthLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  /* Dashboard layout ------------------------------- */
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "my-parcels",
        Component: MyParcel,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancel",
        Component: PaymentCancel,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
      {
        path: "settings",
        Component: Settings,
      },
      //! rider only routes---------------------------------
      {
        path: "assigned-deliveries",
        // Component: AssignedDeliveries,
        element: (
          <RiderRoute>
            <AssignedDeliveries />
          </RiderRoute>
        ),
      },
      {
        path: "complated-deliveries",
        element: (
          <RiderRoute>
            <ComplatedDeliveries />
          </RiderRoute>
        ),
      },
      //! admin only routes--------------------------------
      {
        path: "assign-riders",
        /*  Component: ApproveRider, */
        element: (
          <AdminRoute>
            <AssignRiders />
          </AdminRoute>
        ),
      },
      {
        path: "approval-riders",
        /*  Component: ApproveRider, */
        element: (
          <AdminRoute>
            <ApproveRider />
          </AdminRoute>
        ),
      },
      {
        path: "users-management",
        /* Component: UsersManagement, */
        element: (
          <AdminRoute>
            <UsersManagement />
          </AdminRoute>
        ),
      },
    ],
  },
]);
export default router;
