import React, { useState } from "react";
import Cart from "../components/Cart/Cart";
import ResponsiveAppBar from "../components/Layout/Appbar";
import { getOrder } from "../services/productservice";

import { Box } from "@mui/material";
import DataTable from "./dataTable";

export default function Order() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [orders, setOrder] = useState([]);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  React.useEffect(() => {
    getOrder().then((response) => {
      console.log(response);
      setOrder(response.data);
    });
  }, []);

  return (
    <>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <ResponsiveAppBar onShowCart={showCartHandler} />

      <Box mt={10} pl={5} pr={5}>
         {orders.length >0 ?
          (<DataTable data={orders} />):("No data")
         }
       
      </Box>
    </>
  );
}
