import axios from "axios";
import { useState } from "react";
import { useAuth } from "../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";

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

const Login = () => {
  const [type, setType] = useState("user");

  // User details:
  const [username, setUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [companyPassword, setCompanyPassword] = useState("");

  const { login } = useAuth();

  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => setType("user")}>Login as a user</button>
      <button onClick={() => setType("company")}>Login as a company</button>

      {type == "user" ? (
        <div>
          <h1>User Login</h1>
          <form>
            <input
              key={1}
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            ></input>
            <input
              key={2}
              type="password"
              placeholder="Password"
              onChange={(e) => setUserPassword(e.target.value)}
            ></input>
          </form>
          <button
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
        </div>
      ) : (
        <div>
          <h1>Company Login</h1>
          <form>
            <input
              key={3}
              type="text"
              placeholder="Company name"
              onChange={(e) => setCompanyName(e.target.value)}
            ></input>
            <input
              key={4}
              type="password"
              placeholder="Password"
              onChange={(e) => setCompanyPassword(e.target.value)}
            ></input>
          </form>
          <button
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
        </div>
      )}
    </div>
  );
};

export default Login;
