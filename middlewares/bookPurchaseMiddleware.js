const { UserSchema } = require("../Dbs");
const jwt = require("jsonwebtoken");
const bookPurchaseMiddleware = async (req, res) => {
  try {
    const bookId = req.params.bookId; //id is accesed
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, "12345");
    if (decoded.email) {
      await UserSchema.updateOne(
        {
          email: decoded.email,
        },
        {
          $push: {
            purchasedBooks: {
              bookId,
            },
          },
        }
      );
      res.status(200).json({ success: "Book Purchase succesfully" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = bookPurchaseMiddleware;
