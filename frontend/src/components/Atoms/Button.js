import React from "react";
import clsx from "clsx";

export default function Button({ className = "", children, ...props }) {
  return (
    <button
      className={clsx(
        "rounded px-4 py-2 bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:shadow-lg transition-colors duration-200 font-semibold",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
