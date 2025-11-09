import React from "react";

// Minimal Card primitives to avoid alias resolution issues during build
export const Card = ({ children, className = "", ...props }) => (
  <div className={`bg-white border p-4 ${className}`} {...props}>
    {children}
  </div>
);

export const CardHeader = ({ children, className = "" }) => (
  <div className={`mb-2 ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);

export default Card;
