import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import UserModel from "./Models/UserModel.js";
import CarModel from "./Models/CarModel.js";
import ReservationModel from "./Models/ReservationModel.js";
import CompanyModel from "./Models/CompanyModel.js";

const app = express();

app.use(express.json());
app.use(cors());

const connectionString =
  "mongodb+srv://admin:MSY123@cluster0.fndgx.mongodb.net/CarRentalSystemDB?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Authentication requests:
app.post("/register-user", async (req, res) => {
  const { username, password, reserved_cars } = req.body;

  const userExists = await UserModel.findOne({ username, password });

  if (userExists) {
    res.status(409).send("User already exists");
    return;
  }

  try {
    const user = new UserModel({ username, password, reserved_cars });

    await user.save();

    res.status(200).send("User registered successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/register-company", async (req, res) => {
  const { name, password } = req.body;

  const companyExists = await CompanyModel.findOne({ name, password });

  if (companyExists) {
    res.status(409).send("Company already exists");
    return;
  }

  try {
    const company = new CompanyModel({
      name,
      password,
      cars: [],
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
      reserved_cars: dbResponse.reserved_cars,
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

app.post("/add-car", async (req, res) => {
  const { company_id, name, price } = req.body;

  try {
    const car = new CarModel({ company_id, name, price });
    const savedCar = await car.save();

    const company = await CompanyModel.findOne({_id: company_id});
    company.cars.push(savedCar._id)
    
    await company.save();

    res.status(200).send("Car added successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3001, () => {
  console.log("Server is up and running!");
});
