import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {
  const [user, setUser] = useState(null);
  const [company, setCompany] = useState(null);

  const navigate = useNavigate();

  // if user or company not signed in
  if (!user && !company) {
    console.log("navigated to login");
    navigate("/login");
  }

  return (
    <div>
      <div className="row">
        <Header />
      </div>
      <div className="row">
        <Routes>
          <Route path="/login" element={<div></div>} />
          <Route path="/user" element={<div></div>} />
          <Route path="/company" element={<div></div>} />
        </Routes>
      </div>
      <div className="row">
        <Footer />
      </div>
    </div>
  );
}

export default Home;
