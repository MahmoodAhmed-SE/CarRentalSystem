import express from "express";
import cors from "cors";
import mongoose, { mongo } from "mongoose";

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

// Authentication APIs:
app.post("/register-user", async (req, res) => {
  const { username, password, budget } = req.body;

  const userExists = await UserModel.findOne({ username });

  if (userExists) {
    res.status(409).send("User already exists");
    return;
  }

  try {
    const user = new UserModel({ username, password, budget, reserved_cars: [] });

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

    const company = await CompanyModel.findOne({ _id: company_id });
    company.cars.push(savedCar._id);

    await company.save();

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
  const {company_id} = req.body;
  
  try {
    const companyIdCastedToObjectId = new mongoose.Types.ObjectId(company_id);
    
    const cars = await CarModel.find({ company_id: companyIdCastedToObjectId }).exec();

    res.status(200).send(cars);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/list-user-cars", async (req, res) => {
  const {user_id} = req.body;

  try {
    const userIdCastedToObjectId = new mongoose.Types.ObjectId(user_id);
    
    const cars = await CarModel.find({ user_id: userIdCastedToObjectId }).exec();

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
    
    const usr = await UserModel.findOne({_id: userIdCastedToObjectId});
    const car = await CarModel.findOne({ _id: carIdCastedToObjectId });

    if (!usr || !car) {
      res.status(404).send("User or Car not found");
    }

    const reservationExists = await ReservationModel.findOne({user_id: userIdCastedToObjectId, car_id: carIdCastedToObjectId});
    
    if (reservationExists) {
      res.status(409).send("Car is already reserved.");
      return;
    }

    const cost = car.price_per_day * days;
    
    if (usr.budget < cost) {
      res.status(400).send("Insufficient budget to complete the transaction.");
      return;
    }

    usr.budget = usr.budget - cost;

    const currentDate = new Date();
    const checkoutDate = new Date(currentDate.getTime() + days * 24 * 60 * 60 * 1000);


    const reservation = new ReservationModel({
      user_id: userIdCastedToObjectId,
      car_id: carIdCastedToObjectId,
      checkout_date: checkoutDate,
    });

    usr.reserved_cars.push(carIdCastedToObjectId);
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


app.delete("/remove-car", async (req, res) => {
  const { car_id } = req.body;

  try {
    const carIdCastedToObjectId = new mongoose.Types.ObjectId(car_id);

    const car = await CarModel.findOne({_id: carIdCastedToObjectId});
    const company_id = car.company_id;

    await car.deleteOne();

    const company = await CompanyModel.findOne({_id: company_id});
    company.cars = company.cars.filter(car => car !== carIdCastedToObjectId);
    await company.save();

    const reservation = await ReservationModel.findOne({car_id: carIdCastedToObjectId});

    if (reservation) {
      const userId = reservation.user_id;
      await reservation.deleteOne();

      const user = await UserModel.findOne({_id: userId});
      if (user) {
        user.reserved_cars = user.reserved_cars.filter(car => car !== carIdCastedToObjectId);
        await user.save();
      }
    }

    res.status(200).send("Car has been deleted.");
  } catch(err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }

})


app.put("/update-car", async (req, res) => {
  const {id, car_name, price_per_day} = req.body;

  try {
    const car = await CarModel.findOne({_id: id});

    car.name = car_name;
    car.price_per_day = price_per_day;

    await car.save();

    res.status(200).send("Car has been updated successfully");
  } catch(err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});


app.listen(3001, () => {
  console.log("Server is up and running!");
});

