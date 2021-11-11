const CustomAPIError = require("./custom-api");
const NotFoundError = require("./notFound");
const BadRequestError = require("./bad-request");
const UnAuthenicatedError = require("./unAuthenticated");

module.exports = {
  CustomAPIError,
  NotFoundError,
  BadRequestError,
  UnAuthenicatedError,
};
