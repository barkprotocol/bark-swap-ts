import React from "react";

interface UnderscoreProps {
  color?: string; // Optional color prop
  thickness?: string; // Optional thickness prop
  hoverWidth?: string; // Optional width on hover
}

export default function Underscore({
  color = "bg-gray-500",
  thickness = "h-0.5",
  hoverWidth = "w-1/2",
}: UnderscoreProps) {
  return (
    <div className="relative group">
      {/* Left underline */}
      <span
        className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 ${thickness} ${color} group-hover:${hoverWidth} transition-all duration-300`}
      ></span>
      {/* Right underline */}
      <span
        className={`absolute -bottom-1 right-1/2 transform translate-x-1/2 ${thickness} ${color} group-hover:${hoverWidth} transition-all duration-300`}
      ></span>
    </div>
  );
}
