import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Providers/AuthProvider";
import PrivateRoute from "./Wrapper/PrivateRoute";
import Dashboard from "./Routes/Dashboard";
import RegisterCompany from "./Routes/RegisterCompany";
import RegisterUser from "./Routes/RegisterUser";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import AddingCar from "./Components/AddingCar";
import UpdateCar from "./Components/UpdateCar";
import UserRentedCars from "./Routes/UserRentedCars";
import AboutUs from "./Routes/AboutUs";
import CompanyLogin from "./Routes/CompanyLogin";
import UserLogin from "./Routes/UserLogin";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/company-login" element={<CompanyLogin />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/register-company" element={<RegisterCompany />} />
          <Route path="/register-user" element={<RegisterUser />} />
          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-car"
            element={
              <PrivateRoute>
                <AddingCar />
              </PrivateRoute>
            }
          />
          <Route
            path="/update-car/:id"
            element={
              <PrivateRoute>
                <UpdateCar />
              </PrivateRoute>
            }
          />
          <Route
            path="/user-rented-cars"
            element={
              <PrivateRoute>
                <UserRentedCars />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
