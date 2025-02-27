
import React from "react";
import { AssetFormat, GeneratedAsset } from "@/types";
import { cn } from "@/lib/utils";
import { Download, Share2 } from "lucide-react";
import { getFormatName, downloadFile, formatDate } from "@/utils/helpers";
import { toast } from "sonner";

interface AssetPreviewProps {
  asset?: GeneratedAsset;
  isLoading?: boolean;
  format: AssetFormat;
  className?: string;
}

const AssetPreview: React.FC<AssetPreviewProps> = ({ 
  asset,
  isLoading = false,
  format,
  className
}) => {
  const handleDownload = () => {
    if (!asset) return;
    
    const filename = `brandgen_${format}_${Date.now()}.jpg`;
    downloadFile(asset.url, filename);
    toast.success("Asset downloaded successfully");
  };
  
  const handleShare = () => {
    if (!asset) return;
    
    // In a real app, implement sharing functionality (e.g., via Web Share API)
    if (navigator.share) {
      navigator.share({
        title: `Social Media Asset Generator ${getFormatName(format)}`,
        text: "Check out this asset I created with Social Media Asset Generator!",
        url: asset.url,
      }).catch(() => {
        toast.error("Sharing failed");
      });
    } else {
      navigator.clipboard.writeText(asset.url);
      toast.success("Asset URL copied to clipboard");
    }
  };
  
  return (
    <div className={cn("w-full rounded-xl border border-gray-200 overflow-hidden", className)}>
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-medium">{getFormatName(format)}</h3>
        {asset && (
          <div className="text-xs text-gray-500">
            Created {formatDate(asset.createdAt)}
          </div>
        )}
      </div>
      
      <div 
        className={cn(
          "aspect-video md:aspect-auto relative bg-gray-50 flex items-center justify-center",
          format === "instagram" ? "md:aspect-square" : "md:aspect-[4/1]",
          isLoading && "animate-pulse"
        )}
      >
        {isLoading ? (
          <div className="text-sm text-gray-500">Generating asset...</div>
        ) : asset ? (
          <img 
            src={asset.url} 
            alt={`Generated ${format} asset`}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="image-placeholder w-full h-full flex items-center justify-center">
            <div className="text-sm text-gray-500">Asset preview will appear here</div>
          </div>
        )}
      </div>
      
      <div className="p-4 flex items-center justify-end space-x-2">
        <button
          className={cn(
            "text-sm font-medium px-3 py-1.5 rounded-md transition-all",
            "text-gray-700 hover:bg-gray-100 active:scale-95",
            (!asset || isLoading) && "opacity-50 pointer-events-none"
          )}
          onClick={handleShare}
          disabled={!asset || isLoading}
        >
          <Share2 className="h-4 w-4 inline-block mr-1.5" />
          Share
        </button>
        
        <button
          className={cn(
            "text-sm font-medium px-3 py-1.5 rounded-md transition-all",
            "bg-black text-white hover:bg-gray-900 active:scale-95",
            (!asset || isLoading) && "opacity-50 pointer-events-none"
          )}
          onClick={handleDownload}
          disabled={!asset || isLoading}
        >
          <Download className="h-4 w-4 inline-block mr-1.5" />
          Download
        </button>
      </div>
    </div>
  );
};

export default AssetPreview;
