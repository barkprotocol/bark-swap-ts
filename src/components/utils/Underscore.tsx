import React from "react";

export default function Underscore() {
  return (
    <div className="relative group">
      {/* Left underline */}
      <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gray-500 group-hover:w-1/2 transition-all duration-300"></span>
      {/* Right underline */}
      <span className="absolute -bottom-1 right-1/2 transform translate-x-1/2 w-0 h-0.5 bg-gray-500 group-hover:w-1/2 transition-all duration-300"></span>
    </div>
  );
}
