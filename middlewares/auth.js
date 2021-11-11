const { UnAuthenicatedError } = require("../errors");
const { isTokenValid } = require("../utils/createJWT");

const authenticateUser = async (req, res, next) => {
  let token;

  // check header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }

  //   check cookies
  else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    throw new UnAuthenicatedError("Authentication invalid");
  }
};
