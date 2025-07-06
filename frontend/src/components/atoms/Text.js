import React from "react";

const Text = ({
  children,
  variant = "body",
  weight = "normal",
  className = "",
  ...props
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "h1":
        return "text-4xl";
      case "h2":
        return "text-3xl";
      case "h3":
        return "text-xl";
      case "h4":
        return "text-lg";
      case "body":
        return "text-base";
      case "small":
        return "text-sm";
      default:
        return "text-base";
    }
  };

  const getWeightClasses = () => {
    switch (weight) {
      case "bold":
        return "font-bold";
      case "semibold":
        return "font-semibold";
      case "medium":
        return "font-medium";
      case "normal":
        return "font-normal";
      case "light":
        return "font-light";
      default:
        return "font-normal";
    }
  };

  return (
    <span
      className={`${getVariantClasses()} ${getWeightClasses()} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Text;
