import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { useAuth } from "../Providers/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const addCar = async (company_id, name, price_per_day) => {
  try {
    await axios.post("http://localhost:3001/add-car", {
      company_id,
      name,
      price_per_day,
    });

    const goToDashboard = window.confirm(
      "Car added successfully. Do you want to return to company dashboard?"
    );

    if (goToDashboard) {
      return true;
    }
  } catch (err) {
    alert("An error occured while adding the car.");
  }

  return false;
};

const AddingCar = () => {
  const [name, setName] = useState("");
  const [pricePerDay, setPricePerDay] = useState(0);
  const companyId = useAuth().auth.company.id;
  const navigate = useNavigate();

  return (
    <div className="container-fluid">
      <div>
        <Header />
      </div>
      <div className="text-center mt-5">
        <form className="mb-5">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Car name"
            style={{ width: "700px", margin: "auto" }}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <input
            type="number"
            className="form-control mb-2"
            placeholder="Car price per day (OMR)"
            style={{ width: "700px", margin: "auto" }}
            onChange={(e) => setPricePerDay(e.target.value)}
          ></input>
        </form>
        <button
          className="btn btn-primary"
          style={{ width: "300px" }}
          onClick={async () => {
            const returnToDashboard = await addCar(
              companyId,
              name,
              pricePerDay
            );
            if (returnToDashboard) {
              navigate("/");
            }
          }}
        >
          Add Car
        </button>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default AddingCar;
