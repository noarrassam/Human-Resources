import React, { useState, useContext } from "react";
import { Data } from "./store/appStore";
import GlobalContext from "./store/appStore";
import axios from "axios";

export default function Register() {
  const defaultData: Data = {
    Firstname: "",
    Lastname: "",
    Username: "",
    Gender: "",
    Email: "",
    Password: "",
    RePassword: "",
    Department: "",
    Designation: "",
    Salary: "",
  };

  const [formData, setFormData] = useState<Data>(defaultData);
  const context = useContext(GlobalContext);

  function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
    const name = e.target as HTMLInputElement;
    const value = e.target as HTMLInputElement;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name.name]: value.value,
      };
    });
  }

  function handleDataFetch() {
    if (formData.Password !== formData.RePassword) {
      alert("Password does not match");
    } else {
      axios
        .post("http://localhost:3001/api/users", formData)
        .then(() => {
          console.log(formData);
          context.arrUsers.push(formData);
          setFormData(defaultData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleDataFetch();
    // context.arrUsers.push(formData);
    // console.log(formData);
  }

  return (
    <div className="container border border-dark my-5">
      <div className="row my-3">
        <div className="col-lg-2">
          <form onSubmit={handleSubmit}>
            <label>Firstname:</label> <br />
            <input
              type="text"
              required
              name="Firstname"
              size={15}
              value={formData.Firstname}
              onChange={handleOnChange}
            />
            <br />
            <label>Lastname:</label>
            <br />
            <input
              type="text"
              required
              name="Lastname"
              size={15}
              value={formData.Lastname}
              onChange={handleOnChange}
            />
            <br />
            <label>Username:</label>
            <br />
            <input
              type="text"
              required
              name="Username"
              value={formData.Username}
              onChange={handleOnChange}
            />
            <br />
            <label>Gender:</label>
            <br />
            <input
              type="radio"
              name="Gender"
              value="Male"
              onChange={handleOnChange}
            />
            Male <br />
            <input
              type="radio"
              name="Gender"
              value="Female"
              onChange={handleOnChange}
            />
            Female <br />
            Email:
            <br />
            <input
              type="email"
              required
              id="email"
              name="Email"
              value={formData.Email}
              onChange={handleOnChange}
            />
            <br />
            Password:
            <br />
            <input
              type="password"
              required
              id="password"
              name="Password"
              value={formData.Password}
              onChange={handleOnChange}
            />
            <br />
            Re-Password:
            <br />
            <input
              type="password"
              required
              id="repass"
              name="RePassword"
              value={formData.RePassword}
              onChange={handleOnChange}
            />
            <br />
            Department:
            <br />
            <input
              type="text"
              name="Department"
              value={formData.Department}
              onChange={handleOnChange}
            />
            <br />
            Designation:
            <br />
            <input
              type="text"
              name="Designation"
              value={formData.Designation}
              onChange={handleOnChange}
            />
            <br />
            Salary:
            <br />
            <input
              type="number"
              name="Salary"
              value={formData.Salary}
              onChange={handleOnChange}
            />
            <br />
            <br />
            <button name="submit" value="register" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
