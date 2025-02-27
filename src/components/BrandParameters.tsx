
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BrandParametersProps {
  params: {
    primaryColor: string;
    secondaryColor: string;
    logoPosition: string;
    format: string;
  };
  onParamsChange: (params: any) => void;
}

const BrandParameters: React.FC<BrandParametersProps> = ({
  params,
  onParamsChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Brand Colors</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="primaryColor">Primary Color</Label>
            <input
              type="color"
              id="primaryColor"
              value={params.primaryColor}
              onChange={(e) =>
                onParamsChange({ ...params, primaryColor: e.target.value })
              }
              className="w-full h-10 rounded cursor-pointer"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="secondaryColor">Secondary Color</Label>
            <input
              type="color"
              id="secondaryColor"
              value={params.secondaryColor}
              onChange={(e) =>
                onParamsChange({ ...params, secondaryColor: e.target.value })
              }
              className="w-full h-10 rounded cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Layout Options</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Logo Position</Label>
            <Select
              value={params.logoPosition}
              onValueChange={(value) =>
                onParamsChange({ ...params, logoPosition: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="top-left">Top Left</SelectItem>
                <SelectItem value="top-right">Top Right</SelectItem>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="bottom-left">Bottom Left</SelectItem>
                <SelectItem value="bottom-right">Bottom Right</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Format</Label>
            <Select
              value={params.format}
              onValueChange={(value) =>
                onParamsChange({ ...params, format: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="instagram">Instagram Post</SelectItem>
                <SelectItem value="linkedin">LinkedIn Banner</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandParameters;
