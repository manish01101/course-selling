import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config.js";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user.js";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  return (
    <div>
      <div
        style={{
          paddingTop: 150,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant={"h6"}>
          Welcome to Coursera. Sign in below.
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card varint={"outlined"} style={{ width: 400, padding: 20 }}>
          <TextField
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            fullWidth={true}
            label="Email"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            fullWidth={true}
            label="Password"
            variant="outlined"
            type={"password"}
          />
          <br />
          <br />
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              label="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
          <br />
          <br />

          <Button
            size={"large"}
            variant="contained"
            onClick={async () => {
              try {
                const response = await axios.post(
                  `${BASE_URL}/api/v1/${role}/signin`,
                  {
                    username: email,
                    password: password,
                  }
                );
                let data = response.data;
                localStorage.setItem("token", data.token);
                localStorage.setItem("Role", role);
                localStorage.setItem("type", role);
                setUser({ userEmail: email, isLoading: false, userRole: role });
                // window.location = "/"
                {
                  role === "user" ? navigate("/user") : navigate("/admin");
                }
              } catch (error) {
                alert(error.response.data.message);
              }
            }}
          >
            Signin
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default Signup;
