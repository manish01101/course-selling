import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userEmailState } from "../store/selectors/userEmail";
import { isUserLoading } from "../store/selectors/isUserLoading.js";
import bgImage from "../assets/image.png";

export const Landing = () => {
  const navigate = useNavigate();
  const userEmail = useRecoilValue(userEmailState);
  const userLoading = useRecoilValue(isUserLoading);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Grid container style={{ height: "100%"}}>
        <Grid
          item
          xs={12}
          md={6}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <Typography variant="h2" gutterBottom>
            Coursera
          </Typography>
          <Typography variant="h5" gutterBottom>
            A place to learn and grow.
          </Typography>
          {!userLoading && !userEmail && (
            <div style={{ display: "flex", marginTop: "20px" }}>
              <Button
                size="large"
                variant="contained"
                style={{ marginRight: "10px" }}
                onClick={() => navigate("/signup")}
              >
                Signup
              </Button>
              <Button
                size="large"
                variant="contained"
                onClick={() => navigate("/signin")}
              >
                Signin
              </Button>
            </div>
          )}
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "5px 10px red",
          }}
        >
          <img
            src={bgImage}
            alt="Landing Background"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};
