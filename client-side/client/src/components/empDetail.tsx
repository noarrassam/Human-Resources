import { useState, useContext } from "react";

interface Details {
  age: string;
  phone: number;
  bank: string;
  dop: string;
}

export default function EmployeeDetail() {
  const users: Details = {
    age: "",
    phone: 0,
    bank: "",
    dop: "",
  };

  const [formData, setFormData] = useState<Details>(users);
  const [userDetail, setUserDetails] = useState([formData]);

  function handleOnSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormData((prevState) => {
      return {
        ...prevState,
      };
    });
  }
  //form data
  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <input type="file" name="myFiles" multiple />
      </form>
      <div>
        <table className="table table-bordered table-hover table-striped table-info">
          <thead>
            <tr className="tr">
              <th scope="col">Employee ID</th>
              <th scope="col">Category</th>
              <th scope="col">File (Hyperlink)</th>
            </tr>
          </thead>
          <tbody>
            {formData &&
              userDetail.map((item: any, i: number) => {
                return (
                  <tr key={i}>
                    <td>{item.Lastname}</td>
                    <td>{item.Username}</td>
                    <td>{item.Gender}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}
