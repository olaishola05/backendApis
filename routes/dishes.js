const express = require("express");
const router = express.Router();

const { getAllDishesStatic, getAllDishes } = require("../controllers/dishes");

router.route("/").get(getAllDishes);
router.route("/static").get(getAllDishesStatic);

module.exports = router;
