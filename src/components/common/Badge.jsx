"use client";

const variantStyles = {
  green: "bg-erode-green text-erode-black",
  black: "bg-erode-black text-white",
  outline: "bg-transparent text-erode-black border border-erode-black",
};

const sizeStyles = {
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-3 py-1",
};

function Badge({ variant = "green", size = "md", className = "", children }) {
  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full
        ${variantStyles[variant] || variantStyles.green}
        ${sizeStyles[size] || sizeStyles.md}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

export default Badge;
