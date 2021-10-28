const getAllDishesStatic = async (req, res) => {
  res.status(200).send("You have reach the testing route for all dishes");
};

const getAllDishes = async (req, res) => {
  res.status(200).send("You have reach the route for all dishes");
};

module.exports = {
  getAllDishes,
  getAllDishesStatic,
};
