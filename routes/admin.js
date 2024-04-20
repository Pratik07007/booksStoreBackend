const express = require("express");
const adminRegistrationMiddleware = require("../middlewares/adminRegistrationMiddleware");
const adminValidiationMiddleware = require("../middlewares/adminValidiationMiddleware");
const adminAuthenticationMiddleware = require("../middlewares/adminAuthenticationMiddleware");
const booksAddingInputValidiation = require("../middlewares/booksAddingInputValidiation");
const { BooksSchema } = require("../Dbs");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

app.post(
  "/admin/register",
  adminValidiationMiddleware,
  adminRegistrationMiddleware
);

app.post(
  "/admin/login",
  adminValidiationMiddleware,
  adminAuthenticationMiddleware
);

app.post("/admin/addBooks", booksAddingInputValidiation, async (req, res) => {
  const token = req.headers.authorization;
  const { title, description } = req.body;
  const decoded = jwt.verify(token, "12345");
  if (decoded.email) {
    const dbresponse = await BooksSchema.findOne({
      title,
      description,
    });
    if (dbresponse) {
      res.status(403).json({ error: "Book already exists" });
    } else {
      BooksSchema.create({ ...req.body, addedBy: decoded.email });
      res.status(200).json({ message: "Book Added Succesfully" });
    }
  } else {
    res
      .status(403)
      .json({ error: "Unable to authenticate Admin please relogin" });
  }
});

app.listen(3000);
