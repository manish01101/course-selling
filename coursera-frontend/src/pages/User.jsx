import { Button, Typography, Stack, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const User = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        User Dashboard
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Buy courses and view details from here.
      </Typography>

      <Stack
        spacing={2}
        direction="row"
        justifyContent="center"
        marginTop="2rem"
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/user/courses")}
          style={{ padding: "10px 20px" }}
        >
          View available Courses
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/user/purchasedCourses")}
          style={{ padding: "10px 20px" }}
        >
          View Purchased Courses
        </Button>
      </Stack>
    </Container>
  );
};

export default User;
