import { Card, Typography } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../config";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const PurchasedCourse = () => {
  const [purchasedCourse, setPurchasedCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const { courseId } = useParams();
  const location = useLocation();

  const fetchPurchasedCourseData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/user/purchasedCourses/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPurchasedCourse(response.data.purchasedCourse);
    } catch (error) {
      console.error("Failed to fetch course data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchasedCourseData();
  }, [location]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Card
      style={{
        margin: 10,
        width: screen,
        minHeight: 200,
        padding: 20,
      }}
    >
      <Typography textAlign={"left"} variant="h2">
        {purchasedCourse.title}
      </Typography>
      <hr />
      <Typography textAlign={"Left"} variant="h4">
        Description:
      </Typography>
      <Typography textAlign={"left"} variant="h6">
        {purchasedCourse.description}
      </Typography>
      <hr />
      <img
        src={purchasedCourse.imageLink}
        style={{ width: 300 }}
        alt="purchasedCourse"
      />
      <hr />
      <Typography textAlign={"left"} variant="subtitle1">
        Purchased
      </Typography>
      <hr />
    </Card>
  );
};

export default PurchasedCourse;
