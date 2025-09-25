import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { UserContextProvider } from "./contexts/UserContext";
import Other from "./pages/Other";
import PrivateRoute from "./guards/PrivateRoute";
import SignUp from "./pages/SignUp";
import Layout from "./components/Layout";
import Invoices from "./pages/invoices";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import MyAccount from "./pages/MyAccount";
import LayoutAuth from "./components/LayoutAuth";

function App() {
  return (
    <UserContextProvider>
      <>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<LayoutAuth />}>
            <Route path="/login" element={<Login />} />
            <Route path="/sign_up" element={<SignUp />} />
            <Route path="/forgot_password" element={<ForgotPassword />} />
            <Route path="/reset_password" element={<ResetPassword />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/other" element={<Other />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/users/my_account" element={<MyAccount />} />
            </Route>
          </Route>
        </Routes>
      </>
    </UserContextProvider>
  );
}

export default App;
