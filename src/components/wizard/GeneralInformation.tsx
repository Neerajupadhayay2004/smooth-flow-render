
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { BarChart, HelpCircle } from "lucide-react";
import { ProductFormData } from "../ProductWizard";

interface GeneralInformationProps {
  formData: ProductFormData;
  updateFormData: (data: Partial<ProductFormData>) => void;
}

const GeneralInformation = ({ formData, updateFormData }: GeneralInformationProps) => {
  const generateBarcode = () => {
    const barcode = Math.random().toString(36).substring(2, 15);
    updateFormData({ barcode });
  };

  const generateEAN = () => {
    const ean = Math.floor(Math.random() * 1000000000000).toString();
    updateFormData({ ean });
  };

  return (
    <div className="space-y-8">
      {/* Item Type */}
      <div>
        <Label className="text-base font-semibold mb-4 block">Item Type</Label>
        <RadioGroup
          value={formData.itemType}
          onValueChange={(value: "goods" | "services") => updateFormData({ itemType: value })}
          className="flex gap-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="goods" id="goods" />
            <Label htmlFor="goods">Goods</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="services" id="services" />
            <Label htmlFor="services">Services</Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      {/* Basic Product Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="productName">Product Name</Label>
          <Input
            id="productName"
            placeholder="Enter New Product Name"
            value={formData.productName}
            onChange={(e) => updateFormData({ productName: e.target.value })}
          />
        </div>
        
        <div>
          <Label htmlFor="sku">SKU</Label>
          <Input
            id="sku"
            placeholder="Enter SKU"
            value={formData.sku}
            onChange={(e) => updateFormData({ sku: e.target.value })}
          />
        </div>
      </div>

      {/* Barcode and EAN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label htmlFor="barcode">Barcode</Label>
            <Button
              type="button"
              variant="link"
              className="text-blue-600 text-sm p-0 h-auto"
              onClick={generateBarcode}
            >
              Generate Barcode
            </Button>
          </div>
          <div className="flex gap-2">
            <Input
              id="barcode"
              placeholder="Enter 12 Digit Code"
              value={formData.barcode}
              onChange={(e) => updateFormData({ barcode: e.target.value })}
            />
            <Button variant="outline" size="icon">
              <BarChart className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div>
          <Label htmlFor="ean">EAN</Label>
          <div className="flex gap-2">
            <Input
              id="ean"
              placeholder="Enter 12 Digit Code"
              value={formData.ean}
              onChange={(e) => updateFormData({ ean: e.target.value })}
            />
            <Button variant="outline" size="icon">
              <BarChart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Category and Sub-Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label>Category</Label>
          <Select value={formData.category} onValueChange={(value) => updateFormData({ category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="clothing">Clothing</SelectItem>
              <SelectItem value="books">Books</SelectItem>
              <SelectItem value="home">Home & Garden</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label>Sub-Category</Label>
          <Select value={formData.subCategory} onValueChange={(value) => updateFormData({ subCategory: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="smartphones">Smartphones</SelectItem>
              <SelectItem value="laptops">Laptops</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Brand/Manufacturer */}
      <div>
        <Label>Brand/Manufacturer</Label>
        <Select value={formData.brand} onValueChange={(value) => updateFormData({ brand: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="samsung">Samsung</SelectItem>
            <SelectItem value="sony">Sony</SelectItem>
            <SelectItem value="lg">LG</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Product Type */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Label className="text-base font-semibold">Product Type</Label>
          <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>
        <RadioGroup
          value={formData.productType}
          onValueChange={(value: "simple" | "variant" | "bundle") => updateFormData({ productType: value })}
          className="flex gap-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="simple" id="simple" />
            <Label htmlFor="simple">Simple</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="variant" id="variant" />
            <Label htmlFor="variant">Variant</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="bundle" id="bundle" />
            <Label htmlFor="bundle">Bundle</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Supplier Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label>Select Supplier</Label>
          <Select value={formData.supplier} onValueChange={(value) => updateFormData({ supplier: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="supplier1">Supplier 1</SelectItem>
              <SelectItem value="supplier2">Supplier 2</SelectItem>
              <SelectItem value="supplier3">Supplier 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label>Supplier SKU</Label>
          <Select value={formData.supplierSku} onValueChange={(value) => updateFormData({ supplierSku: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sku1">SKU-001</SelectItem>
              <SelectItem value="sku2">SKU-002</SelectItem>
              <SelectItem value="sku3">SKU-003</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Warehouse/Location */}
      <div>
        <Label>Warehouse/Location</Label>
        <Select value={formData.warehouse} onValueChange={(value) => updateFormData({ warehouse: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="warehouse1">Warehouse 1</SelectItem>
            <SelectItem value="warehouse2">Warehouse 2</SelectItem>
            <SelectItem value="warehouse3">Warehouse 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Advanced Settings */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <Label className="text-base font-semibold">Advance</Label>
          <Switch />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Label>Lead Time</Label>
              <HelpCircle className="w-4 h-4 text-gray-400" />
            </div>
            <Select value={formData.leadTime} onValueChange={(value) => updateFormData({ leadTime: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-week">1 Week</SelectItem>
                <SelectItem value="2-weeks">2 Weeks</SelectItem>
                <SelectItem value="1-month">1 Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Label>Reorder Level</Label>
              <HelpCircle className="w-4 h-4 text-gray-400" />
            </div>
            <Select value={formData.reorderLevel} onValueChange={(value) => updateFormData({ reorderLevel: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 units</SelectItem>
                <SelectItem value="25">25 units</SelectItem>
                <SelectItem value="50">50 units</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Label>Initial Stock Quantity</Label>
              <HelpCircle className="w-4 h-4 text-gray-400" />
            </div>
            <Input
              placeholder="0.00"
              value={formData.initialStock}
              onChange={(e) => updateFormData({ initialStock: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Label className="text-base font-semibold">Track</Label>
              <HelpCircle className="w-4 h-4 text-gray-400" />
            </div>
            <RadioGroup
              value={formData.track}
              onValueChange={(value: "serial" | "batch") => updateFormData({ track: value })}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="serial" id="serial" />
                <Label htmlFor="serial">Serial No.</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="batch" id="batch" />
                <Label htmlFor="batch">Batch No.</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Label className="text-base font-semibold">Status</Label>
              <HelpCircle className="w-4 h-4 text-gray-400" />
            </div>
            <RadioGroup
              value={formData.status}
              onValueChange={(value: "returnable" | "non-returnable") => updateFormData({ status: value })}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="returnable" id="returnable" />
                <Label htmlFor="returnable">Returnable</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="non-returnable" id="non-returnable" />
                <Label htmlFor="non-returnable">Non-returnable</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralInformation;
