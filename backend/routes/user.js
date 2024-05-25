const express = require("express");
const userRoute = express.Router();
const User = require("../db");
const z = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

// validate via zod
const ValidateUser = z.object({
  username: z.string().email(),
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  password: z.string().min(8),
});

userRoute.post("user/signup", async (req, res) => {
  try {
    ValidateUser.parse(req.body);

    // check if the user already exists
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      const token = jwt.sign(req.body.username, JWT_SECRET);

      User.create(req.body);

      res.status(200).json({
        message: "User created successfully",
        token: token,
      });
    } else {
      res.status(411).json({
        message: "Email already taken / Incorrect inputs",
      });
    }
  } catch (error) {}
});

module.exports = userRoute;
