const express = require("express");
const router = express.Router();

const {
  getAllDishesStatic,
  getAllDishes,
  createDish,
} = require("../controllers/dishes");
const {
  uploadDishImage,
  uploadDishImageLocal,
} = require("../controllers/uploadsController");

router.route("/").get(getAllDishes).post(createDish);
router.route("/uploads").post(uploadDishImage).post(uploadDishImageLocal);
router.route("/static").get(getAllDishesStatic);
module.exports = router;
