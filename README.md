# Social Media Asset Generator
Node.js (v16 or later)

# Setup
- git clone https://github.com/KevalGondaliya/SocialMediaAssetGenerator.git
- cd SocialMediaAssetGenerator

- npm install
- npm run dev

# Frontend Architecture
* src/
- ├── components/
- │   ├── BrandAssetUploader/   # Handles file uploads
- │   ├── BrandParameters/      # Brand customization form
- │   ├── AssetPreview/         # Preview generated assets
- │   └── ui/                   # Reusable UI components
- ├── pages/
- │   └── Index.tsx            # Main application page
- └── App.tsx                  # Root component

# Key Components

* BrandAssetUploader: Manages logo and image uploads

* BrandParameters: Handles brand customization (colors, positioning)

* AssetPreview: Displays and enables downloading of generated assets

# State Management

* Local state using React's useState for:
- Uploaded assets (logo and images)
- Brand parameters (colors, format, positioning)
- Generation status
- Preview URL
