import { useState } from "react";
import { FaBars, FaTachometerAlt, FaFileInvoice } from "react-icons/fa";
import MenuItem from "./MenuItem";
import MyAccount from "./MyAccount";
import Logo from "./../../assets/logo.png";

const SideBar = () => {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={`flex-col z-10 h-screen bg-gray-100 relative duration-300 w-0 ${open ? "md:w-60" : ""}`}
    >
      <div
        className={`absolute duration-300 z-10 top-6 bg-gray-100 border-1 shadow p-3 ${open ? "left-48" : "left-6"}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <FaBars />
      </div>
      <div
        className={`absolute flex flex-col duration-300 h-screen bg-gray-100 p-3 w-60 border-gray-300 border-solid border-r-2 ${open ? "left-0 shadow-lg md:shadow-none md:border-0" : "-left-60"}`}
      >
        <div className="pt-5">
          <img src={Logo} alt="Logo" className="w-40" />
        </div>
        <div className="pt-5"></div>
        <div>
          <MenuItem
            label="Dashboard"
            url="/dashboard"
            icon={<FaTachometerAlt />}
          />
          <MenuItem label="Facturas" url="/invoices" icon={<FaFileInvoice />} />
          <MenuItem label="Otros" url="/other" icon={<FaFileInvoice />} />
        </div>
        <MyAccount />
      </div>
    </div>
  );
};

export default SideBar;
