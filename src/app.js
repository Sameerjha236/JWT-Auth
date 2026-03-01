import express from "express";
import testRoutes from "./routes/test.route.js";
import authRoutes from "./routes/auth.route.js";
const app = express();

app.use(express.json());

app.use("/api", testRoutes);

app.use("/auth", authRoutes);

export default app;
