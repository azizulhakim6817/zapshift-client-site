import { Outlet } from "react-router";
import Logo from "../components/Logo/Logo";
import authImage from "../../assets/authImage.png";

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* logo------------------------------------------*/}
      <div className="flex justify-start py-2">
        <Logo />
      </div>
      {/* outlet--> auth-image ---------------------------*/}
      <div className="grid gap-4 md:gap-1 my-6 grid-cols-1 md:grid-cols-2 justify-center items-center">
        <div className="flex-1">
          <Outlet />
        </div>
        {/* auth-img */}
        <div className="flex-1 hidden md:block">
          <img src={authImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
