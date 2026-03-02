import {
  createUser,
  removeUser,
  validateCredentials,
} from "../services/auth.service.js";

export const AuthController = {
  login: async (req, res) => {
    const data = req.body;
    const token = await validateCredentials(data);

    if (!token)
      return res.status(401).json({ message: "Invalid username or password" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60, // 1 hour
    });

    return res.json({
      message: "Logged in succesfully",
    });
  },

  signup: async (req, res) => {
    const data = req.body;
    const { user, token } = await createUser(data);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60, // 1 hour
    });

    return res.json({ message: "User created", user });
  },

  delete: (req, res) => {
    const data = req.body;
    if (removeUser(data)) {
      res.clearCookie("token");
      return res.json({ message: "User Deleted succesfully" });
    }
    return res.json({ message: "User did not exist" });
  },

  updateRole: (req, res) => {
    const data = req.body;
  },

  logout: (req, res) => {
    res.clearCookie("token");
    return res.json({ message: "Logged out succesfully" });
  },
};
