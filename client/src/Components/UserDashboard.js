import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../Providers/AuthProvider";

const rentCar = async (user_id, car_id, days) => {
  const endpoint = "http://localhost:3001/reserve-car";

  try {
    await axios.post(endpoint, {
      user_id,
      car_id,
      days,
    });

    alert("Car has been rented successfully!");
  } catch (err) {
    alert(err);
  }
};

const UserDashboard = () => {
  const [cars, setCars] = useState([]);
  const [availableOnly, setAvailableOnly] = useState(false);
  const { auth } = useAuth();
  const [days, setDays] = useState(1);
  
  const user_id = auth.user.id;

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const endpoint = availableOnly
          ? "http://localhost:3001/list-available-cars"
          : "http://localhost:3001/list-all-cars";
        const response = await axios.get(endpoint);
        setCars(response.data); // Ensure response.data contains the array of cars
      } catch (err) {
        console.error(err);
      }
    };

    fetchCars();
  }, [availableOnly]);

  return (
    <div>
      Enter how many days you want to rent: <input type="number" onChange={(e) => setDays(e.target.value)}></input>
      
      <button onClick={() => setAvailableOnly(false)}>Show all cars.</button>
      <button onClick={() => setAvailableOnly(true)}>
        Show only available cars.
      </button>
      <h2>{availableOnly ? "Available cars:" : "All cars:"}</h2>

      <table>
        <thead>
          <th>Car name</th>
          <th>Car availability</th>
          <th>Car price per day (OMR)</th>
          <th>Days to be rented</th>
          <th>Cost</th>
          <th>Action</th>
        </thead>
        <tbody>
        {cars.map((car) => {
          const { _id, name, rental_status, price_per_day } = car;

          return (
            <>
              <td>{name}</td>
              <td>{rental_status ? "Not available" : "Available"}</td>
              <td>{price_per_day}</td>
              <td>{price_per_day * days}</td>
              <td><button onClick={() => rentCar(user_id, _id, days)} disabled={rental_status}>Rent</button></td>
            </>
          );
        })}
        </tbody>
      </table>
    </div>
  );
};

export default UserDashboard;
