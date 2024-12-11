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
    alert("Car removed");
  } catch (err) {
    console.log(err);
  }
};

const CompanyDashboard = () => {
  const [cars, setCars] = useState([]);
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
        console.log(err);
      }
    };

    fetchCompanyCars();
  }, []);

  return (
    <div className="text-center mt-4">
      <h1>Company name: {auth.company.name}</h1>
      <div className="mt-5">
        <h2>Company Cars  |  <Link to={"/add-car"}>Add new car!</Link></h2>
        {cars.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <th>Car name</th>
              <th>Car price per day (OMR)</th>
              <th>Action</th>
            </thead>
            <tbody>
              {cars.map((car) => {
                const { _id, name, rental_status, company_id, price_per_day } =
                  car;

                return (
                  <tr key={_id}>
                    <td>{name}</td>
                    <td>{price_per_day}</td>
                    <td>
                      <Link
                        className="btn btn-secondary"
                        style={{marginRight: "10px"}}
                        to={`/update-car/${_id}`}
                      >
                        Update
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeCar(_id)}
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
