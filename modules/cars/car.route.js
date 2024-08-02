import { Router } from "express";
import {
  addCar,
  availableCarByModel,
  availableCarsOfSpecificModel,
  deleteCar,
  getAllCars,
  getRentedOrSpecificModelCars,
  spacificCar,
  updateCar,
} from "./car.controller.js";

const carRouter = Router();

carRouter.post("/", addCar);
carRouter.get("/", getAllCars);
carRouter.get("/:id", spacificCar);
carRouter.put("/:id", updateCar);
carRouter.delete("/:id", deleteCar);
//http://localhost:3000/cars/search/available?name=Honda
carRouter.get("/search/available", availableCarByModel);
//http://localhost:3000/cars/search/rented-or-name?name=Honda
carRouter.get("/search/rented-or-name", getRentedOrSpecificModelCars);
//http://localhost:3000/cars/search/available-or-rented?name=Honda
carRouter.get("/search/available-or-rented", availableCarsOfSpecificModel);

export default carRouter;
