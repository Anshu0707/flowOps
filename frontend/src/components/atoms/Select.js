import React from "react";
import clsx from "clsx";
import { formStyles } from "../../utils/styles";

const Select = ({ value, onChange, children, className = "", ...props }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={clsx(formStyles.select, className)}
      {...props}
    >
      {children}
    </select>
  );
};

export default Select;
