const express = require("express");
const router = express.Router();

const { getAllUsers, currentUser, updateUser } = require("../controllers/user");
const { authenticateUser } = require("../middlewares/auth");

router.route("/").get(getAllUsers);
router.route("/me").get(currentUser);
router.route("/updateuser").patch(updateUser);

module.exports = router;
