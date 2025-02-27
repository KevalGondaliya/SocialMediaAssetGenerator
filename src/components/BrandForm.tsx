
import React, { useState } from "react";
import { BrandConfig } from "@/types";
import { cn } from "@/lib/utils";

interface BrandFormProps {
  initialConfig?: Partial<BrandConfig>;
  onChange: (config: BrandConfig) => void;
  className?: string;
}

const defaultConfig: BrandConfig = {
  name: "",
  primaryColor: "#000000",
  secondaryColor: "#ffffff",
  accentColor: "#ff0000",
  font: "Inter",
  tagline: "",
  description: ""
};

const fontOptions = [
  { label: "Inter", value: "Inter" },
  { label: "Helvetica", value: "Helvetica" },
  { label: "SF Pro", value: "SF Pro" },
  { label: "Roboto", value: "Roboto" },
  { label: "Montserrat", value: "Montserrat" },
  { label: "Playfair Display", value: "Playfair Display" }
];

const BrandForm: React.FC<BrandFormProps> = ({ 
  initialConfig = {}, 
  onChange,
  className
}) => {
  const [config, setConfig] = useState<BrandConfig>({
    ...defaultConfig,
    ...initialConfig
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setConfig(prev => {
      const updated = { ...prev, [name]: value };
      onChange(updated);
      return updated;
    });
  };
  
  return (
    <div className={cn("w-full space-y-6", className)}>
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Brand Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Brand Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={config.name}
              onChange={handleChange}
              placeholder="Your Brand"
              className="w-full px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 transition-all"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="tagline" className="text-sm font-medium">
              Tagline
            </label>
            <input
              id="tagline"
              name="tagline"
              type="text"
              value={config.tagline}
              onChange={handleChange}
              placeholder="Your brand's slogan"
              className="w-full px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 transition-all"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={config.description}
            onChange={handleChange}
            placeholder="Brief description about your brand"
            rows={3}
            className="w-full px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 transition-all"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Brand Style</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label htmlFor="primaryColor" className="text-sm font-medium">
              Primary Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                id="primaryColor"
                name="primaryColor"
                type="color"
                value={config.primaryColor}
                onChange={handleChange}
                className="h-8 w-8 rounded-md overflow-hidden cursor-pointer border border-gray-200"
              />
              <input
                type="text"
                value={config.primaryColor}
                onChange={handleChange}
                name="primaryColor"
                className="w-full px-3 py-1.5 rounded-md border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 transition-all"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="secondaryColor" className="text-sm font-medium">
              Secondary Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                id="secondaryColor"
                name="secondaryColor"
                type="color"
                value={config.secondaryColor}
                onChange={handleChange}
                className="h-8 w-8 rounded-md overflow-hidden cursor-pointer border border-gray-200"
              />
              <input
                type="text"
                value={config.secondaryColor}
                onChange={handleChange}
                name="secondaryColor"
                className="w-full px-3 py-1.5 rounded-md border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 transition-all"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="accentColor" className="text-sm font-medium">
              Accent Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                id="accentColor"
                name="accentColor"
                type="color"
                value={config.accentColor}
                onChange={handleChange}
                className="h-8 w-8 rounded-md overflow-hidden cursor-pointer border border-gray-200"
              />
              <input
                type="text"
                value={config.accentColor}
                onChange={handleChange}
                name="accentColor"
                className="w-full px-3 py-1.5 rounded-md border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 transition-all"
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="font" className="text-sm font-medium">
            Brand Font
          </label>
          <select
            id="font"
            name="font"
            value={config.font}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 transition-all"
          >
            {fontOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default BrandForm;
