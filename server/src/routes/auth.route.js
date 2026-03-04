import express from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post("/login", AuthController.login);

router.post("/signup", AuthController.signup);

router.delete(
  "/delete",
  authMiddleware,
  authorize("USER", "Admin"),
  AuthController.delete,
);

router.get("/logout", authMiddleware, AuthController.logout);

export default router;
