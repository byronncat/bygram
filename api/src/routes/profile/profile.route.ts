import express from "express";
const router = express.Router();

router.get("/:id", require("./profile.controller").getProfile);

module.exports = router;
