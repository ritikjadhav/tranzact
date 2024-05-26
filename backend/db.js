const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://username:<password>@cluster0.h9yfro6.mongodb.net/tranzact"
  )
  .then(() => {
    console.log("db connected");
  });

const UserSchema = Schema({
  username: String,
  firstname: String,
  lastname: String,
  password: String,
});

const AccountSchema = mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  balance: Number,
});

const User = model("User", UserSchema);
const Account = model("Account", AccountSchema);

module.exports = {
  User,
  Account,
};
