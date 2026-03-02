import User from "../models/user.model.js";
import crypto from "crypto";
import bcrypt from "bcrypt";

import { sessions } from "../store/session.store.js";

export const validateCredentials = async (userData) => {
  const user = await User.findOne({ username: userData.username });

  if (!user) {
    return null;
  }

  const checkPassword = await bcrypt.compare(userData.password, user.password);
  if (!checkPassword) return null;

  const sessionId = crypto.randomUUID();
  sessions[sessionId] = {
    id: user._id,
    role: user.role,
  };
  return {
    sessionId: sessionId,
    user: {
      id: user._id,
      username: user.username,
      role: user.role,
    },
  };
};

export const createUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  userData.password = hashedPassword;

  const newUser = await User.create(userData);

  return {
    id: newUser._id,
    username: newUser.username,
    role: newUser.role,
  };
};

export const removeUser = async (userData) => {
  const result = await User.deleteOne({ username: userData.username });
  return result.deletedCount > 0;
};
