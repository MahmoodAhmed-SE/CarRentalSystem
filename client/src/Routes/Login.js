import { useState } from "react";
import CompanyLogin from "./CompanyLogin";
import UserLogin from "./UserLogin";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const Login = () => {
  const [type, setType] = useState("user");

  return (
    <div className="container-fluid justify-content-center text-center">
      <div className="row">
        <Header />
      </div>
      <div className="row mt-3 text-center" style={{ minHeight: "500px" }}>
        <div className="row">
          {type == "user" ? <UserLogin /> : <CompanyLogin />}
        </div>
      </div>
      <div className="row">
        <Footer />
      </div>
    </div>
  );
};

export default Login;
