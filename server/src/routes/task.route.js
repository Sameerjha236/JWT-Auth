import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { TaskController } from "../controllers/task.controller.js";

const router = express.Router();

router.use(authMiddleware);

// GET all tasks of logged-in user
router.get("/tasks", TaskController.getUserTasks);

// CREATE task
router.post("/tasks", TaskController.createTask);

// GET single task by id
router.get("/tasks/:id", TaskController.getTaskById);

// UPDATE task
router.put("/tasks/:id", TaskController.updateTask);

// DELETE task
router.delete("/tasks/:id", TaskController.deleteTask);

export default router;
