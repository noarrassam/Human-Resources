export default function Info() {
  return (
    <>
      <div className="table-responsive-md">
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
            {/* <tr key={i}>
              <td>{item.fname}</td>
              <td>{item.lname}</td>
              <td>{item.username}</td>
              <td>{item.gender}</td>
              <td>{item.role}</td>
              <td>{item.address}</td>
              <td>{item.email}</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </>
  );
}
