
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AssetUploader from "@/components/AssetUploader";
import BrandForm from "@/components/BrandForm";
import AssetGenerator from "@/components/AssetGenerator";
import AssetPreview from "@/components/AssetPreview";
import { BrandAsset, BrandConfig, GeneratedAsset } from "@/types";

const Index = () => {
  const [brandAssets, setBrandAssets] = useState<BrandAsset[]>([]);
  const [brandConfig, setBrandConfig] = useState<BrandConfig>({
    name: "",
    primaryColor: "#000000",
    secondaryColor: "#ffffff",
    accentColor: "#0070f3",
    font: "Inter",
    tagline: "",
    description: ""
  });
  const [generatedAsset, setGeneratedAsset] = useState<GeneratedAsset | undefined>(undefined);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerationStart = () => {
    setIsGenerating(true);
  };

  const handleGenerationComplete = (asset: GeneratedAsset) => {
    setGeneratedAsset(asset);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4">
          <div className="content-container text-center max-w-4xl mx-auto animate-slide-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Create branded social media assets in seconds
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Upload your brand assets, customize your design, and generate professional social media graphics powered by ComfyUI.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 px-4">
          <div className="content-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column - Configuration */}
              <div className="space-y-10 animate-fade-in">
                {/* Assets Uploader */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="h-6 w-6 rounded-full bg-black text-white flex items-center justify-center text-sm font-medium">1</div>
                    <h2 className="text-2xl font-semibold">Upload Brand Assets</h2>
                  </div>
                  <AssetUploader
                    onAssetsChange={setBrandAssets}
                  />
                </div>

                {/* Brand Form */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="h-6 w-6 rounded-full bg-black text-white flex items-center justify-center text-sm font-medium">2</div>
                    <h2 className="text-2xl font-semibold">Configure Brand</h2>
                  </div>
                  <BrandForm
                    onChange={setBrandConfig}
                  />
                </div>

                {/* Generator */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="h-6 w-6 rounded-full bg-black text-white flex items-center justify-center text-sm font-medium">3</div>
                    <h2 className="text-2xl font-semibold">Generate Assets</h2>
                  </div>
                  <AssetGenerator
                    brandAssets={brandAssets}
                    brandConfig={brandConfig}
                    onGenerationComplete={handleGenerationComplete}
                  />
                </div>
              </div>

              {/* Right Column - Preview */}
              <div className="space-y-8 animate-fade-in">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="h-6 w-6 rounded-full bg-black text-white flex items-center justify-center text-sm font-medium">4</div>
                  <h2 className="text-2xl font-semibold">Preview & Download</h2>
                </div>

                <div className="space-y-6">
                  <AssetPreview
                    asset={generatedAsset?.format === "instagram" ? generatedAsset : undefined}
                    isLoading={isGenerating && generatedAsset?.format !== "instagram"}
                    format="instagram"
                    className="mb-4"
                  />

                  <AssetPreview
                    asset={generatedAsset?.format === "linkedin" ? generatedAsset : undefined}
                    isLoading={isGenerating && generatedAsset?.format !== "linkedin"}
                    format="linkedin"
                  />
                </div>

                <div className="rounded-lg border border-gray-200 p-6">
                  <h3 className="font-medium mb-3">How it works</h3>
                  <ol className="list-decimal list-inside space-y-3 text-sm text-gray-600">
                    <li>Upload your brand assets (logo, images)</li>
                    <li>Configure your brand's details and style</li>
                    <li>Choose your desired format and layout</li>
                    <li>Generate and download your branded social media assets</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>


      </main>

      <Footer />
    </div>
  );
};

export default Index;
