import { Typography, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { isUserLoading } from "../store/selectors/isUserLoading";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { userState } from "../store/atoms/user.js";
import { userEmailState } from "../store/selectors/userEmail";

function Appbar() {
  const navigate = useNavigate();
  const userLoading = useRecoilValue(isUserLoading);
  const userEmail = useRecoilValue(userEmailState);
  const setUser = useSetRecoilState(userState);

  if (userLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "4rem",
          backgroundColor: "#fff",
        }}
      >
        <CircularProgress size={24} />
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.5rem 1rem",
        backgroundColor: "#fff",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        zIndex: 1,
      }}
    >
      {/* Logo */}
      <Typography
        variant="h6"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        Coursera
      </Typography>

      {/* Conditional Buttons of signup, signin, logout */}
      <div style={{ display: "flex", gap: "1rem" }}>
        {userEmail ? (
          <>
            <Button onClick={() => navigate("/addcourse")}>Add Course</Button>
            <Button onClick={() => navigate("/courses")}>Courses</Button>
            <Button
              variant="contained"
              onClick={() => {
                localStorage.removeItem("token");
                setUser({ isLoading: false, userEmail: null });
                navigate("/");
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button variant="contained" onClick={() => navigate("/signup")}>
              Signup
            </Button>
            <Button variant="contained" onClick={() => navigate("/signin")}>
              Signin
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Appbar;
