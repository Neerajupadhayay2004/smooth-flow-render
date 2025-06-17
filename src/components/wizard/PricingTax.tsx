
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { HelpCircle, Calendar } from "lucide-react";
import { ProductFormData } from "../ProductWizard";

interface PricingTaxProps {
  formData: ProductFormData;
  updateFormData: (data: Partial<ProductFormData>) => void;
}

const PricingTax = ({ formData, updateFormData }: PricingTaxProps) => {
  return (
    <div className="space-y-8">
      {/* Basic Pricing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="purchasePrice">Purchase Price</Label>
          <Input
            id="purchasePrice"
            placeholder="Enter New Product Name"
            value={formData.purchasePrice}
            onChange={(e) => updateFormData({ purchasePrice: e.target.value })}
          />
        </div>
        
        <div>
          <Label htmlFor="sellingPrice">Selling Price</Label>
          <Input
            id="sellingPrice"
            placeholder="Enter SKU"
            value={formData.sellingPrice}
            onChange={(e) => updateFormData({ sellingPrice: e.target.value })}
          />
        </div>
      </div>

      {/* Wholesale Price */}
      <div>
        <Label>Wholesale Price / Bulk Price</Label>
        <Select value={formData.wholesalePrice} onValueChange={(value) => updateFormData({ wholesalePrice: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tier1">Tier 1 Pricing</SelectItem>
            <SelectItem value="tier2">Tier 2 Pricing</SelectItem>
            <SelectItem value="tier3">Tier 3 Pricing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Quantity and Unit */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            placeholder="In Kg"
            value={formData.quantity}
            onChange={(e) => updateFormData({ quantity: e.target.value })}
          />
        </div>
        
        <div>
          <Label>Unit</Label>
          <Select value={formData.unit} onValueChange={(value) => updateFormData({ unit: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kg">Kilogram (kg)</SelectItem>
              <SelectItem value="g">Gram (g)</SelectItem>
              <SelectItem value="piece">Piece</SelectItem>
              <SelectItem value="liter">Liter</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      {/* Discount Pricing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Label>Discount Price</Label>
            <HelpCircle className="w-4 h-4 text-gray-400" />
          </div>
          <Select value={formData.discountPrice} onValueChange={(value) => updateFormData({ discountPrice: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5% Discount</SelectItem>
              <SelectItem value="10">10% Discount</SelectItem>
              <SelectItem value="15">15% Discount</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Label>Discount Period</Label>
            <HelpCircle className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                placeholder="From"
                value={formData.discountPeriod.from}
                onChange={(e) => updateFormData({
                  discountPeriod: { ...formData.discountPeriod, from: e.target.value }
                })}
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <div className="relative flex-1">
              <Input
                placeholder="To"
                value={formData.discountPeriod.to}
                onChange={(e) => updateFormData({
                  discountPeriod: { ...formData.discountPeriod, to: e.target.value }
                })}
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Tax Information */}
      <div>
        <Label>Tax Rate</Label>
        <Select value={formData.taxRate} onValueChange={(value) => updateFormData({ taxRate: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">0% Tax</SelectItem>
            <SelectItem value="5">5% Tax</SelectItem>
            <SelectItem value="12">12% Tax</SelectItem>
            <SelectItem value="18">18% Tax</SelectItem>
            <SelectItem value="28">28% Tax</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* HSN/SAC */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Label>HSN / SAC</Label>
          <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>
        <Select value={formData.hsnSac} onValueChange={(value) => updateFormData({ hsnSac: value })}>
          <SelectTrigger>
            <SelectValue placeholder="HSN Code" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="8517">8517 - Telephone sets</SelectItem>
            <SelectItem value="8471">8471 - Computers</SelectItem>
            <SelectItem value="6204">6204 - Women's clothing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* GST Settings */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Label>Price Include GST</Label>
            <HelpCircle className="w-4 h-4 text-gray-400" />
          </div>
          <Switch
            checked={formData.priceIncludeGst}
            onCheckedChange={(checked) => updateFormData({ priceIncludeGst: checked })}
          />
        </div>

        {formData.priceIncludeGst && (
          <div>
            <Label>GST Rate</Label>
            <Select value={formData.gstRate} onValueChange={(value) => updateFormData({ gstRate: value })}>
              <SelectTrigger>
                <SelectValue placeholder="5%" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0%</SelectItem>
                <SelectItem value="5">5%</SelectItem>
                <SelectItem value="12">12%</SelectItem>
                <SelectItem value="18">18%</SelectItem>
                <SelectItem value="28">28%</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingTax;
