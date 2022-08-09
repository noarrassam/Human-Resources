import React, { lazy, useState, Suspense, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import Register from "./register";
import Info from "./info";
import UserDetails from "./empDetail";
import Login from "./login";
import axios from "axios";
import PrivateRoutes from "./privateRoutes";
import GlobalContext from "./store/appStore";

function Details() {
  const params = useParams();

  return (
    <>
      <div>
        <UserDetails data={params.userId} />
      </div>
    </>
  );
}

export default function RoutesInfo() {
  const [user, setUser] = useState<any[]>([]);
  let context = useContext(GlobalContext);
  let isAuth = context.isAuth;
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users")
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log("isAuth -----", isAuth);
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/register" element={<Register />} />
        <Route path="/info" element={<Info />} />
        {isAuth && <Route path="/details/:userId" element={<Details />} />}
      </Route>

      <Route path="/" element={<Login />} />
    </Routes>
  );
}
