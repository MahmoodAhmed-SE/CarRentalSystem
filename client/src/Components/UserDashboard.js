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
        setCars(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCars();
  }, [availableOnly]);

  return (
    <div className="text-center p-4">
      <form className="mb-5">
        <label>Enter how many days you want to rent</label>
        <input
          min={1}
          className="form-control"
          style={{ width: "100px", margin: "auto" }}
          type="number"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        ></input>
      </form>
      <div className="mb-2">
        <button
          className="btn btn-secondary m-1"
          onClick={() => setAvailableOnly(false)}
        >
          Show all cars.
        </button>
        <button
          className="btn btn-secondary m-1"
          onClick={() => setAvailableOnly(true)}
        >
          Show only available cars.
        </button>
      </div>
      <h2 className="mb-3">
        {availableOnly ? "Available cars:" : "All cars:"}
      </h2>
      {cars.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <th>Car name</th>
            <th>Car availability</th>
            <th>Car price per day (OMR)</th>
            <th>Days to be rented</th>
            <th>Cost (OMR)</th>
            <th>Action</th>
          </thead>
          <tbody>
            {cars.map((car) => {
              const { _id, name, rental_status, price_per_day } = car;

              return (
                <tr key={_id}>
                  <td>{name}</td>
                  <td>{rental_status ? "Not available" : "Available"}</td>
                  <td>{price_per_day}</td>
                  <td>{days}</td>
                  <td>{price_per_day * days}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      disabled={rental_status}
                      onClick={() => rentCar(user_id, _id, days)}
                    >
                      Rent
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <h2>No available cars yet.</h2>
      )}
    </div>
  );
};

export default UserDashboard;
