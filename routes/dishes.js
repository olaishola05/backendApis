const express = require("express");
const router = express.Router();

const {
  getAllDishesStatic,
  getAllDishes,
  createDish,
  getRandomDish,
  getDish,
} = require("../controllers/dishes");
const {
  uploadDishImage,
  uploadDishImageLocal,
} = require("../controllers/uploadsController");

router.route("/").get(getAllDishes).post(createDish);
router.route("/static").get(getAllDishesStatic);
router.route("/random").get(getRandomDish);
router.route("/:id").get(getDish);
router.route("/uploads").post(uploadDishImage).post(uploadDishImageLocal);
module.exports = router;
