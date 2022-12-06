import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Box } from "@mui/material";
import MealItemForm from "../Meals/MealItem/MealItemForm";
import CartContext from "../../store/cart-context";
import { Grid } from "@mui/material";

export default function Cards(props) {
  const { attributes } = props.mealDetails;
  const name = attributes?.name;
  const description = attributes?.description;
  const price = attributes?.price;
  const category = attributes?.category;
  const image = attributes?.image?.data?.attributes;
  const id = props?.mealDetails?.id;
  const cartCtx = useContext(CartContext);

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: id,
      name: name,
      amount: amount,
      price: price,
      category: category ? category : "",
    });
  };

  return (
    <Card sx={{ maxWidth: 345 }} style={{ boxShadow: "0 3px 10px #888888" }}>
      <CardActionArea>
        {image.url && (
          <CardMedia
            component="img"
            height="140"
            image={`http://localhost:1337${image.url}`}
            alt="green iguana"
          />
        )}

        <CardContent>
          <Grid container spacing={2}>
            <Grid item align="center" xs={10}>
              <Box sx={{ textAlign: "left" }}>
                <Typography
                  gutterBottom
                  component="div"
                  style={{ fontSize: "18px" }}
                >
                  {name}
                </Typography>
              </Box>
            </Grid>
            <Grid item align="center" xs={2}>
              <Box sx={{ textAlign: "right" }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ fontSize: "18px" }}
                >
                  ${price}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ height: "120px", textAlign: "left" }}>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ fontSize: "15px" }}
            >
              {description}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "left", mt: 2 }}>
            <MealItemForm id={id} onAddToCart={addToCartHandler} />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
