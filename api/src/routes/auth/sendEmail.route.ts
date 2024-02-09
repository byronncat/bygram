import express from "express";
const router = express.Router();
const controller = require("./controller/index");

router.post("/", controller.sendEmailController);

module.exports = router;
