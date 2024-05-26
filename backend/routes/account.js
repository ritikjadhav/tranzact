const { Router } = require("express");
const accountRoute = Router();
const authMiddleware = require("../middlewares/middleware");
const { Account } = require("../db");
const zod = require("zod");

accountRoute.get("/balance", authMiddleware, async (req, res) => {
  try {
    const account = await Account.findOne({ userId: req.userId });
    res.status(200).json({
      balance: `₹${account.balance}`,
    });
  } catch (error) {
    console.log(error);
  }
});

const transferBody = zod.object({
  to: zod.string(),
  amount: zod.number(),
});

accountRoute.post("/transfer", authMiddleware, async (req, res) => {
  try {
    transferBody.parse(req.body);
    const { to, amount } = req.body;

    const account = await Account.findOne({ userId: req.userId });

    if (account.balance >= amount) {
      await Account.findOneAndUpdate(
        { userId: req.userId },
        {
          $inc: { balance: -amount },
        }
      );

      try {
        // test: if database or nodejs crashes
        // throw new Error("Payment failed");

        await Account.findOneAndUpdate(
          { userId: to },
          {
            $inc: { balance: amount },
          }
        );
      } catch (error) {
        await Account.findOneAndUpdate(
          { userId: req.userId },
          {
            $inc: { balance: amount },
          }
        );

        res.status(500).json({
          message: "Payment failed",
        });
      }

      res.status(200).json({
        message: "Transfer successful",
      });
    } else {
      res.status(400).json({
        message: "Insufficient balance",
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

module.exports = accountRoute;
