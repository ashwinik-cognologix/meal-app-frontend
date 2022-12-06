import classes from "./CartItem.module.css";
import { Grid, Button } from "@mui/material";

const CartItem = (props) => {
  const price = `$${props.price}`;

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button
          onClick={props.onRemove}
          style={{
            backgroundColor: "red",
            color: "#fff",
            borderColor: "transparent",
          }}
        >
          −
        </button>
        <button
          onClick={props.onAdd}
          style={{
            backgroundColor: "#1976d2",
            color: "#fff",
            borderColor: "transparent",
          }}
        >
          +
        </button>
      </div>
    </li>
  );
};

export default CartItem;
