
import React, { useState } from "react";
import { AssetFormat, BrandAsset, BrandConfig, GeneratedAsset, GenerationConfig } from "@/types";
import { cn } from "@/lib/utils";
import { generateAssets, getFormatName } from "@/utils/helpers";
import { toast } from "sonner";

interface AssetGeneratorProps {
  brandAssets: BrandAsset[];
  brandConfig: BrandConfig;
  onGenerationComplete: (asset: GeneratedAsset) => void;
  className?: string;
}

interface FormState {
  format: AssetFormat;
  text: string;
  textPosition: "top" | "center" | "bottom";
  logoPosition: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
  layout: string;
}

const layoutOptions = [
  { label: "Minimal", value: "minimal" },
  { label: "Modern", value: "modern" },
  { label: "Bold", value: "bold" },
  { label: "Classic", value: "classic" }
];

const AssetGenerator: React.FC<AssetGeneratorProps> = ({
  brandAssets,
  brandConfig,
  onGenerationComplete,
  className
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [formState, setFormState] = useState<FormState>({
    format: "instagram",
    text: "",
    textPosition: "center",
    logoPosition: "bottom-right",
    layout: "minimal"
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleGenerate = async () => {
    if (brandAssets.length === 0) {
      toast.error("Please upload at least one brand asset");
      return;
    }
    
    if (!brandConfig.name) {
      toast.error("Please enter your brand name");
      return;
    }
    
    setIsGenerating(true);
    
    try {
      const config: GenerationConfig = {
        format: formState.format,
        brandAssets,
        brandConfig,
        layout: formState.layout,
        text: formState.text,
        textPosition: formState.textPosition,
        logoPosition: formState.logoPosition
      };
      
      const generatedAsset = await generateAssets(config);
      onGenerationComplete(generatedAsset);
      toast.success(`${getFormatName(formState.format)} generated successfully`);
    } catch (error) {
      console.error("Generation error:", error);
      toast.error("Failed to generate asset. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <div className={cn("w-full space-y-6", className)}>
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Generation Settings</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="format" className="text-sm font-medium">
              Asset Format
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className={cn(
                  "px-4 py-3 rounded-md text-sm font-medium text-center transition-all",
                  formState.format === "instagram" 
                    ? "bg-gray-800 text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
                onClick={() => setFormState(prev => ({ ...prev, format: "instagram" }))}
              >
                Instagram Post (1080×1080)
              </button>
              
              <button
                type="button"
                className={cn(
                  "px-4 py-3 rounded-md text-sm font-medium text-center transition-all",
                  formState.format === "linkedin" 
                    ? "bg-gray-800 text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
                onClick={() => setFormState(prev => ({ ...prev, format: "linkedin" }))}
              >
                LinkedIn Banner (1584×396)
              </button>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="layout" className="text-sm font-medium">
              Layout Style
            </label>
            <select
              id="layout"
              name="layout"
              value={formState.layout}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 transition-all"
            >
              {layoutOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="text" className="text-sm font-medium">
              Custom Text
            </label>
            <textarea
              id="text"
              name="text"
              value={formState.text}
              onChange={handleChange}
              placeholder="Enter text to display on your asset"
              rows={3}
              className="w-full px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 transition-all"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="textPosition" className="text-sm font-medium">
                Text Position
              </label>
              <select
                id="textPosition"
                name="textPosition"
                value={formState.textPosition}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 transition-all"
              >
                <option value="top">Top</option>
                <option value="center">Center</option>
                <option value="bottom">Bottom</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="logoPosition" className="text-sm font-medium">
                Logo Position
              </label>
              <select
                id="logoPosition"
                name="logoPosition"
                value={formState.logoPosition}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 transition-all"
              >
                <option value="top-left">Top Left</option>
                <option value="top-right">Top Right</option>
                <option value="center">Center</option>
                <option value="bottom-left">Bottom Left</option>
                <option value="bottom-right">Bottom Right</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-2">
        <button
          className={cn(
            "w-full py-3 px-4 rounded-md text-sm font-medium transition-all",
            "bg-gray-100 text-gray-700 hover:bg-gray-800 hover:text-white active:scale-99",
            isGenerating && "opacity-70 pointer-events-none"
          )}
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? "Generating..." : "Generate Asset"}
        </button>
      </div>
    </div>
  );
};

export default AssetGenerator;
