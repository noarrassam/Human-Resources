import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "./store/appStore";
import axios from "axios";

interface LoginProps {
  Username: string;
  Password?: string;
}

const Login = () => {
  const [state, setState] = useState<LoginProps>({
    Username: "",
    Password: "",
  });

  const [form, setForm] = useState();

  const context = useContext(GlobalContext);
  const data = context.arrUsers;

  const navigate = useNavigate();
  function handleFormOnChange(e: React.FormEvent<HTMLInputElement>) {
    var name = e.target as HTMLInputElement;
    var value = e.target as HTMLInputElement;
    setState((prevState) => {
      return {
        ...prevState,
        [name.name]: value.value,
      };
    });
  }

  function onValidation(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state.Username === "" || state.Password === "") {
      alert("Empty Username or Password");
    } else {
      axios
        .get("http://localhost:3001/api/users")
        .then((res) => {
          console.log(res.data.data);
          //context.loginUserIndex = -1;
          //context.isAuth = false;
          context.setState({ isAuth: false, loginUserIndex: -1 });
          res.data.data.forEach((item: any, i: number) => {
            if (
              item.Username === state.Username &&
              item.Password === state.Password
            ) {
              //context.isAuth = true;
              //context.loginUserIndex = i;
              context.setState({ isAuth: true, loginUserIndex: i });
              console.log(context.loginUserIndex);
              navigate("./info", { replace: true });
            }
          });

          /*if (context.loginUserIndex === -1) {
            alert("Username or password is incorrect");
          }*/
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <div className="container border border-dark my-5">
      <div className="row my-5 justify-content-center">
        <div className="col-lg-2">
          <form onSubmit={onValidation}>
            <label className="form-label">
              Username:
              <input
                type="text"
                name="Username"
                onChange={handleFormOnChange}
                value={state.Username}
              />
            </label>
            <label className="form-label">
              Password:
              <input
                type="password"
                name="Password"
                onChange={handleFormOnChange}
                value={state.Password}
              />
            </label>
            <button
              type="submit"
              name="login"
              value="Login"
              className="btn btn-primary"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
