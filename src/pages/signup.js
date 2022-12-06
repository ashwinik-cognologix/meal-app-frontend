import React, { useState } from "react";
import { Grid, Box, TextField, Paper, Button } from "@mui/material";
import { addUser } from "../services/productservice";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleFirstNameField = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameField = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailField = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordField = (event) => {
    setPassword(event.target.value);
  };

  const userSignUp = () => {
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      password !== ""
    ) {
      let userData = {
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
        usertype: 'User',
      };
      addUser(userData).then((response) => {
        navigate("/login");
      });
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} align="center">
        <Box width={"30%"} sx={{ mt: "100px" }}>
          <Paper elevation={3}>
            <Box component={"div"} sx={{ pt: 2 }}>
              <h2>Sign Up</h2>
            </Box>
            <Box width="80%" component={"div"} sx={{ pt: 2 }}>
              <TextField
                fullWidth
                name="First Name"
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                value={firstName}
                onChange={handleFirstNameField}
              />
            </Box>
            <Box width="80%" component={"div"} sx={{ pt: 2 }}>
              <TextField
                fullWidth
                name="last Name"
                id="outlined-basic"
                label=" last Name"
                variant="outlined"
                value={lastName}
                onChange={handleLastNameField}
              />
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
                onClick={userSignUp}
                variant="contained"
                sx={{ textTransform: "none", width: "150px", fontSize: "18px" }}
              >
                <b>Sign Up</b>
              </Button>
            </Box>
            <Box component={"div"} sx={{ pt: 2, pb: 3 }}>
              {errorMsg}
            </Box>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignUp;
