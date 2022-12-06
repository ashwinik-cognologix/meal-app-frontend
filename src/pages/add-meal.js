import React, { useState, useEffect } from "react";
//import Header from "../components/Layout/Header";
import ResponsiveAppBar from "../components/Layout/Appbar";
import Cart from "../components/Cart/Cart";
import { Grid, Box, TextField, Paper, Button } from "@mui/material";
import { addMeals, upload } from "../services/productservice";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { getCategory } from "../services/productservice";

const Addmeal = () => {
  const navigate = useNavigate();

  const [categoryList, setCategoryList] = React.useState([]);
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = React.useState(localStorage.getItem("user"));
  const [cartIsShown, setCartIsShown] = useState(false);
  const [formDetails, setFormDetails] = useState({
    category: "",
    name: "",
    price: "",
    description: "",
    file: "",
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

  const handleFile = (event) => {
    setFormDetails((prevState) => {
      return {
        ...prevState,
        file: event.target.files[0],
      };
    });
  };

  const addMeal = () => {
    const formData = new FormData();
    formData.append("files", formDetails.file, formDetails.file.name);

    upload(formData).then((response) => {
      let fileId = response[0].id;
      let mealData = {
        category: formDetails.category,
        name: formDetails.name,
        price: formDetails.price,
        description: formDetails.description,
        image: fileId,
      };
      addMeals(mealData).then(() => {
        navigate("/meals");
      });
    });
  };

  useEffect(() => {
    if (user !== "Admin") {
      navigate("/meals");
    }
    getCategory().then((response) => {
      setCategoryList(response.data);
      setFormDetails((prevState) => {
        return {
          ...prevState,
          category: response.data[0].attributes.name,
        };
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categoryChange = (event) => {
    setFormDetails((prevState) => {
      return {
        ...prevState,
        category: event.target.value,
      };
    });
  };

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
                <h2>Add Meal</h2>
              </Box>
              <Box width="80%" component={"div"} sx={{ pt: 2 }}>
                <Select
                  fullWidth
                  name="category"
                  id="demo-simple-select"
                  value={formDetails.category}
                  onChange={categoryChange}
                  placeholder="Category"
                >
                  {categoryList.length > 0 &&
                    categoryList.map((category) => {
                      return (
                        <MenuItem value={category.attributes.name}>
                          {category.attributes.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </Box>

              <Box width="80%" component={"div"} sx={{ pt: 2 }}>
                <TextField
                  fullWidth
                  name="name"
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  value={formDetails.name}
                  onChange={handleTextField}
                />
              </Box>
              <Box width="80%" component={"div"} sx={{ pt: 2 }}>
                <TextField
                  name="price"
                  fullWidth
                  id="outlined-basic"
                  label="Price"
                  variant="outlined"
                  value={formDetails.price}
                  onChange={handleTextField}
                />
              </Box>
              <Box width="80%" component={"div"} sx={{ pt: 2 }}>
                <TextField
                  fullWidth
                  name="upload-photo"
                  type="file"
                  onChange={handleFile}
                />
              </Box>
              <Box width="80%" component={"div"} sx={{ pt: 2 }}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Description"
                  name="description"
                  multiline={true}
                  rows="5"
                  variant="outlined"
                  value={formDetails.description}
                  onChange={handleTextField}
                />
              </Box>

              <Box component={"div"} sx={{ pt: 2, pb: 3 }}>
                <Button
                  onClick={addMeal}
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
                {/* {errorMsg} */}
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default Addmeal;
