import { Typography, Button, CircularProgress, Tooltip } from "@mui/material";
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
  const role = localStorage.getItem("Role");

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
            <Tooltip title={`Go to ${role} dashboard`}>
              <Typography
                variant="h6"
                onClick={() => {
                  navigate(`/${role}`);
                }}
                sx={{
                  cursor: "pointer",
                  color: "primary.main",
                  textAlign: "center",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  transition: "background-color 0.3s ease, transform 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    transform: "scale(1.05)",
                  },
                }}
              >
                {userEmail}
              </Typography>
            </Tooltip>

            <Button
              variant="contained"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("Role");
                setUser({
                  isLoading: false,
                  userEmail: null,
                  userType: null,
                });
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
