import { Outlet } from "react-router-dom";
import SideBar from "./../SideBar";

// h-screen overflow-y-scroll
// pero problema con el margin

const Layout = () => {

    return (
      <div className="flex h-screen bg-gray-100">
        <SideBar/>
        <div className="flex-auto overflow-y-scroll h-screen p-4">
        <div className="flex-auto min-h-full bg-white p-4 rounded-lg border-1 shadow">
            <Outlet/>
        </div>
        </div>
        
      </div>
    );
  };
  
  
  export default Layout;