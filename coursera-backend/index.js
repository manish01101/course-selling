import express, { json } from "express";
import cors from "cors";
import adminRouter from "./routes/admin.js";
import userRouter from "./routes/user.js";
import mongoose from "mongoose";

const app = express();

app.use(cors());
app.use(json());

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/user", userRouter);
app.get("/", (req, res) => {
  res.json({ msg: "hello" });
});

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017", {
  dbName: "coursera-courses",
});

app.listen(3000, () => console.log("Server running on port 3000..."));
