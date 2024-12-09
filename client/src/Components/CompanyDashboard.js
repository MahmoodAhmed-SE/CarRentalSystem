import Axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../Providers/AuthProvider";

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

        console.log(companyCars);
        setCars(companyCars.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCompanyCars();
  }, []);

  return (
    <div>
      <h1>"{auth.company.name}" Company Cars:</h1> 
      <table>
        <thead>
          <th>Car name</th>
          <th>Car price per day (OMR)</th>
          <th>Action</th>
        </thead>
        <tbody>
          {cars.map((car) => {
            const { _id, name, rental_status, company_id, price_per_day } = car;

            return (
              <>
                <td>{name}</td>
                <td>{price_per_day}</td>
                <td>
                  <button onClick={() => removeCar(_id)}>Remove</button>
                </td>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyDashboard;
