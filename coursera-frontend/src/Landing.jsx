import { Card, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";

export function Landing() {
  return (
    <div
      style={{
        paddingTop: 150,
        marginBottom: 10,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        style={{
          margin: 10,
          width: "80vw",
          minHeight: "40vh",
          borderRadius: 20,
          marginRight: 50,
          paddingBottom: 15,
          zIndex: 2,
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", paddingTop: "15vh" }}>
          <Typography variant="h2">Welcome to Coursera.</Typography>
        </div>
      </Card>
    </div>
  );
}
