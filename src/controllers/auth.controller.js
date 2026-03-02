import {
  createUser,
  removeUser,
  validateCredentials,
} from "../services/auth.service.js";

export const AuthController = {
  login: async (req, res) => {
    const data = req.body;
    const result = await validateCredentials(data);

    if (!result)
      return res.status(401).json({ message: "Invalid username or password" });

    res.cookie("sessionId", result.sessionId, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60, // 1 hour
    });

    return res.json({
      message: "Logged in succesfully",
      user: result.user,
    });
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
    res.clearCookie("sessionId");
    return res.json({ message: "User did not exist" });
  },

  updateRole: (req, res) => {
    const data = req.body;
  },
};
