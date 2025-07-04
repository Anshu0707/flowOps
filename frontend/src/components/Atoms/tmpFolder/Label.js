import React from "react";
import clsx from "clsx";

export default function Label({ className = "", children, ...props }) {
  return (
    <label
      className={clsx("text-xs font-medium text-gray-700", className)}
      {...props}
    >
      {children}
    </label>
  );
}
