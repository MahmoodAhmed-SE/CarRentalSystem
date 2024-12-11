import { useState } from "react";
import CompanyLogin from "../Components/CompanyLogin";
import UserLogin from "../Components/UserLogin";

const Login = () => {
  const [type, setType] = useState("user");

  return (
    <div className="container-fluid justify-content-center text-center">
      <div className="row">
        <div>
          <button onClick={() => setType("user")} className="btn btn-secondary m-3">
            Login as a user
          </button>
          <button
            onClick={() => setType("company")}
            className="btn btn-secondary m-3"
          >
            Login as a company
          </button>
        </div>
      </div>

      <div className="row">
        {type == "user" ? <UserLogin /> : <CompanyLogin />}
      </div>
    </div>
  );
};

export default Login;
