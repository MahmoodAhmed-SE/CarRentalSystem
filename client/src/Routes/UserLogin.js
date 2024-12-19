import axios from "axios";
import { useState } from "react";
import { useAuth } from "../Providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

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
    <div className="container-fluid justify-content-center text-center">
      <div className="row">
        <Header />
      </div>
      <div className="row mt-3 text-center" style={{ minHeight: "500px" }}>
        <h1 className="mb-5">User Login</h1>

        <form>
          <input
            key={1}
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className="form-control mb-2"
            style={{ width: "700px", margin: "auto" }}
          ></input>
          <input
            key={2}
            type="password"
            placeholder="Password"
            onChange={(e) => setUserPassword(e.target.value)}
            className="form-control"
            style={{ width: "700px", margin: "auto" }}
          ></input>
        </form>

        <button
          className="btn btn-primary mb-1"
          style={{ width: "150px", margin: "auto" }}
          onClick={async () => {
            let isValid = true;

            if (username.length < 1) {
              isValid = false;

              alert("Username is empty");
            } else if (userPassword.length < 8) {
              isValid = false;

              alert("Password should be equal or more than 8 characters/numbers.");
            }

            if (isValid) {
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
            }
          }}
        >
          Login
        </button>

        <div>
          <Link to={"/register-user"}>Register new user</Link>
        </div>
      </div>
      <div className="row">
        <Footer />
      </div>
    </div>
  );
};

export default UserLogin;
