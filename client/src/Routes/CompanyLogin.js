import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Providers/AuthProvider";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const companyLogin = async (name, password) => {
  try {
    const response = await axios.post("http://localhost:3001/login-company", {
      name,
      password,
    });

    return response.data;
  } catch (err) {
    return err;
  }
};

const CompanyLogin = () => {
  const [companyName, setCompanyName] = useState("");
  const [companyPassword, setCompanyPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  return (
    <div className="container-fluid justify-content-center text-center">
      <div className="row">
        <Header />
      </div>
      <div className="row mt-3 text-center" style={{ minHeight: "500px" }}>
        <h1 className="mb-5">Company Login</h1>
        <form>
          <input
            key={3}
            type="text"
            placeholder="Company name"
            className="form-control mb-2"
            style={{ width: "700px", margin: "auto" }}
            onChange={(e) => setCompanyName(e.target.value)}
          ></input>
          <input
            key={4}
            type="password"
            placeholder="Password"
            className="form-control"
            style={{ width: "700px", margin: "auto" }}
            onChange={(e) => setCompanyPassword(e.target.value)}
          ></input>
        </form>
        <button
          className="btn btn-primary mb-1"
          style={{ width: "150px", margin: "auto" }}
          onClick={async () => {
            let isValid = true;

            if (companyName.length < 1) {
              isValid = false;

              alert("Username is empty");
            } else if (companyPassword.length < 8) {
              isValid = false;

              alert("Password should be equal or more than 8 characters/numbers.");
            }

            if (isValid) {
              const company = await companyLogin(companyName, companyPassword);

              if (company.response) {
                alert(company.response.data);
                return;
              }

              if (company) {
                login("company", company);
                navigate("/");
              } else {
                alert("An Error Occured.");
              }
            }
          }}
        >
          Login
        </button>

        <div>
          <Link to={"/register-company"}>Register new company</Link>
        </div>
      </div>
      <div className="row">
        <Footer />
      </div>
    </div>
  );
};

export default CompanyLogin;
