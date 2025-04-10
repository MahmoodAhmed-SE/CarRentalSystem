import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const register = async (username, password) => {
  try {
    await axios.post("http://localhost:3001/register-user", {
      username,
      password,
    });
    return true;
  } catch (err) {
    alert("An error occured while registing");
  }
  return false;
};

const RegisterUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  return (
    <div className="container-fluid justify-content-center text-center">
      <div className="row">
        <Header />
      </div>
      <div className="row text-center mt-3" style={{ minHeight: "500px" }}>
        <h1 className="mb-5">Register new user</h1>
        <form>
          <input
            placeholder="Username"
            type="text"
            className="form-control mb-2"
            style={{ width: "700px", margin: "auto" }}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <input
            placeholder="Password"
            type="password"
            className="form-control"
            style={{ width: "700px", margin: "auto" }}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </form>
        <button
          className="btn btn-primary mb-1"
          style={{ width: "150px", margin: "auto" }}
          onClick={() => {
            let isValid = true;
            
            if (username.length < 1) {
              isValid = false;

              alert("Username is empty");
            } else if (password.length < 8) {
              isValid = false;
              
              alert("Password should be equal or more than 8 characters/numbers.");
            }

            if (isValid) {
              const isRegistered = register(username, password);
  
              if (isRegistered) {
                navigate("/user-login");
              }
            }
          }}
        >
          Register
        </button>
      </div>
      <div className="row">
        <Footer />
      </div>
    </div>
  );
};

export default RegisterUser;
