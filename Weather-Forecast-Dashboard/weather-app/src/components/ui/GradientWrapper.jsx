import React from "react";

export default function GradientWrapper({ children, variant = "dark" }) {
  if (variant === "light") {
    return <div className="min-h-screen bg-gradient-to-br from-lightStart to-lightEnd">{children}</div>;
  }
  return <div className="min-h-screen bg-gradient-to-br from-darkStart to-darkEnd">{children}</div>;
}
