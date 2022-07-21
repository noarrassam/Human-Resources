import { Link } from "react-router-dom";

export default function Home() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Employee Register
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/info">
            All Employees
          </Link>
        </li>
      </ul>
    </nav>
  );
}
