import { Grid, Box, Paper } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      // navigate("/order");
      window.location.href = "/meals";
    }, 3000);
  }, []);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} align="center">
        <Box width={"30%"} sx={{ mt: "100px" }}>
          <Paper elevation={3}>
            <CheckCircleIcon
              style={{ fontSize: "70px", color: "green", paddingTop: "25px" }}
            />
            <Box style={{ color: "green", paddingBottom: "25px" }}>
              <h2>Order placed successfully.</h2>
            </Box>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Success;
