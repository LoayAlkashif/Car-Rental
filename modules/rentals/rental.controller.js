import { ObjectId } from "mongodb";
import db from "../../databases/dbConnection.js";

// create rental
const createRental = async (req, res) => {
  const { userId, carId, rentalDate, returnDate } = req.body;

  const car = await db.collection("cars").findOne({ _id: new ObjectId(carId) });

  if (car.rentalStatus == "rented") {
    return res.status(400).json({ messsage: "Car is rented" });
  }

  await db
    .collection("cars")
    .updateOne(
      { _id: new ObjectId(carId) },
      { $set: { rentalStatus: "rented" } }
    );
  const newRental = {
    customerId: new ObjectId(userId),
    carId: new ObjectId(carId),
    rentalDate,
    returnDate,
  };
  const result = await db.collection("rentals").insertOne(newRental);

  res.status(201).json({ message: "Success rental", result });
};

// get spacific rental
const spacificRental = async (req, res) => {
  const rental = await db
    .collection("rentals")
    .findOne({ _id: new ObjectId(req.params.id) });
  if (!rental) {
    return res.status(400).json({ message: "Not found this rental" });
  }
  res.status(200).json({ message: "founded", rental });
};

// all rentals
const allRentals = async (req, res) => {
  const allRentals = await db.collection("rentals").find().toArray();
  res.status(200).json({ message: "all rentals", rentals: allRentals });
};

// update rental
const updateRental = async (req, res) => {
  const updates = req.body;
  await db
    .collection("rentals")
    .findOne({ _id: new ObjectId(req.params.id) }, { $set: updates });
  res.status(200).json({ message: "updated" });
};

const deleteRental = async (req, res) => {
  const rental = await db
    .collection("rentals")
    .findOne({ _id: new ObjectId(req.params.id) });
  if (!rental) {
    return res.status(404).json({ message: "rental not found" });
  }
  await db
    .collection("rentals")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.status(200).json({ message: "deleted" });
};
export { createRental, spacificRental, allRentals, updateRental, deleteRental };
