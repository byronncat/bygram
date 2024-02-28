import express from "express";
import postController from "./post.controller";
const router = express.Router();

router.get("/all", postController.getPosts);
router.post("/create", postController.createPost);
router.delete("/delete/:id", postController.deletePost);

export default router;
