import express from "express";
import cors from "cors";
import mongoose, { mongo } from "mongoose";

import UserModel from "./Models/UserModel.js";
import CarModel from "./Models/CarModel.js";
import ReservationModel from "./Models/ReservationModel.js";
import CompanyModel from "./Models/CompanyModel.js";
import { format } from "date-fns";

const app = express();

app.use(express.json());
app.use(cors());

const connectionString =
  "mongodb+srv://admin:MSY123@cluster0.fndgx.mongodb.net/CarRentalSystemDB?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Authentication APIs:
app.post("/register-user", async (req, res) => {
  const { username, password, budget } = req.body;

  const userExists = await UserModel.findOne({ username });

  if (userExists) {
    res.status(409).send("User already exists");
    return;
  }

  try {
    const user = new UserModel({
      username,
      password,
    });

    await user.save();

    res.status(200).send("User registered successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/register-company", async (req, res) => {
  const { name, password } = req.body;

  const companyExists = await CompanyModel.findOne({ name });

  if (companyExists) {
    res.status(409).send("Company already exists");
    return;
  }

  try {
    const company = new CompanyModel({
      name,
      password,
    });

    await company.save();

    res.status(200).send("Company registered successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/login-user", async (req, res) => {
  const { username, password } = req.body;

  try {
    const dbResponse = await UserModel.findOne({ username, password });

    if (!dbResponse) {
      res.status(404).send("User not found or password is incorrect");
      return;
    }

    res.status(200).send({
      id: dbResponse._id,
      username: dbResponse.username,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/login-company", async (req, res) => {
  const { name, password } = req.body;

  try {
    const dbResponse = await CompanyModel.findOne({ name, password });

    if (!dbResponse) {
      res.status(404).send("Company not found or password is incorrect");
      return;
    }

    res.status(200).send({
      id: dbResponse._id,
      name: dbResponse.name,
      cars: dbResponse.cars,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

// Car Handling APIs
app.post("/add-car", async (req, res) => {
  const { company_id, name, price_per_day } = req.body;

  const companyIdCastedToObjectId = new mongoose.Types.ObjectId(company_id);
  const company = await CompanyModel.findOne({
    _id: companyIdCastedToObjectId,
  });

  // if company with provided id not exist in database
  if (!company) {
    res.status(404).send("Company not found");
    return;
  }

  try {
    const car = new CarModel({ company_id, name, price_per_day });
    const savedCar = await car.save();

    res.status(200).send("Car added successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/list-available-cars", async (req, res) => {
  try {
    const cars = await CarModel.find({ rental_status: false }).exec();

    res.status(200).send(cars);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/list-all-cars", async (req, res) => {
  try {
    const cars = await CarModel.find({});

    res.status(200).send(cars);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/list-company-cars", async (req, res) => {
  const { company_id } = req.body;

  try {
    const companyIdCastedToObjectId = new mongoose.Types.ObjectId(company_id);

    const cars = await CarModel.find({
      company_id: companyIdCastedToObjectId,
    }).exec();

    res.status(200).send(cars);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/car-details", async (req, res) => {
  const { car_id } = req.body;

  try {
    const carIdCastedToObjectId = new mongoose.Types.ObjectId(car_id);
    const car = await CarModel.findOne({ _id: carIdCastedToObjectId });

    if (!car) {
      res.status(404).send("Car not found");
      return;
    }

    res.status(200).send(car);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/reserve-car", async (req, res) => {
  const { user_id, car_id, days } = req.body;

  try {
    const userIdCastedToObjectId = new mongoose.Types.ObjectId(user_id);
    const carIdCastedToObjectId = new mongoose.Types.ObjectId(car_id);

    const usr = await UserModel.findOne({ _id: userIdCastedToObjectId });
    const car = await CarModel.findOne({ _id: carIdCastedToObjectId });

    if (!usr || !car) {
      res.status(404).send("User or Car not found");
    }

    const reservationExists = await ReservationModel.findOne({
      user_id: userIdCastedToObjectId,
      car_id: carIdCastedToObjectId,
    });

    if (reservationExists) {
      res.status(409).send("Car is already reserved.");
      return;
    }

    const cost = car.price_per_day * days;

    const currentDate = new Date();
    const checkoutDate = new Date(
      currentDate.getTime() + days * 24 * 60 * 60 * 1000
    );

    const reservation = new ReservationModel({
      user_id: userIdCastedToObjectId,
      car_id: carIdCastedToObjectId,
      car_name: car.name,
      cost,
      checkout_date: checkoutDate,
    });

    car.rental_status = true;

    await usr.save();
    await car.save();
    await reservation.save();

    res.status(200).send("Reservation has been made successfully!");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

// removing using id of car records from both car and reservation table.
app.delete("/remove-car", async (req, res) => {
  const { car_id } = req.body;

  try {
    const carIdCastedToObjectId = new mongoose.Types.ObjectId(car_id);

    await CarModel.deleteOne({ _id: carIdCastedToObjectId });
    
    res.status(200).send("Car has been deleted.");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/update-car", async (req, res) => {
  const { id, car_name, price_per_day } = req.body;

  try {
    const car = await CarModel.findOne({ _id: id });

    car.name = car_name;
    car.price_per_day = price_per_day;

    await car.save();

    res.status(200).send("Car has been updated successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/user-rented-cars", async (req, res) => {
  const { user_id } = req.body;
  try {
    const cars = await ReservationModel.find({ user_id });

    const carsList = cars.map((car) => {
      return {
        car_name: car.car_name,
        cost: car.cost,
        checkout_date: format(
          new Date(String(car.checkout_date)),
          "yyyy/MM/dd"
        ),
      };
    });

    res.send(carsList);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3001, async () => {
  console.log("Server is up and running!");
});
