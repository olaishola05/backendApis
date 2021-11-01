const Dish = require("../models/dishes");
const { StatusCodes } = require("http-status-codes");
const { query } = require("express");

const createDish = async (req, res) => {
  const dish = await Dish.create(req.body);
  res.status(StatusCodes.CREATED).json({ dish });
};
const getAllDishesStatic = async (req, res) => {
  const dishs = await Dish.find({})
    .sort("rating")
    .select("name country rating");
  res.status(StatusCodes.OK).json({ nHits: dishs.length, dishs });
};

const getAllDishes = async (req, res) => {
  const { featured, name, country, region, categories } = req.query;

  const queryObjs = {};

  if (featured) {
    queryObjs.featured = featured === true ? true : false;
  }

  if (name) {
    queryObjs.name = { $regex: name, $options: "i" };
  }

  if (country) {
    queryObjs.country = { $regex: country, $options: "i" };
  }

  if (region) {
    queryObjs.region = { $regex: region, $options: "i" };
  }

  if (categories) {
    queryObjs.categories = { $regex: categories, $options: "i" };
  }
  console.log(queryObjs);
  const dishs = await Dish.find(queryObjs);
  res.status(StatusCodes.OK).json({ nHits: dishs.length, dishs });
};

module.exports = {
  getAllDishes,
  getAllDishesStatic,
  createDish,
};
