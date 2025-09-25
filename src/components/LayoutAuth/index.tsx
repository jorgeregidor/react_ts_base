import { Outlet } from "react-router-dom";
import Logo from "./../../assets/logo.png";

const LayoutAuth = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen relative">
      <img src={Logo} alt="Logo" className="w-30 h-30 absolute top-4 left-4" />
      <div className="w-full sm:w-[500px] justify-center">
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutAuth;
