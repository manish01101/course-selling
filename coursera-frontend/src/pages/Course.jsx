import { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Card, Typography } from "@mui/material";
import UpdateCourseButton from "../components/UpdateCourseButton";

const Course = () => {
  const [course, setCourse] = useState([]);
  const role = localStorage.getItem("Role");
  const [loading, setLoading] = useState(true);
  const { courseId } = useParams();
  const navigate = useNavigate();

  const fetchCourseData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/${role}/courses/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCourse(response.data.course);
    } catch (error) {
      console.error("Failed to fetch course data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Card
        style={{
          margin: 10,
          width: screen,
          minHeight: 200,
          padding: 20,
        }}
      >
        <Typography textAlign={"left"} variant="h2">
          {course.title}
        </Typography>
        <hr />
        <Typography textAlign={"Left"} variant="h4">
          Description:
        </Typography>
        <Typography textAlign={"left"} variant="h6">
          {course.description}
        </Typography>
        <hr />
        <img src={course.imageLink} style={{ width: 300 }} alt="Course" />
        <hr />
        <Typography textAlign={"left"} variant="subtitle1">
          Price: {course.price}
        </Typography>
        <hr />
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            padding: 20,
          }}
        >
          <UpdateCourseButton
            course={course}
            onCourseUpdated={fetchCourseData}
          />

          {/* deleting course */}
          <Button
            variant="outlined"
            color="error"
            onClick={async () => {
              const isConfirmed = window.confirm(
                "Are you sure you want to delete this course?"
              );
              if (!isConfirmed) {
                return;
              }

              try {
                const response = await axios.delete(
                  `${BASE_URL}/api/v1/${role}/courses/${courseId}`,
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                );
                console.log(response.data);
                alert("Course: " + response.data.message);
                navigate("/admin/courses");
              } catch (error) {
                console.error("Failed to delete course", error);
              }
            }}
          >
            <Typography component="div">
              <Box sx={{ fontWeight: "bold", m: 1 }}>Delete</Box>
            </Typography>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Course;
