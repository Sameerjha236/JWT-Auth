import Task from "../models/task.model.js";

export const getTasksByUser = async (userId) => {
  return await Task.find({ user: userId }).sort({ createdAt: -1 });
};

export const createTaskByUser = async (userId, taskData) => {
  return await Task.create({
    ...taskData,
    user: userId,
  });
};

export const getTaskById = async (taskId) => {
  return await Task.findById(taskId);
};

export const updateTaskById = async (taskId, userId, updatedTaskData) => {
  return await Task.findOneAndUpdate(
    { _id: taskId, user: userId },
    updatedTaskData,
    { new: true },
  );
};

export const deleteTaskById = async (taskId, userId) => {
  return await Task.findOneAndDelete({
    _id: taskId,
    user: userId,
  });
};
