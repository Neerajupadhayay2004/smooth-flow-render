
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, Sparkles, HelpCircle } from "lucide-react";
import { ProductFormData } from "../ProductWizard";

interface DescriptionMediaProps {
  formData: ProductFormData;
  updateFormData: (data: Partial<ProductFormData>) => void;
}

const DescriptionMedia = ({ formData, updateFormData }: DescriptionMediaProps) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      updateFormData({ images: [...formData.images, ...files] });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      updateFormData({ images: [...formData.images, ...files] });
    }
  };

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    updateFormData({ images: newImages });
  };

  const addKeyword = (keyword: string) => {
    if (keyword && !formData.keywords.includes(keyword)) {
      updateFormData({ keywords: [...formData.keywords, keyword] });
    }
  };

  const removeKeyword = (keyword: string) => {
    updateFormData({ keywords: formData.keywords.filter(k => k !== keyword) });
  };

  const suggestedKeywords = ["Fittings", "Hinges", "Construction hardware materials", "Door and Windows", "Building"];

  return (
    <div className="space-y-8">
      {/* Description */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Label htmlFor="description">Description</Label>
          <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>
        <Textarea
          id="description"
          placeholder="Tell people about your product"
          className="min-h-[120px]"
          value={formData.description}
          onChange={(e) => updateFormData({ description: e.target.value })}
        />
      </div>

      {/* Image Upload */}
      <div>
        <Label className="block mb-4">Product Images</Label>
        
        <Card
          className={`border-2 border-dashed transition-colors ${
            dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <CardContent className="p-8">
            <div className="text-center">
              <Upload className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <div className="mb-4">
                <p className="text-gray-600 mb-2">Drag your image here, or <span className="text-blue-600 cursor-pointer">browse</span></p>
                <p className="text-sm text-gray-500">Supports: JPEG, PNG, JPG</p>
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                Choose Files
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Image Preview */}
        {formData.images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {formData.images.map((image, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeImage(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SEO Settings */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">SEO Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Label htmlFor="seoTitle">SEO Meta Title</Label>
              <HelpCircle className="w-4 h-4 text-gray-400" />
            </div>
            <Input
              id="seoTitle"
              placeholder="Add Title"
              value={formData.seoTitle}
              onChange={(e) => updateFormData({ seoTitle: e.target.value })}
            />
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Label htmlFor="seoDescription">SEO Meta Description</Label>
              <HelpCircle className="w-4 h-4 text-gray-400" />
            </div>
            <Input
              id="seoDescription"
              placeholder="Meta Description"
              value={formData.seoDescription}
              onChange={(e) => updateFormData({ seoDescription: e.target.value })}
            />
          </div>
        </div>

        {/* AI Keywords */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <Label className="text-base font-semibold">AI Keywords</Label>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            Based on your input data, we've identified <span className="font-semibold">5 keywords</span> that may be a good fit for your product.
          </p>

          {/* Current Keywords */}
          <div className="flex flex-wrap gap-2 mb-4">
            {formData.keywords.map((keyword) => (
              <Badge key={keyword} variant="secondary" className="flex items-center gap-1">
                {keyword}
                <button
                  type="button"
                  onClick={() => removeKeyword(keyword)}
                  className="hover:bg-gray-300 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>

          {/* Suggested Keywords */}
          <div className="flex flex-wrap gap-2">
            {suggestedKeywords
              .filter(keyword => !formData.keywords.includes(keyword))
              .map((keyword) => (
                <Badge
                  key={keyword}
                  variant="outline"
                  className="cursor-pointer hover:bg-blue-50 hover:border-blue-300"
                  onClick={() => addKeyword(keyword)}
                >
                  + {keyword}
                </Badge>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionMedia;
