import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Providers/AuthProvider";
import PrivateRoute from "./Wrapper/PrivateRoute";
import Login from "./Routes/Login";
import Dashboard from "./Routes/Dashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
