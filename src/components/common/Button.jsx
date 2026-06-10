"use client";

import { forwardRef } from "react";

const variantStyles = {
  primary:
    "bg-erode-green text-erode-black hover:bg-[#a5c235] active:bg-[#93b02e]",
  secondary:
    "bg-erode-black text-white hover:bg-[#333333] active:bg-[#444444]",
  outline:
    "bg-transparent text-erode-black border border-erode-black hover:bg-erode-black hover:text-white active:bg-[#333333]",
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const Button = forwardRef(function Button(
  {
    variant = "primary",
    size = "md",
    className = "",
    children,
    disabled,
    type = "button",
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center font-semibold
        rounded cursor-pointer
        transition-colors duration-200 ease-in-out
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant] || variantStyles.primary}
        ${sizeStyles[size] || sizeStyles.md}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;
