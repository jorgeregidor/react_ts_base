import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface MenuItemProps {
  label: string;
  url: string;
  icon: React.ReactNode;
}

const MenuItem = ({ label, url, icon }: MenuItemProps) => {
  const location = useLocation();
  const active = location.pathname.includes(url);

  return (
    <Link
      to={url}
      className={`pl-2 rounded-lg flex items-center h-12 hover:bg-gray-200 ${active ? "text-gray-950" : "text-gray-500 "}`}
    >
      <div
        className={`flex items-center h-full ${active ? "text-blue-600" : "text-gray-500"}`}
      >
        {icon}
      </div>
      <div className="pl-2">{label}</div>
    </Link>
  );
};

export default MenuItem;
