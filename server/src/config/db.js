import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongoose connected");
  } catch (error) {
    console.error("DB connection failed:", error.message);
    process.exit(1);
  }
};
