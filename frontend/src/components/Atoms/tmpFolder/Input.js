import React from "react";
import clsx from "clsx";

export default function Input({ className = "", ...props }) {
  return (
    <input
      className={clsx(
        "px-2 py-1 border border-gray-300 rounded w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-indigo-50 placeholder-gray-400",
        className
      )}
      {...props}
    />
  );
}
