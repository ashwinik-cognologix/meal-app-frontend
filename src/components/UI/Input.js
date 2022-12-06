import React from "react";

import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  return (
    <div>
      {/* <label htmlFor={props.input.id}>{props.label}</label> */}
      <input
        ref={ref}
        {...props.input}
        style={{
          height: "30px",
          borderRadius: "5px",
          textAlign: "center",
          borderColor: "#ccc",
          display: "inline",
        }}
      />
    </div>
  );
});

export default Input;
