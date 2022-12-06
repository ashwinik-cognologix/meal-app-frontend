import React, { useState } from "react";
//import Header from "../components/Layout/Header";
import Cart from "../components/Cart/Cart";
import Cards from "../components/Card/Cards";
import { getProductList } from "../services/productservice";
import { Grid, Box } from "@mui/material";
import ResponsiveAppBar from "../components/Layout/Appbar";
import {
  getCategory,
  getProductListByCategory,
} from "../services/productservice";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function Meals() {
  const [categoryList, setCategoryList] = React.useState([]);
  const [category, setCategory] = React.useState("All");
  const [meals, setMeals] = useState(false);
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  React.useEffect(() => {
    getProductList().then((response) => {
      setMeals(response.data.reverse());
    });
    getCategory().then((response) => {
      setCategoryList(response.data);
    });
  }, []);

  const categoryChange = (event) => {
    setCategory(event.target.value);
    if (event.target.value === "All") {
      getProductList().then((response) => {
        setMeals(response.data.reverse());
      });
    } else {
      getProductListByCategory(event.target.value).then((response) => {
        setMeals(response.data.reverse());
      });
    }
  };
  return (
    <>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      {/* <Header onShowCart={showCartHandler} /> */}
      <ResponsiveAppBar onShowCart={showCartHandler} />
      <Grid container spacing={4} sx={{ mt: 5 }}>
        <Grid item align="right" xs={12} sx={{ mr: 5 }}>
          <Select
            name="category"
            id="demo-simple-select"
            value={category}
            placeholder="Category"
            onChange={categoryChange}
          >
            <MenuItem value={"All"}>All categories</MenuItem>
            {categoryList.length > 0 &&
              categoryList.map((category) => {
                return (
                  <MenuItem value={category.attributes.name}>
                    {category.attributes.name}
                  </MenuItem>
                );
              })}
          </Select>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 5 }}>
        {meals &&
          meals.map((mealItem, index) => {
            return (
              <Grid item align="center" xs={3} key={index}>
                <Box mb={6}>
                  <Cards mealDetails={mealItem} />
                </Box>
              </Grid>
            );
          })}
      </Grid>
    </>
  );
}
