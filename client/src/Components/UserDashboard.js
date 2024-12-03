import axios from "axios";
import { useEffect, useState } from "react";

const UserDashboard = () => {
  const [cars, setCars] = useState([]);
  const [availableOnly, setAvailableOnly] = useState(false);

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
      <button onClick={() => setAvailableOnly(false)}>Show all cars.</button>
      <button onClick={() => setAvailableOnly(true)}>Show only available cars.</button>
      <h2>{availableOnly ? "Available cars:" : "All cars:"}</h2>
      <ul>
        {cars.map((car) => (
          <li key={car._id}>{car.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;
