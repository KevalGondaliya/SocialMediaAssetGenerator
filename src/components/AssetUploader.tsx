
import React, { useCallback, useState } from "react";
import { BrandAsset } from "@/types";
import { createFileUrl, generateId, isValidFileType } from "@/utils/helpers";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { X, Upload, Image } from "lucide-react";

interface AssetUploaderProps {
  onAssetsChange: (assets: BrandAsset[]) => void;
  className?: string;
}

const AssetUploader: React.FC<AssetUploaderProps> = ({ onAssetsChange, className }) => {
  const [assets, setAssets] = useState<BrandAsset[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;
    
    processFiles(Array.from(fileList));
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const fileList = e.dataTransfer.files;
    if (!fileList) return;
    
    processFiles(Array.from(fileList));
  }, []);
  
  const processFiles = useCallback((files: File[]) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
    const validFiles = files.filter(file => isValidFileType(file, allowedTypes));
    
    if (validFiles.length !== files.length) {
      toast.error("Some files were not images and were ignored.");
    }
    
    const newAssets = validFiles.map(file => ({
      id: generateId(),
      file,
      url: createFileUrl(file),
      type: file.name.toLowerCase().includes("logo") ? "logo" as const : "image" as const
    }));
    
    setAssets(prev => {
      const updated = [...prev, ...newAssets];
      onAssetsChange(updated);
      return updated;
    });
    
    if (validFiles.length > 0) {
      toast.success(`${validFiles.length} ${validFiles.length === 1 ? 'asset' : 'assets'} uploaded.`);
    }
  }, [onAssetsChange]);
  
  const removeAsset = useCallback((id: string) => {
    setAssets(prev => {
      const updated = prev.filter(asset => asset.id !== id);
      onAssetsChange(updated);
      return updated;
    });
  }, [onAssetsChange]);
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);
  
  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "w-full p-6 border-2 border-dashed rounded-xl transition-all",
          isDragging ? "border-black bg-gray-50" : "border-gray-200 hover:border-gray-300",
          "cursor-pointer animate-fade-in"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-upload")?.click()}
      >
        <div className="flex flex-col items-center justify-center py-6">
          <Upload className="h-10 w-10 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-1">Drag and drop your brand assets</h3>
          <p className="text-sm text-gray-500 mb-3">or click to browse (JPG, PNG, GIF, WebP, SVG)</p>
          
          <input
            id="file-upload"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          
          <button 
            className="px-4 py-2 rounded-md bg-black text-white text-sm font-medium transition-all hover:bg-gray-900 active:scale-95"
            onClick={(e) => e.stopPropagation()}
          >
            Select Files
          </button>
        </div>
      </div>
      
      {assets.length > 0 && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-fade-in">
          {assets.map((asset) => (
            <div key={asset.id} className="group relative aspect-square rounded-md border border-gray-200 overflow-hidden">
              <img
                src={asset.url}
                alt={asset.file.name}
                className="w-full h-full object-cover"
              />
              
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-white text-xs px-2 py-1 bg-black/60 rounded-full mb-6">
                  {asset.type}
                </div>
                
                <button
                  className="absolute top-2 right-2 h-6 w-6 flex items-center justify-center bg-black/60 rounded-full text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeAsset(asset.id);
                  }}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
          
          <div 
            className="aspect-square rounded-md border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:border-gray-300 transition-all"
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            <div className="flex flex-col items-center justify-center p-4">
              <Image className="h-6 w-6 text-gray-400 mb-2" />
              <span className="text-xs text-gray-500">Add more</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetUploader;
