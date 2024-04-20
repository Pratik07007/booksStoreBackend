const jwt = require("jsonwebtoken");
const { AdminSchema } = require("../Dbs");

const adminAuthenticationMiddleware = async (req, res) => {
  const { email, password } = req.body;
  try {
    const dbResponse = await AdminSchema.findOne({
      email,
      password,
    });
    if (dbResponse) {
      const token = jwt.sign({ email }, "12345");
      res.status(200).json({ token });
    } else {
      res.status(400).json({ error: "Invalid Email or password" });
    }
  } catch (error) {
    console.error(error);
  }
};
module.exports = adminAuthenticationMiddleware;
