const express = require("express");
const { Course, Admin } = require("../db");
const jwt = require("jsonwebtoken");
const { ADMIN_SECRET } = require("../config");
const { userSchemaType, courseSchemaType } = require("../types");

const adminRouter = express.Router();

adminRouter.get("/me", authenticateAdmin, async (req, res) => {
  const admin = await Admin.findOne({ username: req.user.username });
  if (!admin) {
    return res.status(403).json({ msg: "Admin doesnt exist" });
  }
  res.json({
    username: admin.username,
  });
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

    const token = jwt.sign({ username, role: "admin" }, SECRET, {
      expiresIn: "24h",
    });
    return res.json({ message: "Admin created successfully", token });
  } catch (err) {
    console.error("Error during admin signup:", err);
    return res.status(500).json({ message: "Internal server error" });
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
    console.error("Error during admin signin:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

adminRouter.post("/courses", authenticateAdmin, async (req, res) => {
  const parsedBody = courseSchemaType.safeParse(req.body);
  if (!parsedBody.success) {
    return res
      .status(400)
      .json({ message: "Invalid input data", errors: parsedBody.error.errors });
  }

  const newCourse = new Course(parsedBody);
  await newCourse.save();
  res.json({ message: "Course created successfully", courseId: newCourse.id });
});

adminRouter.put("/courses/:courseId", authenticateAdmin, async (req, res) => {
  const parsedBody = courseSchemaType.safeParse(req.body);
  if (!parsedBody.success) {
    return res
      .status(400)
      .json({ message: "Invalid input data", errors: parsedBody.error.errors });
  }
  const course = await Course.findByIdAndUpdate(
    req.params.courseId,
    parsedBody,
    {
      new: true,
    }
  );
  if (course) {
    res.json({ message: "Course updated successfully" });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

adminRouter.get("/courses", authenticateAdmin, async (req, res) => {
  const courses = await Course.find({});
  res.json({ courses });
});

adminRouter.get("/course/:courseId", authenticateAdmin, async (req, res) => {
  const courseId = req.params.courseId;
  const course = await Course.findById(courseId);
  res.json({ course });
});

module.exports = adminRouter;
