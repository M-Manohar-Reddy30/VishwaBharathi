import mongoose from "mongoose";
import env from "../config/env.js";

const connectDatabase = async (): Promise<void> => {
  try {
    mongoose.set("strictQuery", true);

    await mongoose.connect(env.MONGODB_URI, {
        dbName: "vishwa_bharathi",
        family: 4,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 45000,
    });

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error);
    process.exit(1);
  }
};

mongoose.connection.on("connected", () => {
  console.log("📦 Database connection established");
});

mongoose.connection.on("disconnected", () => {
  console.log("⚠️ Database disconnected");
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB Error:", error);
});

export default connectDatabase;