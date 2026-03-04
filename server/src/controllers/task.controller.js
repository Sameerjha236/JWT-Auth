import {
  createTaskByUser,
  deleteTaskById,
  getTaskById,
  getTasksByUser,
  updateTaskById,
} from "../services/task.service.js";

export const TaskController = {
  getUserTasks: async (req, res) => {
    try {
      const user = req.user;

      const tasks = await getTasksByUser(user.id);

      return res.json(tasks);
    } catch (error) {
      return res.status(500).json({ message: "Failed to get tasks" });
    }
  },

  getTaskById: async (req, res) => {
    try {
      const taskId = req.params.id;

      const task = await getTaskById(taskId);

      return res.json(task);
    } catch (error) {
      return res.status(500).json({ message: "Failed to get task" });
    }
  },

  createTask: async (req, res) => {
    try {
      const userId = req.user.id;
      const taskData = req.body;

      const createdTask = await createTaskByUser(userId, taskData);

      return res.status(201).json(createdTask);
    } catch (error) {
      return res.status(500).json({ message: "Failed to create task" });
    }
  },

  updateTask: async (req, res) => {
    try {
      const taskId = req.params.id;
      const userId = req.user.id;
      const updatedTaskData = req.body;

      const updatedTask = await updateTaskById(taskId, userId, updatedTaskData);

      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }

      return res.json(updatedTask);
    } catch (error) {
      return res.status(500).json({ message: "Failed to update task" });
    }
  },

  deleteTask: async (req, res) => {
    try {
      const taskId = req.params.id;
      const userId = req.user.id;

      const deleteTask = await deleteTaskById(taskId, userId);

      if (!deleteTask) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.json(deleteTask);
    } catch (error) {
      return res.status(500).json({ message: "Failed to delete task" });
    }
  },
};
