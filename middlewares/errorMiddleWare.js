const { StatusCodes } = require("http-status-codes");
const errorHandleMiddleware = async (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
  };

  // Handling castError
  if (err.name === "CastError") {
    (customError.msg = `No item with id ${err.value}`),
      (customError.statusCode = StatusCodes.NOT_FOUND);
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandleMiddleware;
