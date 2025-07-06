import React from "react";

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  className = "",
  disabled = false,
  onClick,
  type = "button",
  ...props
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500";
      case "secondary":
        return "bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500";
      case "danger":
        return "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500";
      case "success":
        return "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500";
      case "outline":
        return "border border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500";
      default:
        return "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "px-3 py-1.5 text-sm";
      case "medium":
        return "px-4 py-2 text-base";
      case "large":
        return "px-6 py-3 text-lg";
      default:
        return "px-4 py-2 text-base";
    }
  };

  const getDisabledClasses = () => {
    if (disabled) {
      return "opacity-50 cursor-not-allowed";
    }
    return "cursor-pointer";
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center
        font-medium rounded-md
        focus:outline-none focus:ring-2 focus:ring-offset-2
        transition-colors duration-200
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${getDisabledClasses()}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
