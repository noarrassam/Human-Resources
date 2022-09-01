import { useState, useContext, useEffect } from "react";
import axios from "axios";
import GlobalContext from "./store/appStore";
const FileDownload = require("js-file-download");

export default function EmployeeDetail(props: any) {
  const [file, setFile] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [data, setData] = useState<any[]>([]);
  const context = useContext(GlobalContext);
  console.log(data);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const empId = props.data;
    const config: any = {
      headers: {
        Authorization: "Bearer " + context.token,
      },
    };

    axios
      .get("http://localhost:3001/upload/download/" + empId, config)
      .then((res) => {
        console.log(res);
        const arrData: any[] = res.data.data;
        setData([...arrData]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const donwloadFile = (item: any) => {
    console.log(item.id);
    if (item.employeeId === props.data) {
      FileDownload(item.data, item.filename);
    }
  };

  const deleteData = (item: any) => {
    const config: any = {
      headers: {
        Authorization: "Bearer " + context.token,
      },
    };

    axios
      .delete("http://localhost:3001/upload/info/" + item.id, config)
      .then((res) => {
        fetchData();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", categoryName);
    formData.append("employeeId", props.data);
    const config: any = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: "Bearer " + context.token,
      },
    };
    const res: any = await axios.post(
      "http://localhost:3001/upload",
      formData,
      config
    );
    console.log("---------------------", res);
    if (res && res.data && res.data.status) {
      setTimeout(() => {
        fetchData();
      }, 500);
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
              <th scope="col">Remove</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any, i: any) => {
              if (props.data === item.employeeId) {
                return (
                  <tr key={i}>
                    <td>{item.employeeId}</td>
                    <td>{item.categoryName}</td>
                    <td>
                      <button onClick={() => donwloadFile(item)}>
                        Download
                      </button>
                    </td>
                    <td>
                      <button onClick={() => deleteData(item)}>Delete</button>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
