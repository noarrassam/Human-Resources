import React, { useContext } from "react";
import { Link } from "react-router-dom";
import GlobalContext from "./store/appStore";

export default function Home() {
  let context = useContext(GlobalContext);
  let isAuth: boolean = context.isAuth;
  console.log(context.isAuth);

  function handleOnClick() {
    context.setState({ isAuth: false, loginUserIndex: -1 });
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <ul className="navbar-nav">
        {!isAuth ? (
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Login
            </Link>
          </li>
        ) : (
          <>
            <li className="nav-item active">
              <Link className="nav-link" to="/" onClick={handleOnClick}>
                Logout
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Employee Register
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/info">
                All Employees
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
