import express from "express";
import userRouter from "./modules/users/user.route.js";
import carRouter from "./modules/cars/car.route.js";
import rentalRouter from "./modules/rentals/rental.route.js";

const app = express();

const port = 3000;

app.use(express.json());
app.use("/users", userRouter);
app.use("/cars", carRouter);
app.use("/rentals", rentalRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
