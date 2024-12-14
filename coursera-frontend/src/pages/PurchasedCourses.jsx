import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import PurchasedCourseCard from "../components/PurchasedCourseCard";

const PurchasedCourses = () => {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const location = useLocation(); // used to detect navigation events.

  const init = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/user/purchasedCourses`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPurchasedCourses(response.data.purchasedCourses || []);
    } catch (err) {
      console.error("Error fetching purchased courses:", err);
    }
  };

  useEffect(() => {
    init();
  }, [location]); //trigger the init function when the route changes

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {purchasedCourses.length === 0 && (
        <Typography textAlign={"center"} variant="h4">
          You have not purchased any courses.
        </Typography>
      )}
      {purchasedCourses.map((course) => {
        return <PurchasedCourseCard course={course} key={course.id} />;
      })}
    </div>
  );
};

export default PurchasedCourses;
