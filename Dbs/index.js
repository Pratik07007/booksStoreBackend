const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://Pratik:AccessGranted@cluster01.2avpg7m.mongodb.net/bookStore"
);

const AdminSchema = mongoose.model("Admins", {
  email: String,
  password: String,
});

const UserSchema = mongoose.model("Users", {
  email: String,
  password: String,
  purchasedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const BooksSchema = mongoose.model("Books", {
  title: String,
  description: String,
  imageLink: String,
  price: Number,
  addedBy: String,
});

module.exports = { AdminSchema, UserSchema, BooksSchema };
