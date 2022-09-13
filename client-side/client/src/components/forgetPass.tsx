import React, { useState } from "react";
import axios from "axios";

interface Data {
  email: string;
}

export default function ForgetPassword() {
  const data: Data = {
    email: "",
  };

  const [state, setState] = useState<Data>(data);

  function handleOnChange(e: any) {
    setState((prevState) => {
      const name = e.target as any;
      const val = e.target as any;
      return {
        ...prevState,
        [name.name]: val.value,
      };
    });
  }

  function handleOnSubmit(e: any) {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/resetPass", { Email: state.email })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="container border border-dark my-5">
        <div className="row my-5 justify-content-center">
          <div className="col-lg-2">
            <form onSubmit={handleOnSubmit}>
              <label>Enter Your Email:</label>
              <br /> <br />
              <input
                type="text"
                name="email"
                value={state.email}
                placeholder="Enter Your Email"
                onChange={handleOnChange}
              />
              <br /> <br />
              <input type="submit" value="Submit" className="btn btn-primary" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
