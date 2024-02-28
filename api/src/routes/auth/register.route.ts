import express from "express";
import controller from "./controller/index";
const router = express.Router();

router.post("/", controller.register);

export default router;
