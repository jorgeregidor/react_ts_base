//import { Link, NavLink } from 'react-router-dom';

import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";


function Other() {
  const { userData } =  useAuth()
  
  return (
    <>
      Other
      <Link to="/dashboard">dashboard</Link>
      {userData?.email}
    </>
  );
}

export default Other;