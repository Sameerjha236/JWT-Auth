import app from "./app.js";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";

dotenv.config();

const startServer = async () => {
  await connectDb();

  const PORT = process.env.PORT;

  app.listen(PORT, () => {
    console.log("Server is running at ", PORT);
  });
};

startServer();
