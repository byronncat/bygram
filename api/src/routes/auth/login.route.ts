import express from "express";
const router = express.Router();
const loginController = require("./controller/login.controller");

router.post("/", loginController);

module.exports = router;
