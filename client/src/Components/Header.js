import { Link } from "react-router-dom";
import { useAuth } from "../Providers/AuthProvider";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="row" style={{ backgroundColor: "#f5f5f5" }}>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Car Rental System
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to={"/"}>
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/about-us"}>
                  About us
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="button">
              {isAuthenticated ? (
                <button
                  className="btn btn-outline-danger"
                  type="submit"
                  onClick={() => logout()}
                >
                  Logout
                </button>
              ) : (
                <div style={{minWidth: "340px"}}>
                  <Link className="btn btn-outline-primary" to={"/user-login"} style={{marginRight: "5px"}}>
                    Login as a user
                  </Link>
                  <Link className="btn btn-outline-primary" to={"/company-login"}>
                    Login as a company
                  </Link>
                </div>
              )}
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
