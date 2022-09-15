import { useContext, useState } from "react";
import axios from "axios";
import GlobalContext, { Data } from "./store/appStore";

export default function AdminDetails() {
  const context = useContext(GlobalContext);

  const [state, setState] = useState<Data>(context.user);
  console.log(state);

  function handleInputChange(e: any) {
    e.preventDefault();
    const name = e.target as any;
    const value = e.target as any;
    setState((prevState) => {
      return {
        ...prevState,
        [name.name]: value.value,
      };
    });
  }

  function handleOnSubmit(e: any) {
    e.preventDefault();
    const config: any = {
      headers: {
        Authorization: "Bearer " + context.token,
      },
    };
    axios
      .post("http://localhost:3001/api/edit", state, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="container border border-dark my-5">
      <div className="row my-5 justify-content-center">
        <div className="col-lg-2">
          <form onSubmit={handleOnSubmit}>
            <label className="form-label">
              Username:
              <input
                type="text"
                name="Username"
                onChange={handleInputChange}
                value={state.Username}
              />
            </label>
            <label className="form-label">
              Email:
              <input
                type="email"
                name="Email"
                value={state.Email}
                onChange={handleInputChange}
              />
            </label>
            <label className="form-label">
              Password:
              <input
                type="password"
                name="Password"
                onChange={handleInputChange}
                value={state.Password}
              />
            </label>
            <label className="form-label">
              Re-Password:
              <input
                type="password"
                name="RePassword"
                onChange={handleInputChange}
                value={state.RePassword}
              />
            </label>
            <button type="submit" className="btn btn-primary">
              Edit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
