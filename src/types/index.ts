
export type AssetFormat = "instagram" | "linkedin";

export interface BrandAsset {
  id: string;
  file: File;
  url: string;
  type: "logo" | "image" | "background";
}

export interface BrandConfig {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  font: string;
  tagline: string;
  description: string;
}

export interface GenerationConfig {
  format: AssetFormat;
  brandAssets: BrandAsset[];
  brandConfig: BrandConfig;
  layout: string;
  text?: string;
  textPosition: "top" | "center" | "bottom";
  logoPosition: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
}

export interface GeneratedAsset {
  id: string;
  format: AssetFormat;
  url: string;
  thumbnail: string;
  createdAt: Date;
}
