import { useContext } from "react";
import CartContext from "../../store/cart-context";
import * as React from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -1,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    fontSize: "18px",
    fontFamily: "Noto Sans JP",
    height: "25px",
    width: "25px",
  },
}));

export default function HeaderCartButton(props) {
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  return (
    <IconButton aria-label="cart" onClick={props.onClick}>
      <StyledBadge badgeContent={numberOfCartItems} color="secondary">
        <ShoppingCartIcon style={{ color: "#fff", fontSize: "32px" }} />
      </StyledBadge>
    </IconButton>
  );
}
