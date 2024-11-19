import React from "react";

const ValidLoader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-transparent w-full">
      <div className="relative">
        {/* Base Text */}
        {/* <span className="text-6xl font-bold text-gray-300 absolute inset-0">
          VALID
        </span> */}
        {/* Animated Text */}
        <span className="text-6xl font-bold text-blue-500 relative animate-gradient-left-to-right">
          VALID
        </span>
      </div>
      <style>
        {`
          @keyframes gradient-left-to-right {
            0% {
              clip-path: inset(0 100% 0 0); /* Fully hidden */
            }
            50% {
              clip-path: inset(0 0 0 0); /* Fully visible */
            }
            100% {
              clip-path: inset(0 100% 0 0); /* Hidden again */
            }
          }

          .animate-gradient-left-to-right {
            background: linear-gradient(90deg, #3b82f6, #9333ea, #ef4444, #f59e0b);
            background-size: 300%;
            -webkit-background-clip: text;
            color: transparent;
            animation: gradient-left-to-right 3s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default ValidLoader;
