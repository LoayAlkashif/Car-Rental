import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import db from "../../databases/dbConnection.js";

// add user
const signup = async (req, res) => {
  const { name, email, password, phone } = req.body;
  // must insert all required data
  if (!name || !email || !password || !phone) {
    return res
      .status(500)
      .json({ message: "Please Insert your required data" });
  }
  // check if user exist
  const userExist = await db.collection("users").findOne({ email: email });
  if (userExist) {
    return res.status(400).json({ message: "User already Exist" });
  }
  // hash pasworrd and set it to a new user
  const hashPassword = await bcrypt.hash(password, 8);
  const newUser = { name, email, password: hashPassword, phone };

  db.collection("users").insertOne(newUser);
  res.status(201).json({ message: "added" });
};
// signin user
const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await db.collection("users").findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).send({ message: "Sign in successfully" });
  } else {
    res.status(401).send({ message: "Invalid credentials" });
  }
};

// get spacificUser
const spacificUser = async (req, res) => {
  const user = await db
    .collection("users")
    .findOne({ _id: new ObjectId(req.params.id) });
  if (!user) {
    return res.status(400).json({ message: "user not founded" });
  }
  res.status(200).json({ message: "user founded", user: user });
};

//get all users
const allUsers = async (req, res) => {
  const users = await db.collection("users").find().toArray();
  res.status(201).json({ message: "all users", users });
};

// update user
const updateUser = async (req, res) => {
  const updates = req.body;
  const newEmail = updates.email;
  // Check the new email if there is a matching email
  if (newEmail) {
    const emailExist = await db
      .collection("users")
      .findOne({ email: newEmail });
    if (emailExist) {
      return res.status(400).json({ message: "Email already exist" });
    }
  }
  // hash the update password
  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 8);
  }
  // update
  await db
    .collection("users")
    .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates });
  res.status(200).json({ message: "updated" });
};

// delete user
const deleteUser = async (req, res) => {
  const user = await db
    .collection("users")
    .findOne({ _id: new ObjectId(req.params.id) });
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  await db.collection("users").deleteOne({ _id: new ObjectId(req.params.id) });
  res.status(201).json({ message: "user deleted successfully" });
};

export { signup, signin, spacificUser, updateUser, deleteUser, allUsers };
