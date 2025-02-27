
import React from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn("w-full py-6 px-4 border-b border-gray-100", className)}>
      <div className="content-container flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-md bg-black"></div>
          <h1 className="text-lg font-medium tracking-tight">Social Media Asset Generator</h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Home</a>
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Templates</a>
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Documentation</a>
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Support</a>
        </nav>
        
        <div>
          <button className="px-4 py-2 rounded-md bg-black text-white text-sm font-medium transition-all hover:bg-gray-900 active:scale-95">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
