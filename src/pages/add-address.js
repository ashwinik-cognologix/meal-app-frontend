import React, { useEffect, useState } from "react";
//import Header from "../components/Layout/Header";
import ResponsiveAppBar from "../components/Layout/Appbar";
import Cart from "../components/Cart/Cart";
import { Grid, Box, TextField, Paper, Button } from "@mui/material";
import {
  addUserAddress,
  getUserAddress,
  deleteUserAddress,
} from "../services/productservice";
import { useNavigate } from "react-router-dom";
import AddressTable from "../components/Address/AddressTable";

const Addaddress = () => {
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = React.useState(localStorage.getItem("user"));
  const [cartIsShown, setCartIsShown] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [formDetails, setFormDetails] = useState({
    address: "",
  });

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const handleTextField = (event) => {
    setFormDetails((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const addAddress = () => {
    const userid = localStorage.getItem("userid");

    let userData = {
      userid: userid,
      address: formDetails.address,
    };
    addUserAddress(userData).then((response) => {
      if (response.data) {
        getAddress();
        setFormDetails({
          address: "",
        });
      }
    });
  };

  const getAddress = () => {
    setAddressList([]);
    getUserAddress().then((response) => {
      setAddressList(response.data);
    });
  };

  const deleteAddressFromStrapi = (id) => {
    deleteUserAddress(id).then((response) => {
      getAddress();
    });
  };

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      {/* <Header onShowCart={showCartHandler} /> */}
      <ResponsiveAppBar onShowCart={showCartHandler} />
      <Grid container spacing={2}>
        <Grid item xs={12} align="center">
          <Box width={"30%"} sx={{ mt: "100px" }}>
            <Paper elevation={3}>
              <Box component={"div"} sx={{ pt: 2 }}>
                <h2>Add Address</h2>
              </Box>

              <Box width="80%" component={"div"} sx={{ pt: 2 }}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Address"
                  name="address"
                  multiline={true}
                  rows="5"
                  variant="outlined"
                  value={formDetails.address}
                  onChange={handleTextField}
                />
              </Box>

              <Box component={"div"} sx={{ pt: 2, pb: 3 }}>
                <Button
                  onClick={addAddress}
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    width: "150px",
                    fontSize: "18px",
                  }}
                >
                  <b>Add</b>
                </Button>
              </Box>
              <Box component={"div"} sx={{ pt: 2, pb: 3 }}>
                {/* {msg}  */}
              </Box>
            </Paper>
            {addressList.length > 0 && (
              <AddressTable
                address={addressList}
                deleteAddress={deleteAddressFromStrapi}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default Addaddress;
