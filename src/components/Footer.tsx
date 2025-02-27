
import React from "react";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={cn("w-full py-8 border-t border-gray-100", className)}>
      <div className="content-container">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium tracking-tight">Social Media Asset Generator</h3>
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} Social Media Asset Generator. All rights reserved.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
