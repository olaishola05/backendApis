const createTokenUser = require("./createTokenUser");
const { attachCookiesToResponse } = require("../utils/createJWT");

module.exports = {
  attachCookiesToResponse,
  createTokenUser,
};
