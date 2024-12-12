import { Admin, Course } from "../db/index.js";
import jwt from "jsonwebtoken";
import { ADMIN_SECRET } from "../config.js";
import { userSchemaType, courseSchemaType } from "../types/index.js";
import { Router } from "express";
import { authenticateAdmin } from "../middleware/auth.js";

const adminRouter = Router();

adminRouter.get("/me", authenticateAdmin, async (req, res) => {
  try {
    const admin = await Admin.findOne({ username: req.user.username });
    if (!admin) {
      return res.status(403).json({ msg: "Admin doesnt exist" });
    }
    res.json({
      username: admin.username,
    });
  } catch (error) {
    console.error("Error during fetching admin profile", error);
    return res
      .status(500)
      .json({ message: "Error during fetching admin profile" });
  }
});

adminRouter.post("/signup", async (req, res) => {
  const parsedBody = userSchemaType.safeParse(req.body);
  if (!parsedBody.success) {
    return res
      .status(400)
      .json({ message: "Invalid input data", errors: parsedBody.error.errors });
  }

  const { username, password } = parsedBody.data;
  try {
    const admin = await Admin.findOne({ username });
    if (admin) {
      return res.status(403).json({ message: "Admin already exists" });
    }
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();

    const token = jwt.sign({ username, role: "admin" }, ADMIN_SECRET, {
      expiresIn: "24h",
    });
    return res.json({ message: "Admin created successfully", token });
  } catch (err) {
    console.error("Error during admin signup", err);
    return res.status(500).json({ message: "Error during admin signup" });
  }
});

adminRouter.post("/signin", async (req, res) => {
  const parsedBody = userSchemaType.safeParse(req.body);
  if (!parsedBody.success) {
    return res
      .status(400)
      .json({ message: "Invalid input data", errors: parsedBody.error.errors });
  }

  const { username, password } = parsedBody.data;
  try {
    const admin = await Admin.findOne({ username, password });
    if (admin) {
      const token = jwt.sign({ username, role: "admin" }, ADMIN_SECRET, {
        expiresIn: "24h",
      });
      res.json({ message: "Logged in successfully", token });
    } else {
      res.status(403).json({ message: "Invalid username or password" });
    }
  } catch (err) {
    console.error("Error during admin signin", err);
    return res.status(500).json({ message: "Error during admin signin" });
  }
});

adminRouter.post("/courses", authenticateAdmin, async (req, res) => {
  const parsedBody = courseSchemaType.safeParse(req.body);
  if (!parsedBody.success) {
    return res
      .status(400)
      .json({ message: "Invalid input data", errors: parsedBody.error.errors });
  }
  try {
    const newCourse = new Course(parsedBody.data);
    await newCourse.save();
    res.json({
      message: "Course created successfully",
      courseId: newCourse.id,
    });
  } catch (error) {
    console.error("Error while creating course", error);
    return res.status(500).json({ message: "Error while creating course" });
  }
});

adminRouter.put("/courses/:courseId", authenticateAdmin, async (req, res) => {
  const parsedBody = courseSchemaType.safeParse(req.body);
  if (!parsedBody.success) {
    return res
      .status(400)
      .json({ message: "Invalid input data", errors: parsedBody.error.errors });
  }
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.courseId,
      parsedBody.data,
      {
        new: true,
      }
    );
    if (course) {
      res.json({ message: "Course updated successfully" });
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    console.error("Error while updating course", error);
    return res.status(500).json({ message: "Error while updating course" });
  }
});

adminRouter.get("/courses", authenticateAdmin, async (req, res) => {
  try {
    const courses = await Course.find({});
    if (courses.length === 0) {
      return res.json({ message: "No courses available", courses: [] });
    }
    res.json({ courses });
  } catch (err) {
    console.error("Error while fetching courses", err);
    return res.status(500).json({ message: "Error while fetching courses" });
  }
});

adminRouter.get("/courses/:courseId", authenticateAdmin, async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ course });
  } catch (err) {
    console.error("Error while fetching course", err);
    return res.status(500).json({ message: "Error while fetching course" });
  }
});

adminRouter.delete("/courses/:courseId", authenticateAdmin, async (req, res) => {
    try {
      const course = await Course.findByIdAndDelete(req.params.courseId);
      if (!course) {
        return res
          .status(404)
          .json({ message: "Course not found" });
      }
      res.json({ message: course.title + ": deleted successfully", id: course._id });
    } catch (err) {
      console.error("Error while deleting course", err);
      return res.status(500).json({ message: "Error while deleting course" });
    }
  }
);

export default adminRouter;
