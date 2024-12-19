import { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import axios from "axios";
import { useAuth } from "../Providers/AuthProvider";
import { Link } from "react-router-dom";

function normalizeToMidnight(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

const UserRentedCars = () => {
  const { auth } = useAuth();
  const [rentedCars, setRentedCars] = useState([]);

  useEffect(() => {
    const fetchRentedCars = async () => {
      try {
        const res = await axios.post("http://localhost:3001/user-rented-cars", {
          user_id: auth.user.id,
        });

        setRentedCars(res.data);
      } catch (err) {
        alert("An error occured while retrieving rented cars.");
      }
    };
    fetchRentedCars();
  }, [auth.user.id]);

  return (
    <div className="container-fluid">
      <div className="row">
        <Header />
      </div>
      <div className="row mt-5 text-center" style={{ minHeight: "500px" }}>
        <h2>{auth.user.username} rented cars</h2>

        {rentedCars.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Car name </th>
                <th>Cost</th>
                <th>Checkout date</th>
              </tr>
            </thead>
            <tbody>
              {rentedCars.map((car) => {
                const checkoutDate = new Date(car.checkout_date);
                const currentDate = new Date();

                const normalizedCheckoutDate =
                  normalizeToMidnight(checkoutDate);
                const normalizedCurrentDate = normalizeToMidnight(currentDate);

                const checkoutDatePassed =
                  normalizedCheckoutDate <= normalizedCurrentDate;
                return (
                  <tr>
                    <td>{car.car_name}</td>
                    <td>{car.cost}</td>
                    <td
                      style={{
                        backgroundColor: `${checkoutDatePassed ? "red" : ""}`,
                      }}
                    >
                      {car.checkout_date}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <h3>
            No cars rented yet. <Link to={"/"}>Rent a car!</Link>
          </h3>
        )}
      </div>
      <div className="row">
        <Footer />
      </div>
    </div>
  );
};

export default UserRentedCars;
