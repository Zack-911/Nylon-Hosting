import React from "react";

const BackgroundGrid: React.FC = () => {
  return (
    <div className="relative w-full h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-0 pointer-events-none">
        {Array.from({ length: 144 }).map((_, index) => (
          <div
            key={index}
    	      className="border border-gray-300 dark:border-gray-700 opacity-20"
          ></div>
        ))}
      </div>
      {/* Decorative Elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="animate-pulse w-64 h-64 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full blur-3xl opacity-30"></div>
      </div>
    </div>
  );
};

export default BackgroundGrid;