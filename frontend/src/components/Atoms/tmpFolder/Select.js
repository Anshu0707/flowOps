import React from "react";
import clsx from "clsx";

export default function Select({ className = "", children, ...props }) {
  return (
    <select
      className={clsx(
        "px-2 py-1 border border-gray-300 rounded w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-indigo-50",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}
