import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import GlobalContext from "./store/appStore";

const PrivateRoutes = () => {
  const context = useContext(GlobalContext);
  let auth = context.isAuth;
  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
