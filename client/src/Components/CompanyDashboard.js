import Axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../Providers/AuthProvider";
import { Link } from "react-router-dom";

const removeCar = async (car_id) => {
  try {
    await Axios.delete("http://localhost:3001/remove-car", {
      data: {
        car_id: car_id,
      },
    });

    return true;
  } catch (err) {
    console.log(err);
  }

  return false;
};

const CompanyDashboard = () => {
  const [cars, setCars] = useState([]);
  const [refresher, setRefresher] = useState(false);

  const { auth } = useAuth();
  const { id } = auth.company;

  useEffect(() => {
    const fetchCompanyCars = async () => {
      try {
        const companyCars = await Axios.post(
          "http://localhost:3001/list-company-cars",
          {
            company_id: id,
          }
        );
        
        setCars(companyCars.data);
      } catch (err) {
        alert("An error occured", err);
      }
    };

    fetchCompanyCars();
  }, [refresher]);

  return (
    <div className="mt-4" style={{ minHeight: "400px" }}>
      <div className="row" style={{fontSize: "20px"}}>
        <span>Company name: {auth.company.name}</span>
        <span>Number of cars: {cars.length}</span>
      </div>
        
      <div className="mt-5 text-center ">
        <h2 className="m-5">Company Cars | <Link className="btn btn-outline-primary" to={"/add-car"}>Add new car!</Link></h2>
        {cars.length > 0 ? (
          <table className="table">
            <thead>
              <tr className="table-primary">
                <th className="col">Car status</th>
                <th className="col">Car name</th>
                <th className="col">Car price per day (OMR)</th>
                <th className="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => {
                const { _id, name, rental_status, price_per_day } = car;

                return (
                  <tr
                    key={_id}
                    className={rental_status ? "table-success" : "table-secondary"}
                  >
                    <td className="col">
                      {rental_status ? "Rented" : "Not rented"}
                    </td>
                    <td className="col">{name}</td>
                    <td className="col">{price_per_day}</td>
                    <td className="col">
                      <Link
                        className="btn btn-secondary"
                        disabled={rental_status}
                        style={{ marginRight: "10px" }}
                        to={rental_status ? "" : `/update-car/${_id}`}
                      >
                        Update
                      </Link>
                      <button
                        className="btn btn-danger"
                        disabled={rental_status}
                        onClick={() => {
                          const isRemoved = removeCar(_id);

                          if (isRemoved) {
                            setRefresher(!refresher);
                            alert("Car has been removed.");
                          }
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div>
            <h3>
              No cars added yet. <Link to={"/add-car"}>Add now!</Link>
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDashboard;
