import React, { useState, useContext, useEffect } from "react";
import GlobalContext from "./store/appStore";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Info() {
  const context = useContext(GlobalContext);
  const [user, setUser] = useState<any[]>([]);
  const [filteredUser, setFilteredUser] = useState<any[]>([]);
  const [filterCriteria, setFilterCriteria] = useState<any>({
    CaseSensitive: false,
    ExactMatch: true,
  });

  const filteredColumn: string[] = [
    "Firstname",
    "Lastname",
    "Username",
    "Gender",
    "Email",
    "Salary",
  ];

  useEffect(() => {
    const config: any = {
      headers: {
        Authorization: "Bearer " + context.token,
      },
    };
    axios
      .get("http://localhost:3001/api/users", config)
      .then((res) => {
        setUser(res.data.data);
        setFilteredUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filterChange = (event: any) => {
    let val: string = event.target.value;
    if (!filterCriteria.caseSensitive) {
      val = val.toString().toLowerCase();
    }
    let arrData: any[] = [];
    if (val) {
      arrData = user.filter((user: any) => {
        for (const field of filteredColumn) {
          let value: any = user[field];
          if (!filterCriteria.caseSensitive) {
            value = value.toString().toLowerCase();
          }
          if (filterCriteria.exactMatch) {
            if (value === val) {
              return true;
            }
          } else {
            if (value.includes(val)) {
              return true;
            }
          }
        }
        return false;
      });
    } else {
      arrData = user;
    }
    setFilteredUser(arrData);
  };

  return (
    <>
      <div className="table-responsive-md">
        <input
          type="text"
          placeholder="Search by First Name"
          onChange={filterChange}
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
            {filteredUser.map((item: any, i) => {
              return (
                <tr key={i}>
                  <td>
                    <Link to={"/details/" + `${item.id}`}>
                      {item.Firstname}
                    </Link>
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
