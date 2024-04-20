const zod = require("zod");

const adminValidiationMiddleware = (req, res, next) => {
  const { email, password } = req.body;
  const adminSchema = zod.object({
    email: zod.string().email(),
    password: zod
      .string()
      .min(8, "Password must be atleaset 8 character long")
      .max(32, "PAssword must not be more than 32 character long")
      .regex(/[0-9]/, "Password must contain atleast one number")
      .regex(/[A-Z]/, "Password must COntain at least one uppercase letter")
      .regex(
        /[~!@#$%^&*()_+}{|:"?>;'/.,}]/,
        "Password must conatin at least one special character"
      ),
  });
  const response = adminSchema.safeParse({
    email,
    password,
  });

  if (response.success) {
    next();
  } else {
    res.status(400).json({ error: response.error.issues[0].message });
  }
};

module.exports = adminValidiationMiddleware;
