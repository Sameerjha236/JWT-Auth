import { sessions } from "../store/session.store.js";

export const authMiddleware = (req, res, next) => {
  const sessionId = req.cookies.sessionId;

  if (!sessionId) {
    return res.status(401).json({ message: "Session ID missing" });
  }

  const session = sessions[sessionId];

  if (!session) {
    return res.status(401).json({ message: "Invalid or expired session" });
  }

  req.user = session;

  next();
};
