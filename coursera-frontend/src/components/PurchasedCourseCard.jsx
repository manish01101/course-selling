import { Button, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const PurchasedCourseCard = ({ course }) => {
  const navigate = useNavigate();

  return (
    <Card
      style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20,
      }}
    >
      <Typography textAlign={"center"} variant="h5">
        {course.title}
      </Typography>
      <Typography textAlign={"center"} variant="subtitle1">
        {course.description}
      </Typography>
      <img src={course.imageLink} style={{ width: 300 }}></img>
      <Typography textAlign={"center"} variant="subtitle1">
        Price: {course.price}
      </Typography>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            navigate(`/user/purchasedCourses/${course._id}`);
          }}
        >
          View
        </Button>
      </div>
    </Card>
  );
};

PurchasedCourseCard.propTypes = {
  course: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageLink: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default PurchasedCourseCard;
