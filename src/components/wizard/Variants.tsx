
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, X } from "lucide-react";
import { ProductFormData } from "../ProductWizard";

interface VariantsProps {
  formData: ProductFormData;
  updateFormData: (data: Partial<ProductFormData>) => void;
}

const Variants = ({ formData, updateFormData }: VariantsProps) => {
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);
  const [newVariant, setNewVariant] = useState({
    color: "",
    size: "",
    material: "",
    weight: "",
    sku: "",
    price: "",
    stock: ""
  });

  const availableAttributes = [
    { id: "color", label: "Color", options: ["Red", "Blue", "Green", "Black", "White"] },
    { id: "size", label: "Size", options: ["XS", "S", "M", "L", "XL", "XXL"] },
    { id: "expiry", label: "Expiry", options: ["6 months", "1 year", "2 years"] },
    { id: "material", label: "Material", options: ["Cotton", "Polyester", "Wool", "Silk"] },
    { id: "model", label: "Model", options: ["Model A", "Model B", "Model C"] },
    { id: "weight", label: "Weight", options: ["Light", "Medium", "Heavy"] },
    { id: "skinType", label: "Skin type", options: ["Dry", "Oily", "Combination", "Sensitive"] },
    { id: "gender", label: "Gender", options: ["Male", "Female", "Unisex"] },
    { id: "packagingType", label: "Packaging type", options: ["Box", "Bag", "Bottle"] },
    { id: "flavour", label: "Flavour", options: ["Vanilla", "Chocolate", "Strawberry"] }
  ];

  const addAttribute = (attributeId: string) => {
    if (!selectedAttributes.includes(attributeId)) {
      setSelectedAttributes([...selectedAttributes, attributeId]);
    }
  };

  const removeAttribute = (attributeId: string) => {
    setSelectedAttributes(selectedAttributes.filter(id => id !== attributeId));
  };

  const addVariant = () => {
    const variant = {
      id: Date.now().toString(),
      ...newVariant
    };
    
    updateFormData({
      variants: [...formData.variants, variant]
    });
    
    setNewVariant({
      color: "",
      size: "",
      material: "",
      weight: "",
      sku: "",
      price: "",
      stock: ""
    });
  };

  const removeVariant = (variantId: string) => {
    updateFormData({
      variants: formData.variants.filter(v => v.id !== variantId)
    });
  };

  return (
    <div className="space-y-8">
      <Tabs defaultValue="color" className="w-full">
        <TabsList className="grid w-full grid-cols-10">
          {availableAttributes.map((attr) => (
            <TabsTrigger
              key={attr.id}
              value={attr.id}
              className="text-xs"
              onClick={() => addAttribute(attr.id)}
            >
              {attr.label}
            </TabsTrigger>
          ))}
          <Button variant="ghost" className="text-blue-600 text-sm">
            + Add More
          </Button>
        </TabsList>

        {availableAttributes.map((attr) => (
          <TabsContent key={attr.id} value={attr.id} className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg">Select {attr.label}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeAttribute(attr.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {attr.options.map((option) => (
                      <SelectItem key={option} value={option.toLowerCase()}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Selected Attributes */}
      {selectedAttributes.length > 0 && (
        <div>
          <Label className="text-base font-semibold mb-4 block">Selected Attributes</Label>
          <div className="flex flex-wrap gap-2">
            {selectedAttributes.map((attrId) => {
              const attr = availableAttributes.find(a => a.id === attrId);
              return (
                <Badge key={attrId} variant="secondary" className="flex items-center gap-1">
                  {attr?.label}
                  <button
                    type="button"
                    onClick={() => removeAttribute(attrId)}
                    className="hover:bg-gray-300 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              );
            })}
          </div>
        </div>
      )}

      {/* Add Variant Form */}
      {selectedAttributes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Add Variant</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {selectedAttributes.includes("color") && (
                <div>
                  <Label>Color</Label>
                  <Input
                    placeholder="Color"
                    value={newVariant.color}
                    onChange={(e) => setNewVariant({...newVariant, color: e.target.value})}
                  />
                </div>
              )}
              
              {selectedAttributes.includes("size") && (
                <div>
                  <Label>Size</Label>
                  <Input
                    placeholder="Size"
                    value={newVariant.size}
                    onChange={(e) => setNewVariant({...newVariant, size: e.target.value})}
                  />
                </div>
              )}
              
              {selectedAttributes.includes("material") && (
                <div>
                  <Label>Material</Label>
                  <Input
                    placeholder="Material"
                    value={newVariant.material}
                    onChange={(e) => setNewVariant({...newVariant, material: e.target.value})}
                  />
                </div>
              )}
              
              {selectedAttributes.includes("weight") && (
                <div>
                  <Label>Weight</Label>
                  <Input
                    placeholder="Weight"
                    value={newVariant.weight}
                    onChange={(e) => setNewVariant({...newVariant, weight: e.target.value})}
                  />
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>SKU</Label>
                <Input
                  placeholder="Variant SKU"
                  value={newVariant.sku}
                  onChange={(e) => setNewVariant({...newVariant, sku: e.target.value})}
                />
              </div>
              
              <div>
                <Label>Price</Label>
                <Input
                  placeholder="Price"
                  value={newVariant.price}
                  onChange={(e) => setNewVariant({...newVariant, price: e.target.value})}
                />
              </div>
              
              <div>
                <Label>Stock</Label>
                <Input
                  placeholder="Stock"
                  value={newVariant.stock}
                  onChange={(e) => setNewVariant({...newVariant, stock: e.target.value})}
                />
              </div>
            </div>
            
            <Button onClick={addVariant} className="mt-4">
              <Plus className="w-4 h-4 mr-2" />
              Add Variant
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Variants List */}
      {formData.variants.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Product Variants ({formData.variants.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {formData.variants.map((variant) => (
                <div key={variant.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex gap-4">
                    {variant.color && <Badge variant="outline">Color: {variant.color}</Badge>}
                    {variant.size && <Badge variant="outline">Size: {variant.size}</Badge>}
                    {variant.material && <Badge variant="outline">Material: {variant.material}</Badge>}
                    {variant.weight && <Badge variant="outline">Weight: {variant.weight}</Badge>}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">SKU: {variant.sku}</span>
                    <span className="text-sm font-medium">${variant.price}</span>
                    <span className="text-sm text-gray-600">{variant.stock} in stock</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeVariant(variant.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Variants;
