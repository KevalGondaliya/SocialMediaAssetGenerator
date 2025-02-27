
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface AssetPreviewProps {
  url: string;
  format: string;
}

const AssetPreview: React.FC<AssetPreviewProps> = ({ url, format }) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `brand-asset-${format}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
      toast.success("Download started!");
    } catch (error) {
      toast.error("Failed to download asset");
    }
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Generated Asset</h3>
        <Button onClick={handleDownload} variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </div>
      <div
        className={`relative ${
          format === "instagram" ? "aspect-square" : "aspect-[4/1]"
        }`}
      >
        <img
          src={url}
          alt="Generated asset"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </Card>
  );
};

export default AssetPreview;
