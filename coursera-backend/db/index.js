import { Schema, model } from "mongoose";
// Define mongoose schemas
const userSchema = new Schema({
  username: { type: String },
  password: String,
  purchasedCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
});

const adminSchema = new Schema({
  username: String,
  password: String,
});

const courseSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
});

export const User = model("User", userSchema);
export const Admin = model("Admin", adminSchema);
export const Course = model("Course", courseSchema);