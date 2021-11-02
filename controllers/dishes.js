const Dish = require("../models/dishes");
const { StatusCodes } = require("http-status-codes");
const { query } = require("express");

const getAllDishesStatic = async (req, res) => {
  const dishs = await Dish.find({})
    .sort("rating")
    .select("name country rating");
  res.status(StatusCodes.OK).json({ nHits: dishs.length, dishs });
};

const getAllDishes = async (req, res) => {
  const {
    featured,
    name,
    country,
    region,
    categories,
    numericFilters,
    sort,
    fields,
  } = req.query;

  const queryObjs = {};

  if (featured) {
    queryObjs.featured = featured;
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

  // Numeric filters
  if (numericFilters) {
    const operatorObj = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(regEx, (op) => `-${operatorObj[op]}-`);

    // const opts = "rating";
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (field === "rating") {
        queryObjs[field] = { [operator]: Number(value) };
        console.log({ [operator]: Number(value) });
      }
    });
  }

  console.log(queryObjs);
  let result = Dish.find(queryObjs);

  // sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  // fields
  if (fields) {
    const fieldList = fields.split(",").join(" ");
    result = result.select(fieldList);
  }

  // pagination & Limit
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const dishs = await result;
  res.status(StatusCodes.OK).json({
    nHits: dishs.length,
    pageHit: page,
    status: "Success",
    dishs,
  });
};

// create new Dish
const createDish = async (req, res) => {
  const dish = await Dish.create(req.body);
  res.status(StatusCodes.CREATED).json({ dish });
};

const getRandomDish = async (req, res) => {
  const dish = await Dish.find({});
  const random = await dish[Math.floor(Math.random() * dish.length)];
  res
    .status(StatusCodes.OK)
    .json({ status: "success", name: random.name, random });
};

const getDish = async (req, res) => {
  const { id: dishID } = req.params;
  const dish = await Dish.findOne({ _id: dishID });

  if (!dish) throw Error;
  res.status(StatusCodes.OK).json({ dish });
};

module.exports = {
  getAllDishes,
  getAllDishesStatic,
  createDish,
  getRandomDish,
  getDish,
};
