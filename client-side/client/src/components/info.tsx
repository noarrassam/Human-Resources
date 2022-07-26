import React, { useState, useContext, useEffect } from "react";
import GlobalContext from "./store/appStore";
import axios from "axios";

export default function Info() {
  const context = useContext(GlobalContext);
  const [formData, setFormData] = useState("");
  const [user, getUser] = useState([]);
  console.log(formData);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users")
      .then((res) => getUser(res.data.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="table-responsive-md">
        <input
          type="text"
          placeholder="Search by First Name"
          onChange={(e: any) => setFormData(e.target.value)}
        />
        <table className="table table-bordered table-hover table-striped table-info">
          <thead>
            <tr className="tr">
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Username</th>
              <th scope="col">Gender</th>
              <th scope="col">Email</th>
              <th scope="col">Department</th>
              <th scope="col">Designation</th>
              <th scope="col">Salary</th>
            </tr>
          </thead>
          <tbody>
            {user
              .filter((user: any) =>
                user.Firstname.toLowerCase().includes(formData)
              )
              .map((item: any, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <a href="">{item.Firstname}</a>
                    </td>
                    <td>{item.Lastname}</td>
                    <td>{item.Username}</td>
                    <td>{item.Gender}</td>
                    <td>{item.Email}</td>
                    <td>{item.Department}</td>
                    <td>{item.Designation}</td>
                    <td>{item.Salary}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}
