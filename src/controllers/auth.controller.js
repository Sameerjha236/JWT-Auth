import { createUser, validateCredentials } from "../services/auth.service.js";

export const AuthController = {
  login: (req, res) => {
    const data = req.body;
    if (validateCredentials(data))
      return res.json({ message: "Valid credentials" });
    res.status(401).json({ message: "Invalid credentials" });
  },

  signup: (req, res) => {
    const data = req.body;
    const user = createUser(data);
    res.json({ message: "User created", user });
  },
};
