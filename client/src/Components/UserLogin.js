import axios from "axios";
import { useState } from "react";
import { useAuth } from "../Providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const userLogin = async (username, password) => {
  try {
    const response = await axios.post("http://localhost:3001/login-user", {
      username,
      password,
    });

    return response.data;
  } catch (err) {
    return err;
  }
};

const UserLogin = () => {
  const [username, setUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="mt-5">
      <h1 className="mb-5">User Login</h1>

      <form className="mb-5 ">
        <input
          key={1}
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          className="form-control mb-2"
          style={{width: "700px", margin: "auto"}}
        ></input>
        <input
          key={2}
          type="password"
          placeholder="Password"
          onChange={(e) => setUserPassword(e.target.value)}
          className="form-control"
          style={{width: "700px", margin: "auto"}}
          ></input>
      </form>

      <button
        className="btn btn-primary mb-1"
        style={{width: "150px"}}
        onClick={async () => {
          const user = await userLogin(username, userPassword);

          if (user.response) {
            alert(user.response.data);
            return;
          }

          if (user) {
            login("user", user);

            navigate("/");
          } else {
            alert("an error occured");
          }
        }}
      >
        Login
      </button>

      <div>
        <Link to={"/register-user"}>Register new user</Link>
      </div>
    </div>
  );
};

export default UserLogin;
