const { Router } = require("express");
const userRoute = Router();
const { User, Account } = require("../db");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const authMiddleware = require("../middlewares/middleware");

// validate via zod
const signupBody = zod.object({
  username: zod.string().email(),
  firstname: zod.string().min(3),
  lastname: zod.string().min(3),
  password: zod.string().min(8),
});

userRoute.post("/signup", async (req, res) => {
  try {
    signupBody.parse(req.body);

    // check if the user already exists
    const existingUser = await User.findOne({
      username: req.body.username,
    }).exec();

    if (!existingUser) {
      const newUser = await User.create(req.body);

      // randow balances to start with
      await Account.create({
        userId: newUser._id,
        balance: Math.floor(Math.random() * 10001),
      });

      const token = jwt.sign({ userId: newUser._id.toString() }, JWT_SECRET);

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
        message: err.issues[0].message,
        path: err.issues[0].path[0],
      });
    }
  }
});

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

userRoute.post("/signin", async (req, res) => {
  try {
    signinBody.parse(req.body);

    const { username, password } = req.body;
    const existingUser = await User.findOne({ username, password }).exec();

    if (existingUser) {
      const token = jwt.sign(
        { userId: existingUser._id.toString() },
        JWT_SECRET
      );

      res.status(200).json({
        token: token,
      });
    } else {
      res.status(411).json({
        message: "Incorrect username or password",
      });
    }
  } catch (err) {
    if (err instanceof zod.ZodError) {
      res.json({
        message: err.issues[0].message,
        path: err.issues[0].path[0],
      });
    }
  }
});

const updateUserBody = zod.object({
  firstname: zod.string().min(3).optional(),
  lastname: zod.string().min(3).optional(),
  password: zod.string().min(8).optional(),
});

userRoute.put("/", authMiddleware, async (req, res) => {
  try {
    updateUserBody.parse(req.body);

    await User.findOneAndUpdate({ _id: req.userId }, req.body);

    res.status(200).json({
      message: "Updated successfully",
    });
  } catch (err) {
    if (err instanceof zod.ZodError) {
      res.json({
        message: err.issues[0].message,
        path: err.issues[0].path[0],
      });
    }
  }
});

userRoute.get("/bulk", async (req, res) => {
  try {
    const filterValue = req.query.filter;

    const users = await User.find({
      $or: [
        { firstname: { $regex: filterValue } },
        { lastname: { $regex: filterValue } },
      ],
    });

    res.status(200).json({
      users: users.map((user) => ({
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        userId: user._id,
      })),
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = userRoute;
