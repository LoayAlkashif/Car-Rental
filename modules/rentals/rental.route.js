import { Router } from "express";
import {
  allRentals,
  createRental,
  deleteRental,
  spacificRental,
  updateRental,
} from "./rental.controller.js";

const rentalRouter = Router();

rentalRouter.post("/", createRental);
rentalRouter.get("/", allRentals);
rentalRouter.get("/:id", spacificRental);
rentalRouter.put("/:id", updateRental);
rentalRouter.delete("/:id", deleteRental);

export default rentalRouter;
