import { useContext } from "react";
import React, { useEffect, useState } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import useRazorpay from "react-razorpay";
import { Box, Button, Grid, TextField } from "@mui/material";
import {
  addOrder,
  getUserAddress,
  addOrderDetails,
  getCouponCodeDetails,
} from "../../services/productservice";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const Cart = (props) => {
  const [addressList, setAddressList] = React.useState([]);
  const [selectedAddress, setSelectedAddress] = React.useState("");
  const [couponcode, setCouponCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const useraddress = localStorage.getItem("useraddress");
  const username = localStorage.getItem("user");
  const navigate = useNavigate();
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const [finalAmount, setFinalAmount] = useState(
    cartCtx.totalAmount.toFixed(2)
  );

  useEffect(() => {
    setFinalAmount(cartCtx.totalAmount.toFixed(2));
  }, [cartCtx.totalAmount]);
  //  console.log(tot, totalAmount);

  const totAmount = `${cartCtx.totalAmount}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const handleCodeField = (event) => {
    setCouponCode(event.target.value);
  };

  const handleCouponCode = () => {
    getCouponCodeDetails(couponcode).then((response) => {
      if (response.data.length === 0) {
        setErrorMsg("Invalid Coupon Code");
        setTimeout(() => {
          setErrorMsg("");
        }, 3000);
      } else {
        //setTotalAmount("");
        let discount = response.data[0].attributes.discount;
        let minamount = response.data[0].attributes.minamount;

        if (totAmount >= minamount) {
          const totalDiscountAmount = (totAmount * discount) / 100;
          const dicountAmount = totAmount - totalDiscountAmount;
          setFinalAmount(dicountAmount);
          setErrorMsg("Coupon Applied Susscessfully");
          setTimeout(() => {
            setErrorMsg("");
          }, 3000);
        } else {
          setErrorMsg("Invalid Coupon Code");
          setTimeout(() => {
            setErrorMsg("");
          }, 3000);
        }
      }
    });
  };

  const Razorpay = useRazorpay();

  const handlePayment = async (totalAmount) => {
    // const order = await createOrder(params); //  Create order on your backend

    const options = {
      key: "rzp_test_uNS0W49uTFfCTV", // Enter the Key ID generated from the Dashboard
      amount: totalAmount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "REACT MEALS",
      description: "Test Transaction",
      image:
        "https://rzp-1415-prod-dashboard-activation.s3.amazonaws.com/org_100000razorpay/main_logo/phpAJgHea",
      // order_id: "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
      handler: function (response) {
        let order = {
          orderId: String(Math.floor(100000 + Math.random() * 900000)),
          transactionId: response.razorpay_payment_id,
          userId: localStorage.getItem("userid"),
          amount: String(cartCtx.totalAmount),
          address: selectedAddress,
          timestamp: Math.floor(Date.now() / 1000),
        };

        addOrder(order).then((response) => {
          cartCtx.items.forEach((item, index) => {
            let cartdetails = {
              orderId: order.orderId,
              transactionId: order.transactionId,
              userId: order.userId,
              address: order.address,
              name: item.name,
              price: String(item.price),
              amount: String(item.amount),
              totalAmount: order.amount,
              timestamp: Math.floor(Date.now() / 1000),
              category: item.category,
            };
            // console.log("cartdetails", cartdetails);
            addOrderDetails(cartdetails).then((response) => {
              navigate("/success");
            });
          });
        });

        //alert(response.razorpay_payment_id);
        //alert(response.razorpay_order_id);
        //alert(response.razorpay_signature);
      },
      prefill: {
        // name: "Piyush Garg",
        // email: "youremail@example.com",
        // contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new Razorpay(options);

    rzp1.on("payment.failed", function (response) {
      // alert(response.error.code);
      // alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      // alert(response.error.metadata.order_id);
      // alert(response.error.metadata.payment_id);
    });

    rzp1.open();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  useEffect(() => {
    getUserAddress().then((response) => {
      setAddressList(response.data);
      setSelectedAddress(response?.data[0]?.attributes?.address);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addressChange = (event) => {
    setSelectedAddress(event.target.value);
  };

  return (
    <Modal onClose={props.onClose}>
      <h3>{username}</h3>

      <Box width="100%" component={"div"} sx={{ pt: 2 }} mb={2}>
        <Select
          fullWidth
          name="address"
          id="demo-simple-select"
          value={selectedAddress}
          onChange={addressChange}
          placeholder="Category"
        >
          {addressList.length > 0 &&
            addressList.map((address) => {
              return (
                <MenuItem value={address.attributes.address}>
                  {address.attributes.address}
                </MenuItem>
              );
            })}
        </Select>
      </Box>
      {cartItems}
      <Box mt={2}>
        <Grid container spacing={1}>
          <Grid item xs={9}>
            <TextField
              fullWidth
              name="code"
              id="outlined-basic"
              label="Add Coupon"
              variant="outlined"
              value={couponcode}
              onChange={handleCodeField}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              size="large"
              onClick={handleCouponCode}
              sx={{ textTransform: "none", height: "55px", width: "100%" }}
            >
              <b> Apply</b>
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box component={"div"} sx={{ pt: 1, pb: 1 }}>
        {errorMsg}
      </Box>

      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${finalAmount}</span>
      </div>

      <div style={{ textAlign: "right" }}>
        <Button
          onClick={props.onClose}
          variant="outlined"
          size="medium"
          sx={{ textTransform: "none", mr: 2 }}
        >
          <b>Close</b>
        </Button>
        {hasItems && (
          <Button
            variant="contained"
            size="medium"
            onClick={() => {
              handlePayment(finalAmount);
            }}
            sx={{ textTransform: "none" }}
          >
            <b> Order</b>
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
