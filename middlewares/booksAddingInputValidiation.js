const zod = require("zod");

const booksAddingInputValidiation = (req, res, next) => {
  const booksPayload = req.body;
  const booksPayloadSchema = zod.object({
    title: zod.string(),
    description: zod.string(),
    imageLink: zod.string(),
    price: zod.number(),
  });
  const response = booksPayloadSchema.safeParse(booksPayload);
  if (response.success) {
    next();
  } else {
    res.status(400).json({ error: response.error.issues[0].message });
  }
};
module.exports = booksAddingInputValidiation;
