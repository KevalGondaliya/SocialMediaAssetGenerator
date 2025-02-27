
import { useState } from "react";
import { Upload } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BrandAssetUploader from "@/components/BrandAssetUploader";
import BrandParameters from "@/components/BrandParameters";
import AssetPreview from "@/components/AssetPreview";
import { toast } from "sonner";

const Index = () => {
  const [assets, setAssets] = useState({
    logo: null as File | null,
    images: [] as File[],
  });
  const [brandParams, setBrandParams] = useState({
    primaryColor: "#1E293B",
    secondaryColor: "#E2E8F0",
    logoPosition: "center",
    format: "instagram",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAsset, setGeneratedAsset] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!assets.logo || assets.images.length === 0) {
      toast.error("Please upload a logo and at least one image");
      return;
    }

    setIsGenerating(true);
    try {
      // TODO: Integrate with ComfyUI API
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setGeneratedAsset("https://images.unsplash.com/photo-1488590528505-98d2b5aba04b");
      toast.success("Asset generated successfully!");
    } catch (error) {
      toast.error("Failed to generate asset");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 animate-fadeIn">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-center space-y-4">
          <h1 className="font-display text-4xl font-semibold text-foreground">
            Brand Asset Generator
          </h1>
          <p className="text-muted-foreground text-lg">
            Create beautiful social media assets for your brand
          </p>
        </header>

        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="upload">Upload Assets</TabsTrigger>
            <TabsTrigger value="customize">Customize</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4 animate-slideUp">
            <Card className="p-6">
              <BrandAssetUploader
                assets={assets}
                onAssetsChange={setAssets}
              />
            </Card>
          </TabsContent>

          <TabsContent value="customize" className="space-y-4 animate-slideUp">
            <Card className="p-6">
              <BrandParameters
                params={brandParams}
                onParamsChange={setBrandParams}
              />
            </Card>
          </TabsContent>
        </Tabs>

        <div className="space-y-4">
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full max-w-md mx-auto flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              "Generating..."
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Generate Asset
              </>
            )}
          </Button>

          {generatedAsset && (
            <div className="animate-slideUp">
              <AssetPreview url={generatedAsset} format={brandParams.format} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
