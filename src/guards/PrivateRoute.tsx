import { Navigate, Outlet } from "react-router-dom";
import useStorage from "../hooks/useStorage";
import { useEffect } from "react";
import useCurrentUser from "../hooks/user/useCurrentUser";

const PrivateRoute = () => {
  const { isLogged } = useStorage();
  const { fetchCurrentUser } = useCurrentUser();

  useEffect(() => {
    if (isLogged()) {
      fetchCurrentUser();
    }
  }, [fetchCurrentUser, isLogged]);

  if (!isLogged()) {
    return <Navigate to="/login" replace={true} />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRoute;
