import { Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useParams } from "react-router-dom";
import { getOrderDetails } from "../services/productservice";
import ResponsiveAppBar from "../components/Layout/Appbar";
import Cart from "../components/Cart/Cart";

const ViewRecipt = () => {
  const [cartIsShown, setCartIsShown] = useState(false);
  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const [orderDetailsList, setOrderDetailsList] = React.useState([]);
  const [cartDetails, setCartDetails] = React.useState([]);

  const { id } = useParams();

  const generateRecipt = () => {
    window.html2canvas = html2canvas;
    var doc = new jsPDF({
      unit: "px",
      format: "letter",
      userUnit: "px",
    });

    var content = document.getElementById("content-22");
    // console.log("content", content);
    //console.log("document.body", document.body);
    // doc.html(content, {
    //   callback: function (doc) {
    //     console.log("in callback");
    //     doc.save();
    //   },
    // });
    doc.html(content, { html2canvas: { scale: 0.57 } }).then(() => {
      doc.save(orderDetailsList.orderId);
    });
  };

  useEffect(() => {
    getOrderDetails(id).then((response) => {
      console.log(response?.data);
      setOrderDetailsList({
        firstname: localStorage.getItem("user"),
        lastname: localStorage.getItem("lastname"),
        email: localStorage.getItem("useremail"),
        orderId: response?.data[0].attributes.orderId,
        address: response?.data[0].attributes.address,
        totalAmount: response?.data[0].attributes.totalAmount,
      });
      setCartDetails(response?.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      {/* <Header onShowCart={showCartHandler} /> */}
      <ResponsiveAppBar onShowCart={showCartHandler} />

      <div id="content-22">
        <font size="3">
          <div style={{ marginLeft: "300px" }}>
            <h1>ReactMeals</h1>
          </div>

          <table
            style={{
              border: "2px solid #ccc",
              width: "40%",
              marginLeft: "20px",
              marginTop: "20px",
            }}
            border="0px"
            cellSpacing={5}
            cellPadding={5}
          >
            <tr>
              <td colSpan={4}>
                <label>Name: </label>
                {orderDetailsList.firstname} {orderDetailsList.lastname}
              </td>
            </tr>
            <tr>
              <td colSpan={4}>
                <label>Email: </label>
                {orderDetailsList.email}
              </td>
            </tr>
            <tr>
              <td colSpan={4}>
                <label>Address: </label>
                {orderDetailsList.address}
              </td>
            </tr>
            <tr>
              <td colSpan={4}>
                <label>OrderId: </label>
                {orderDetailsList.orderId}
              </td>
            </tr>

            <tr align={"left"}>
              <th>No.</th>
              <th>Meal</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>

            {cartDetails &&
              cartDetails.length > 0 &&
              cartDetails.map((order, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{order.attributes.name}</td>
                    <td>{order.attributes.amount}</td>
                    <td>{order.attributes.price}</td>
                  </tr>
                );
              })}

            <tr align={"left"}>
              <th></th>
              <th></th>
              <th>Total Amount :</th>
              <th>{orderDetailsList.totalAmount}</th>
            </tr>
          </table>
        </font>
      </div>
      <Button
        onClick={generateRecipt}
        variant="contained"
        color="primary"
        size="medium"
        style={{ marginLeft: "20px", marginTop: "20px" }}
      >
        Download
      </Button>
    </>
  );
};

export default ViewRecipt;
