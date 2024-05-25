const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://username:<password>@cluster0.h9yfro6.mongodb.net/")
  .then(() => {
    console.log("db connected");
  });

const UserSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
};
