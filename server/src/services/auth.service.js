import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const validateCredentials = async (userData) => {
  const user = await User.findOne({ username: userData.username });

  if (!user) {
    return null;
  }

  const checkPassword = await bcrypt.compare(userData.password, user.password);
  if (!checkPassword) return null;

  const payload = { id: user._id, username: user.username, role: user.role };

  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
};

export const createUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  userData.password = hashedPassword;

  const newUser = await User.create(userData);

  const payload = {
    id: newUser._id,
    username: newUser.username,
    role: newUser.role,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });

  return {
    user: {
      username: newUser.username,
      role: newUser.role,
    },
    token,
  };
};

export const removeUser = async (userData) => {
  const result = await User.deleteOne({ username: userData.username });
  return result.deletedCount > 0;
};
