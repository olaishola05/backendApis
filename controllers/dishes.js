const Dish = require("../models/dishes");
const { StatusCodes } = require("http-status-codes");

const createDish = async (req, res) => {
  const dish = await Dish.create(req.body);
  res.status(StatusCodes.CREATED).json({ dish });
};
const getAllDishesStatic = async (req, res) => {
  const dishs = await Dish.find({});
  res.status(StatusCodes.OK).json({ dishs });
};

const getAllDishes = async (req, res) => {
  const dishs = await Dish.find({});
  res.status(StatusCodes.OK).json({ dishs });
};

module.exports = {
  getAllDishes,
  getAllDishesStatic,
  createDish,
};
