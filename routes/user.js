const express = require("express");
const userRegistrationMiddleware = require("../middlewares/userRegistrationMiddleware");
const userValidiationMiddleware = require("../middlewares/userValidiationMiddleware");
const userAuthenticationMiddleware = require("../middlewares/userAuthenticationMiddleware");
const bookPurchaseMiddleware = require("../middlewares/bookPurchaseMiddleware");
const jwt = require("jsonwebtoken");
const { UserSchema } = require("../Dbs");

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

app.get("/user/purchasedCourse", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const response = jwt.verify(token, "12345");
    if (response.email) {
      const user = await UserSchema.findOne({ email: response.email });
      if (user) {
        res.status(200).json(user.purchasedBooks);
      } else {
      }
    }
  } catch (err) {
    res.json({ err });
  }
});

app.listen(3000);
