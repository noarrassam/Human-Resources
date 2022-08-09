import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function EmployeeDetail(props: any) {
  const [file, setFile] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [data, setData] = useState([]);

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", categoryName);
    //formData.append("employeeId", props.data);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    try {
      const res: any = await axios.post(
        "http://localhost:3001/upload",
        formData,
        config
      );
      console.log(res);
      //setData([...data,res.data]);
    } catch (res) {
      console.log(res);
    }
  };

  // const [user, setUser] = useState<any[]>([]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/api/users")
  //     .then((res) => {
  //       setUser(res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const donwloadFile = (event: any) => {
    try {
      const fileName: string = "app.docx";
      window.open("http://localhost:3001/upload/download/" + fileName);
      //axios.get("http://localhost:3001/upload/download/" + fileName);
    } catch (res) {
      console.log(res);
    }
  };

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <div>
          <input
            type="file"
            multiple
            onChange={(e: any) => setFile(e.target.files[0])}
          />
        </div>
        <div>
          File Name:
          <input
            type="text"
            value={categoryName}
            onChange={(e: any) => setCategoryName(e.target.value)}
          />
        </div>
        <div>
          <button>Submit</button>
        </div>
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
            <tr>
              <td>{props.data}</td>
              <td></td>
              <td>
                <button onClick={donwloadFile}>Download</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
