import express from "express";
import profileController from "./profile.controller";
const router = express.Router();

router.get("/:id", profileController.getProfile);

export default router;
