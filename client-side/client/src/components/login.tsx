import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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

  const context = useContext(GlobalContext);

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
    context.loginUserIndex = -1;
    if (state.Username === "" || state.Password === "") {
      alert("Empty Username or Password");
    } else {
      axios
        .post("http://localhost:3001/api/auth", state)
        .then((res: any) => {
          console.log(res.data.user);

          if (res.data) {
            localStorage.setItem("token", res.data.token);
            context.setState({
              isAuth: true,
              user: res.data.user,
              token: res.data.token,
            });

            console.log(context.loginUserIndex);
            navigate("./info", { replace: true });
          } else {
            console.error("Failed Login ", res);
          }
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
          </form>{" "}
          <Link to={"/forgetPass"}>Forget Password</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
