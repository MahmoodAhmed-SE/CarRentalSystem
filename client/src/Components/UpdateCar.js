import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const updateCar = async (car_id, name, price_per_day) => {
  try {
    await axios.put("http://localhost:3001/update-car", {
      id: car_id,
      car_name: name,
      price_per_day,
    });

    const goToDashboard = window.confirm(
      "Car updated successfully. Do you want to return to company dashboard?"
    );

    if (goToDashboard) {
      return true;
    }
  } catch (err) {
    alert("An error occured while updating the car.");
  }

  return false;
};

const UpdateCar = () => {
  const [name, setName] = useState("");
  const [pricePerDay, setPricePerDay] = useState(0);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:3001/car-details", {
          car_id: id,
        });

        const carName = response.data.name;
        const price_per_day = response.data.price_per_day;
        setName(carName);
        setPricePerDay(price_per_day);
      } catch (err) {
        alert("An error occured while fetching data.");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container-fluid">
      <div>
        <Header />
      </div>
      <div className="text-center mt-5" style={{minHeight: "500px"}}>
        <form className="mb-5">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Car name"
            style={{ width: "700px", margin: "auto" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <input
            type="number"
            className="form-control mb-2"
            placeholder="Car price per day (OMR)"
            style={{ width: "700px", margin: "auto" }}
            value={pricePerDay}
            onChange={(e) => setPricePerDay(e.target.value)}
          ></input>
        </form>
        <button
          className="btn btn-primary"
          style={{ width: "300px" }}
          onClick={async () => {
            const returnToDashboard = await updateCar(
              id,
              name,
              pricePerDay
            );
            if (returnToDashboard) {
              navigate("/");
            }
          }}
        >
          Update Car
        </button>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default UpdateCar;
