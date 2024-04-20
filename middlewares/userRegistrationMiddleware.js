const { UserSchema } = require("../Dbs");

const userRegistrationMiddleware = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const dbResponse = await UserSchema.findOne({
      email,
    });
    if (dbResponse) {
      res
        .status(400)
        .json({ error: `User with the email ${email} already exist ` });
    } else {
      try {
        UserSchema.create({ name, email, password }).then(
          () =>
            res.status(200).json({ message: "User Registered Succesfullly" })
          //   next();
        );
      } catch (error) {
        console.error(error);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = userRegistrationMiddleware;
