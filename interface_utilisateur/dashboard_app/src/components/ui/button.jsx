import React from "react";

export const Button = ({ children, className = "", ...props }) => (
  <button className={`inline-flex items-center gap-2 ${className}`} {...props}>
    {children}
  </button>
);

export default Button;
