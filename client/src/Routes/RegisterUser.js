import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="text-center pt-5">
      <h1 className="mb-5">Register new user</h1>
      <form className="mb-5">
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
        style={{ width: "150px" }}
        onClick={() => {
          const isRegistered = register(username, password);
          if (isRegistered) {
            navigate("/login");
          }
        }}
      >
        Register
      </button>
    </div>
  );
};

export default RegisterUser;
