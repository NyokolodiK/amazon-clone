import mongoose from "mongoose";

export default async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
  } catch {
    throw new Error("Failed to connect to database");
  }
}
