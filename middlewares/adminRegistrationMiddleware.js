const { AdminSchema } = require("../Dbs");

const adminRegistrationMiddleware = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const dbResponse = await AdminSchema.findOne({
      email,
    });
    if (dbResponse) {
      res
        .status(400)
        .json({ error: `Admin with the email ${email} already exist ` });
    } else {
      try {
        AdminSchema.create({ email, password }).then(
          () =>
            res.status(200).json({ message: "Admin Registered Succesfullly" })
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

module.exports = adminRegistrationMiddleware;
