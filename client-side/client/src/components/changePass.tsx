import React, { useState } from "react";
import Userfront from "@userfront/core";
import Data from "./store/appStore";
import axios from "axios";

Userfront.init("demo1234");

interface Pass {
  password: string;
  passwordVerify: string;
}

export default function ChangePass() {
  const passVer: Pass = {
    password: "",
    passwordVerify: "",
  };

  const [state, setState] = useState<Pass>(passVer);

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

  function handleGet() {
    axios
      .get("http://localhost:3001/api/users")
      .then((res) => {
        res.data.forEach((item: any, i: any) => {
          console.log(item);
          if (item.Person === "Admin") {
            if (state.password !== state.passwordVerify) {
              return;
            }
            Userfront.sendResetLink("noor.s.rassam@gmail.com");
            // axios
            //   .post("http://localhost:3001/api/users", passVer)
            //   .then((res) => res)
            //   .catch((err) => {
            //     console.log(err);
            //   });
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //handleGet();

  function handleOnSubmit(e: any) {
    e.preventDefault();
    if (state.password !== state.passwordVerify) {
      return;
    }
    Userfront.sendResetLink("noar.s.rassam@gmail.com");
    handleGet();
    Userfront.resetPassword({
      password: state.password,
    });
  }

  return (
    <>
      <div className="container border border-dark my-5">
        <div className="row my-5 justify-content-center">
          <div className="col-lg-2">
            <form onSubmit={handleOnSubmit}>
              <label>
                Password
                <input
                  name="password"
                  type="password"
                  value={state.password}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Re-type password
                <input
                  name="passwordVerify"
                  type="password"
                  value={state.passwordVerify}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <br />
              <button type="submit" className="btn btn-primary">
                Reset password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
