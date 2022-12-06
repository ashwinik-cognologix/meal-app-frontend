import React, { useState } from "react";
import { Grid, Box, TextField, Paper, Button } from "@mui/material";
import { loginUser } from "../services/productservice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleEmailField = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordField = (event) => {
    setPassword(event.target.value);
  };

  const userLogin = () => {
    loginUser(email, password).then((response) => {
      setEmail("");
      setPassword("");
      if (response.data.length === 0) {
        localStorage.setItem("user", null);
        setErrorMsg("Invalid email or password");
        setTimeout(() => {
          setErrorMsg("");
        }, 3000);
      } else {
        localStorage.setItem("user", response.data[0].attributes.firstname);
        localStorage.setItem("lastname", response.data[0].attributes.lastname);
        localStorage.setItem("useremail", response.data[0].attributes.email);
        localStorage.setItem(
          "useraddress",
          response.data[0].attributes.address
        );
        localStorage.setItem("userid", response.data[0].id);
        navigate("/meals");
      }
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} align="center">
        <Box width={"30%"} sx={{ mt: "100px" }}>
          <Paper elevation={3}>
            <Box component={"div"} sx={{ pt: 2 }}>
              <h2>Login</h2>
            </Box>
            <Box width="80%" component={"div"} sx={{ pt: 2 }}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Email"
                variant="outlined"
                value={email}
                onChange={handleEmailField}
              />
            </Box>
            <Box width="80%" component={"div"} sx={{ pt: 2 }}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Password"
                variant="outlined"
                value={password}
                type="password"
                onChange={handlePasswordField}
              />
            </Box>

            <Box component={"div"} sx={{ pt: 2, pb: 3 }}>
              <Button
                onClick={userLogin}
                variant="contained"
                sx={{ textTransform: "none", width: "150px", fontSize: "18px" }}
              >
                <b>Login</b>
              </Button>
            </Box>
            <Box component={"div"} sx={{ pt: 2, pb: 3 }}>
              {errorMsg}
            </Box>
            <Link to="/signup">Sign Up</Link>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
