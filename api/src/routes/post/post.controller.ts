import { NextFunction, Request, Response } from "express";
import { PostSchema } from "@/type";
const postService = require("@services/post.service");

// setting options for multer
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

interface CustomRequest<T> extends Request {
  body: T;
}

async function validateInformation(
  req: CustomRequest<PostSchema>,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.file) {
      res.json({
        success: false,
        message: "No file uploaded",
      });
    } else {
      const postInfo: PostSchema = {
        author: req.body.author,
        content: req.body.content,
      };
      postService
        .createPost(postInfo, req.file)
        .then((result: any) => {
          res.json({
            success: true,
            message: "File uploaded",
          });
        })
        .catch((error: any) => {
          res.json({
            success: false,
            message: error.message,
          });
        });
    }
  } catch (error) {
    console.log(`[Error]: ${error}`);
  }
}

async function getPosts(req: Request, res: Response, next: NextFunction) {
  try {
    const posts = await postService.getPosts();
    res.json({
      success: true,
      message: "Posts retrieved",
      posts,
    });
  } catch (error) {
    console.log(`[Error]: ${error}`);
  }
}


module.exports = {
  createPost: [upload.single("file"), validateInformation],
  getPosts: [getPosts]
};
