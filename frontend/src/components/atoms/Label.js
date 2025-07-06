import React from "react";
import clsx from "clsx";
import { formStyles } from "../../utils/styles";

const Label = ({ children, className = "", ...props }) => {
  return (
    <label className={clsx(formStyles.label, className)} {...props}>
      {children}
    </label>
  );
};

export default Label;
