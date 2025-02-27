
import React from "react";
import { Upload } from "lucide-react";
import { Card } from "@/components/ui/card";

interface BrandAssetUploaderProps {
  assets: {
    logo: File | null;
    images: File[];
  };
  onAssetsChange: (assets: { logo: File | null; images: File[] }) => void;
}

const BrandAssetUploader: React.FC<BrandAssetUploaderProps> = ({
  assets,
  onAssetsChange,
}) => {
  const handleLogoDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      onAssetsChange({ ...assets, logo: file });
    }
  };

  const handleImagesDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );
    onAssetsChange({ ...assets, images: [...assets.images, ...files] });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Brand Logo</h3>
        <Card
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleLogoDrop}
          className="border-2 border-dashed p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
        >
          <div className="flex flex-col items-center gap-2">
            <Upload className="w-8 h-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Drag and drop your logo here
            </p>
          </div>
          {assets.logo && (
            <div className="mt-4">
              <img
                src={URL.createObjectURL(assets.logo)}
                alt="Logo preview"
                className="max-h-24 mx-auto"
              />
            </div>
          )}
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Brand Images</h3>
        <Card
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleImagesDrop}
          className="border-2 border-dashed p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
        >
          <div className="flex flex-col items-center gap-2">
            <Upload className="w-8 h-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Drag and drop your brand images here
            </p>
          </div>
          {assets.images.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-4">
              {assets.images.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Image ${index + 1}`}
                  className="w-full h-24 object-cover rounded"
                />
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default BrandAssetUploader;
