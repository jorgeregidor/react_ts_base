import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAuth from "./../../hooks/useAuth";
import { FaUser } from "react-icons/fa";
import useLogout from "./../../hooks/auth/useLogout";

const MyAccount = () => {
  const [myAccountOpen, setMyAccountOpen] = useState(false);
  const { userData } = useAuth();
  const { logout } = useLogout();
  const { t } = useTranslation();
  const active = window.location.pathname.includes("/users");

  const nickname = userData?.email ? userData?.email.split("@")[0] : "ERROR";

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkIfClickedOutside = (e: Event) => {
      if (
        myAccountOpen &&
        ref.current &&
        !ref.current.contains(e.target as Node)
      ) {
        setMyAccountOpen(false);
      }
    };

    document.addEventListener("click", checkIfClickedOutside);

    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [myAccountOpen]);

  return (
    <div className="flex flex-col mt-auto mb-10 relative">
      {myAccountOpen && (
        <div
          className={`flex p-1 flex-col mb-2 rounded-lg h-36 bg-white border border-gray-200 shadow`}
        >
          <Link
            className="flex-auto flex justify-center items-center rounded hover:bg-gray-200"
            to="/users/my_account"
          >
            <div>{t("sidebar.my_account")}</div>
          </Link>
          <hr className="w-3/4 mx-auto my-1 bg-gray-300" />
          <Link
            className="flex-auto flex justify-center items-center rounded hover:bg-gray-200"
            to="#"
          >
            <div>{t("sidebar.settings")}</div>
          </Link>
          <hr className="w-3/4 mx-auto my-1 bg-gray-300" />
          <div
            className="flex-auto flex justify-center items-center rounded hover:bg-gray-200"
            onClick={() => {
              logout();
            }}
          >
            <div>{t("sidebar.logout")}</div>
          </div>
        </div>
      )}
      <div
        className={`flex pl-2 rounded-lg h-12 items-center hover:bg-gray-200 ${myAccountOpen ? "bg-gray-200" : ""}`}
        onClick={() => {
          setMyAccountOpen((prev) => !prev);
        }}
        ref={ref}
      >
        <div
          className={`items-center ${myAccountOpen || active ? "text-blue-600" : "text-gray-500"}`}
        >
          <FaUser />
        </div>
        <div
          className={`pl-2 ${myAccountOpen || active ? "text-gray-950 " : "text-gray-500 "}`}
        >
          <div> {nickname} </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
