import express from "express";
import authRoutes from "./routes/auth.route.js";
import taskRoutes from "./routes/task.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/auth", authRoutes);
app.use("/api", taskRoutes);

export default app;
