import React from "react";
import clsx from "clsx";

export default function Text({
  variant = "body",
  weight = "normal",
  className = "",
  children,
  ...props
}) {
  const base = "font-sans";
  const variants = {
    h1: "text-2xl",
    h2: "text-xl",
    h3: "text-lg",
    body: "text-base",
    small: "text-sm",
    tiny: "text-xs",
  };
  const weights = {
    bold: "font-bold",
    semibold: "font-semibold",
    normal: "font-normal",
    light: "font-light",
  };
  return (
    <span
      className={clsx(base, variants[variant], weights[weight], className)}
      {...props}
    >
      {children}
    </span>
  );
}
