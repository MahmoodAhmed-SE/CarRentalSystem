import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Providers/AuthProvider";

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
    <div className="mt-5">
      <h1 className="mb-5">Company Login</h1>
      <form className="mb-5">
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
        style={{ width: "150px" }}
        onClick={async () => {
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
        }}
      >
        Login
      </button>

      <div>
        <Link to={"/register-company"}>Register new company</Link>
      </div>
    </div>
  );
};

export default CompanyLogin;
