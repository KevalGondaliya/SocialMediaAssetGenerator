
import React from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn("w-full py-6 px-4 border-b border-gray-100", className)}>
      <div className="content-container">
        <div className="flex justify-center items-center space-x-1">
          {/* <h1 className="text-3xl font-bold tracking-tight text-red-400">Social Media Asset Generator</h1> */}
        </div>

      </div>
    </header>
  );
};

export default Header;
