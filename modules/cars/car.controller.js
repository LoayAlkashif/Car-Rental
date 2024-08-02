import { ObjectId } from "mongodb";
import db from "../../databases/dbConnection.js";

// add a new car
const addCar = async (req, res) => {
  //name, model, and rental status
  const { name, model } = req.body;

  const newCar = { name, model, rentalStatus: "available" };
  const result = await db.collection("cars").insertOne(newCar);

  res.status(201).json({ message: " Added", result });
};

// find spacific car
const spacificCar = async (req, res) => {
  const findCar = await db
    .collection("cars")
    .findOne({ _id: new ObjectId(req.params.id) });
  if (!findCar) {
    return res.status(404).json({ message: "Car not Found" });
  }
  res.status(200).json({ message: "founded", Car: findCar });
};

// get all cars
const getAllCars = async (req, res) => {
  const allCars = await db.collection("cars").find().toArray();
  res.status(200).json({ message: "all cars", allCars });
};

// update car
const updateCar = async (req, res) => {
  const updates = req.body;
  await db
    .collection("cars")
    .updateOne({ _id: new ObjectId(req.params) }, { $set: updates });
  res.status(200).json({ message: "updated" });
};

//delete car
const deleteCar = async (req, res) => {
  await db.collection("cars").deleteOne({ _id: new ObjectId(req.params) });
  res.status(200).json({ message: "deleted" });
};

// available car of spacific model
const availableCarByModel = async (req, res) => {
  const { name } = req.query;
  const cars = await db
    .collection("cars")
    .find({ name, rentalStatus: "available" })
    .toArray();
  res.status(200).json(cars);
};

// get rented or spacific car model
const getRentedOrSpecificModelCars = async (req, res) => {
  const { name } = req.query;
  const cars = await db
    .collection("cars")
    .find({ $or: [{ rentalStatus: "rented" }, { name }] })
    .toArray();
  res.status(200).json(cars);
};

//Get Available Cars of Specific Models or Rented Cars of a Specific Model
const availableCarsOfSpecificModel = async (req, res) => {
  const { name } = req.query;

  const cars = await db
    .collection("cars")
    .find({
      $or: [
        { name, rentalStatus: "available" },
        { name, rentalStatus: "rented" },
      ],
    })
    .toArray();
  res.status(200).json(cars);
};

export {
  addCar,
  spacificCar,
  getAllCars,
  updateCar,
  deleteCar,
  availableCarByModel,
  getRentedOrSpecificModelCars,
  availableCarsOfSpecificModel,
};
