import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import HeaderCartButton from "./HeaderCartButton";
import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";

const Header = (props) => {
  const [user, setUser] = useState(localStorage.getItem("user"));

  useEffect(() => {}, [user]);

  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
        {user === null ? (
          <Link to="/login">Login </Link>
        ) : (
          <Link
            to="/meals"
            onClick={() => {
              localStorage.setItem("user", null);
              setUser(null);
            }}
          >
            Logout
          </Link>
         
        )}
         {/* <Link to="/add-meal">Add Meal </Link> */}
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
};

export default Header;
