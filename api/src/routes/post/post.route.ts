import express from "express";
const router = express.Router();
const postController = require("./post.controller");

router.get("/all", postController.getPosts);
router.post("/create", postController.createPost);

module.exports = router;
