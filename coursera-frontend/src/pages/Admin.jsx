import { Button, Typography, Stack, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Manage courses and view details from here.
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
          onClick={() => navigate("/admin/courses")}
          style={{ padding: "10px 20px" }}
        >
          View Courses
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/admin/addcourse")}
          style={{ padding: "10px 20px" }}
        >
          Add Course
        </Button>
      </Stack>
    </Container>
  );
};

export default Admin;
