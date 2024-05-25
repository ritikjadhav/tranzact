const { Router } = require("express");
const userRoute = Router();
const { User } = require("../db");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

// validate via zod
const ValidateUser = zod.object({
  username: zod.string().email(),
  firstname: zod.string().min(3),
  lastname: zod.string().min(3),
  password: zod.string().min(8),
});

userRoute.post("/signup", async (req, res) => {
  try {
    ValidateUser.parse(req.body);

    // check if the user already exists
    const existingUser = await User.findOne({
      username: req.body.username,
    }).exec();

    if (!existingUser) {
      await User.create(req.body);

      const token = jwt.sign(req.body.username, JWT_SECRET);

      res.status(200).json({
        message: "User created successfully",
        token: token,
      });
    } else {
      res.status(411).json({
        message: "Email already taken / Incorrect inputs",
      });
    }
  } catch (err) {
    if (err instanceof zod.ZodError) {
      res.json({
        message: err.issues,
      });
    }
  }
});

module.exports = userRoute;
