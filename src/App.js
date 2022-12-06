import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
// eslint-disable-next-line no-unused-vars
import Header from "./components/Layout/Header";
import Meals from "./pages/meals";
import Cart from "./components/Cart/Cart";
import Addmeal from "./pages/add-meal";
import CartProvider from "./store/CartProvider";
import Success from "./pages/sucsess";
import Order from "./pages/order";
import Addaddress from "./pages/add-address";
import ViewRecipt from "./pages/view-recipt";
import SignUp from "./pages/signup";



function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      {/* <Header onShowCart={showCartHandler} /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Meals />} />
          <Route path="login" element={<Login />} />
          <Route path="/meals" element={<Meals />} />
          <Route path="/add-meal" element={<Addmeal />} />
          <Route path="/success" element={<Success />} />
          <Route path="/order" element={<Order />} />
          <Route path="/address" element={<Addaddress />} />
          <Route path="/view-recipt/:id" element={<ViewRecipt />} />
          <Route path="/signup" element={<SignUp />} />

        </Routes>
      </BrowserRouter>
      {/* <main>
        <Meals />
      </main> */}
    </CartProvider>
  );
}

export default App;
