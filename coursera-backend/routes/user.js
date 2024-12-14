import { Router } from "express";
import { Course, User } from "../db/index.js";
import { userSchemaType } from "../types/index.js";
import jwt from "jsonwebtoken";
import { USER_SECRET } from "../config.js";
import { authenticateUser } from "../middleware/auth.js";

const userRouter = Router();

userRouter.get("/me", authenticateUser, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(403).json({ msg: "User does not exist" });
    }
    res.json({
      username: user.username,
    });
  } catch (error) {
    console.error("Error during fetching user profile", error);
    return res
      .status(500)
      .json({ message: "Error during fetching user profile" });
  }
});

userRouter.post("/signup", async (req, res) => {
  const parsedBody = userSchemaType.safeParse(req.body);
  if (!parsedBody.success) {
    return res
      .status(400)
      .json({ message: "Invalid input data", errors: parsedBody.error.errors });
  }

  const { username, password } = parsedBody.data;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(403).json({ message: "User already exists" });
    }
    const newUser = new User({ username, password });
    await newUser.save();

    const token = jwt.sign({ username, role: "user" }, USER_SECRET, {
      expiresIn: "24h",
    });
    return res.json({ message: "User created successfully", token });
  } catch (error) {
    console.error("Error during user signup", error);
    return res.status(500).json({ message: "Error during user signup" });
  }
});

userRouter.post("/signin", async (req, res) => {
  const parsedBody = userSchemaType.safeParse(req.body);
  if (!parsedBody.success) {
    return res
      .status(400)
      .json({ message: "Invalid input data", errors: parsedBody.error.errors });
  }

  const { username, password } = parsedBody.data;
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ username, role: "user" }, USER_SECRET, {
        expiresIn: "24h",
      });
      res.json({ message: "Logged in successfully", token });
    } else {
      return res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error during user signin", error);
    return res.status(500).json({ message: "Error during user signin" });
  }
});

userRouter.get("/courses", authenticateUser, async (req, res) => {
  try {
    const courses = await Course.find({ published: true });
    res.json({ courses });
  } catch (error) {
    console.error("Error during fetching courses", error);
    return res.status(500).json({ message: "Error during fetching courses:" });
  }
});

userRouter.get("/courses/:courseId", authenticateUser, async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ course });
  } catch (error) {
    console.error("Error during fetching course", error);
    return res.status(500).json({ message: "Error during fetching course" });
  }
});

userRouter.post("/courses/:courseId", authenticateUser, async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      res.status(403).json({ message: "User not found" });
    }
    user.purchasedCourses.push(course);
    await user.save();
    res.json({ message: "Course purchased successfully" });
  } catch (error) {
    console.error("Error during purchasing course", error);
    return res.status(500).json({ message: "Error during purchasing course" });
  }
});

userRouter.get("/purchasedCourses", authenticateUser, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).populate(
      "purchasedCourses"
    );
    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } catch (error) {
    console.error("Error during fetching courses", error);
    return res.status(500).json({ message: "Error during fetching courses" });
  }
});

userRouter.get(
  "/purchasedCourses/:courseId",
  authenticateUser,
  async (req, res) => {
    try {
      const { courseId } = req.params;
      const user = await User.findOne({ username: req.user.username }).populate(
        "purchasedCourses"
      );

      if (!user) {
        return res.status(403).json({ message: "User not found" });
      }

      // find the specific course in the user's purchased courses
      const purchasedCourse = user.purchasedCourses.find(
        (course) => course._id.toString() === courseId
      );

      if (!purchasedCourse) {
        return res
          .status(404)
          .json({ message: "Course not found in purchased courses" });
      }

      res.json({ purchasedCourse });
    } catch (error) {
      console.error("Error during fetching course", error);
      return res.status(500).json({ message: "Error during fetching course" });
    }
  }
);

export default userRouter;
