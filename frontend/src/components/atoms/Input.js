import React from "react";
import clsx from "clsx";
import { formStyles } from "../../utils/styles";

const Input = ({
  value,
  onChange,
  placeholder = "",
  type = "text",
  className = "",
  ...props
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={clsx(formStyles.input, className)}
      {...props}
    />
  );
};

export default Input;
