import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';

const PrivateRoute = () => {
    
    
  const { isLogged, getUserData } = useAuth()

  useEffect(() => {
    if (isLogged) {
      getUserData()
    }
  }, [getUserData, isLogged])


  if (!isLogged) {
    return <Navigate to="/login" replace={true} />;
  } else {
    return <Outlet/>;
  } 
}


export default PrivateRoute;