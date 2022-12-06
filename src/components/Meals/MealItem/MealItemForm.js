import { useRef, useState } from "react";

import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";
import { Grid, Button } from "@mui/material";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();
  const [quantity, setQuantity] = useState(1);

  const addQty = () => {
    if (quantity < 5) {
      setQuantity((prevValue) => prevValue + 1);
    }
  };

  const removeQty = () => {
    if (quantity !== 1) {
      setQuantity((prevValue) => prevValue - 1);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form onSubmit={submitHandler}>
      <Grid container spacing={2}>
        <Grid item align="left" xs={8}>
          <Grid container>
            <Grid item align="left" xs={2}>
              <Button
                variant="contained"
                size="small"
                sx={{ textTransform: "none" }}
                onClick={removeQty}
                color="error"
                style={{
                  display: "inline",
                  minWidth: "30px",
                }}
              >
                -
              </Button>
            </Grid>
            <Grid item align="center" xs={3}>
              <Input
                ref={amountInputRef}
                // label="Amount"
                input={{
                  id: "amount_" + props.id,
                  type: "number",
                  min: "1",
                  max: "5",
                  step: "1",
                  defaultValue: "1",
                  value: quantity,
                }}
                height={"20px"}
              />
            </Grid>
            <Grid item align="center" xs={2}>
              <Button
                variant="contained"
                size="small"
                sx={{ textTransform: "none" }}
                onClick={addQty}
                style={{
                  display: "inline",
                  minWidth: "30px",
                }}
              >
                +
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item align="right" xs={4}>
          {/* <button>+ Add</button> */}
          <Button
            variant="contained"
            size="small"
            sx={{ textTransform: "none" }}
            type="submit"
          >
            Add to cart
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item align="center" xs={6}>
          {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
        </Grid>
      </Grid>
    </form>
  );
};

export default MealItemForm;
