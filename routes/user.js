const express = require("express");
const userRegistrationMiddleware = require("../middlewares/userRegistrationMiddleware");
const userValidiationMiddleware = require("../middlewares/userValidiationMiddleware");
const userAuthenticationMiddleware = require("../middlewares/userAuthenticationMiddleware");

const bookPurchaseMiddleware = require("../middlewares/bookPurchaseMiddleware");

const app = express();

app.use(express.json());

app.post(
  "/user/register",
  userValidiationMiddleware,
  userRegistrationMiddleware
);

app.post(
  "/user/login",
  userValidiationMiddleware,
  userAuthenticationMiddleware
);

app.post("/user/purchased/:bookId", bookPurchaseMiddleware);

app.listen(3000);
