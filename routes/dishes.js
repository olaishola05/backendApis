const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middlewares/auth");

const {
  getAllDishes,
  createDish,
  getRandomDish,
  getDish,
  updateDish,
  deleteDish,
} = require("../controllers/dishes");
const { uploadDishImage } = require("../controllers/uploadsController");

router.route("/").post(authenticateUser, createDish);
router.route("/").get(authenticateUser, getAllDishes);
router.route("/random").get(authenticateUser, getRandomDish);
router.route("/:id").get(authenticateUser, getDish);
router.route("/:id").patch(authenticateUser, updateDish);
router.route("/:id").delete(authenticateUser, deleteDish);
router.route("/uploads").post(authenticateUser, uploadDishImage);
module.exports = router;
