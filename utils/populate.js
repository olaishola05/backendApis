require("dotenv").config();
const connectDB = require("../db/connectDB");
const Dish = require("../models/dishes");
const jsonDishes = require("./dishes.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Dish.deleteMany();
    await Dish.create(jsonDishes);
    console.log("Items added sucessfully!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
