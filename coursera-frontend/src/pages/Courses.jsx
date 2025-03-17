import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import CourseCard from "../components/CourseCard";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const role = localStorage.getItem("Role");

  const init = async () => {
    const response = await axios.get(`${BASE_URL}/api/v1/${role}/courses`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setCourses(response.data.courses);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "1.5rem",
        alignItems: "stretch",
        padding: "2rem",
      }}
    >
      {courses.map((course, index) => (
        <CourseCard course={course} key={index} />
      ))}
    </div>
  );
};

export default Courses;
