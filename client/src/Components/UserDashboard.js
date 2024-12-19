import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../Providers/AuthProvider";
import { Link } from "react-router-dom";

const rentCar = async (user_id, car_id, days) => {
  const endpoint = "http://localhost:3001/reserve-car";

  try {
    await axios.post(endpoint, {
      user_id,
      car_id,
      days,
    });

    return true;
  } catch (err) {
    alert(err);
  }

  return false;
};

const UserDashboard = () => {
  const [cars, setCars] = useState([]);
  const [availableOnly, setAvailableOnly] = useState(false);
  const { auth } = useAuth();
  const [days, setDays] = useState(1);

  const user_id = auth.user.id;

  const [refresher, setRefresher] = useState(false);

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
  }, [refresher, availableOnly]);

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
        <Link className="btn btn-primary m-1" to={"/user-rented-cars"}>
          Show my rented cars
        </Link>
        <button
          className="btn btn-secondary m-1"
          onClick={() => setAvailableOnly(false)}
        >
          Show all cars
        </button>
        <button
          className="btn btn-secondary m-1"
          onClick={() => setAvailableOnly(true)}
        >
          Show only available cars
        </button>
      </div>
      <h2 className="mb-3">
        {availableOnly ? "Available cars:" : "All cars:"}
      </h2>
      {cars.length > 0 ? (
        <table className="table">
          <thead>
            <tr className="table-primary">
              <th className="col">Car name</th>
              <th className="col">Car price per day (OMR)</th>
              <th className="col">Cost (OMR)</th>
              <th className="col">Car availability</th>
              <th className="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => {
              const { _id, name, rental_status, price_per_day } = car;

              // if it is rented, user can not rent the car
              return rental_status ? (
                <tr key={_id} className="table-warning">
                  <td className="col">{name}</td>
                  <td className="col">{price_per_day}</td>
                  <td className="col">{price_per_day}</td>
                  <td className="col">
                    {rental_status ? "Not available" : "Available"}
                  </td>
                  <td className="col">
                    <button className="btn btn-primary" disabled={true}>
                      Rent
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={_id}>
                  <td className="col">{name}</td>
                  <td className="col">{price_per_day}</td>
                  <td className="col">{price_per_day * days}</td>
                  <td className="col">
                    {rental_status ? (
                      <strong style={{ backgroundColor: "red" }}>
                        Not available
                      </strong>
                    ) : (
                      "Available"
                    )}
                  </td>
                  <td className="col">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        const isRented = rentCar(user_id, _id, days);
                        if (isRented) {
                          setRefresher(!refresher);

                          alert("Car has been rented.")
                        }
                      }}
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
