import {
  createUser,
  removeUser,
  validateCredentials,
} from "../services/auth.service.js";

export const AuthController = {
  login: async (req, res) => {
    const data = req.body;
    const user = await validateCredentials(data);

    if (!user)
      return res.status(401).json({ message: "Invalid username or password" });

    return res.json({ message: "Logged in succesfully", user });
  },

  signup: async (req, res) => {
    const data = req.body;
    const user = await createUser(data);
    return res.json({ message: "User created", user });
  },

  delete: (req, res) => {
    const data = req.body;
    if (removeUser(data)) {
      return res.json({ message: "User Deleted succesfully" });
    }
    return res.json({ message: "User did not exist" });
  },

  updateRole: (req, res) => {
    const data = req.body;
  },
};
