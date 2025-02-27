
import { BrandAsset, GeneratedAsset, GenerationConfig, AssetFormat } from "@/types";

/**
 * Generate a unique ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

/**
 * Create a file URL
 */
export const createFileUrl = (file: File): string => {
  return URL.createObjectURL(file);
};

/**
 * Validate file type
 */
export const isValidFileType = (file: File, types: string[]): boolean => {
  return types.includes(file.type);
};

/**
 * Format file size
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + " bytes";
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
  else return (bytes / 1048576).toFixed(1) + " MB";
};

/**
 * Get dimensions for asset format
 */
export const getAssetDimensions = (format: AssetFormat): { width: number; height: number } => {
  switch (format) {
    case "instagram":
      return { width: 1080, height: 1080 };
    case "linkedin":
      return { width: 1584, height: 396 };
    default:
      return { width: 1080, height: 1080 };
  }
};

/**
 * Get format name
 */
export const getFormatName = (format: AssetFormat): string => {
  switch (format) {
    case "instagram":
      return "Instagram Post";
    case "linkedin":
      return "LinkedIn Banner";
    default:
      return "Custom Format";
  }
};

/**
 * Mock API call to generate assets
 * In a real implementation, this would call the ComfyUI API
 */
export const generateAssets = async (config: GenerationConfig): Promise<GeneratedAsset> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  // For demo, return a placeholder image based on format
  const { width, height } = getAssetDimensions(config.format);
  const placeholderUrl = `https://via.placeholder.com/${width}x${height}`;
  
  return {
    id: generateId(),
    format: config.format,
    url: placeholderUrl,
    thumbnail: placeholderUrl,
    createdAt: new Date(),
  };
};

/**
 * Download a file from a URL
 */
export const downloadFile = (url: string, filename: string): void => {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

/**
 * Format date
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

/**
 * Get file extension from mime type
 */
export const getExtensionFromMimeType = (mimeType: string): string => {
  const map: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/svg+xml': 'svg',
    'image/gif': 'gif',
    'image/webp': 'webp'
  };
  
  return map[mimeType] || 'jpg';
};
