import logo from "../../../assets/logo.png";

const Logo = () => {
  return (
    <div className="flex items-center justify-center">
      <img src={logo} alt="logo" />
      <h3 className="hidden md:block -ms-2.5 mt-3 text-2xl font-bold">
        ZepShift
      </h3>
    </div>
  );
};

export default Logo;
