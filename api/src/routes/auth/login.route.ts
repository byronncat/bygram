import { Request, Response, NextFunction } from "express";
const router = require("express").Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({
    status: "Success",
    message: "Login route",
  });
});

router.post("/", (req: Request, res: Response, next: NextFunction) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "admin" && password === "admin123") {
    res.json({
      status: "Success",
      message: "Login successful",
    });
  } else {
    res.json({
      status: "Error",
      message: "Invalid credentials",
    });
  }
});

module.exports = router;
