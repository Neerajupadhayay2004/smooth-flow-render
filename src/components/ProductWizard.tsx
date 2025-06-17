
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import WizardProgress from "./wizard/WizardProgress";
import GeneralInformation from "./wizard/GeneralInformation";
import PricingTax from "./wizard/PricingTax";
import DescriptionMedia from "./wizard/DescriptionMedia";
import Variants from "./wizard/Variants";
import SuccessPage from "./wizard/SuccessPage";
import { productService } from "@/services/productService";

export interface ProductFormData {
  // General Information
  itemType: "goods" | "services";
  productName: string;
  sku: string;
  barcode: string;
  ean: string;
  category: string;
  subCategory: string;
  brand: string;
  productType: "simple" | "variant" | "bundle";
  supplier: string;
  supplierSku: string;
  warehouse: string;
  leadTime: string;
  reorderLevel: string;
  initialStock: string;
  track: "serial" | "batch";
  status: "returnable" | "non-returnable";
  
  // Pricing & Tax
  purchasePrice: string;
  sellingPrice: string;
  wholesalePrice: string;
  quantity: string;
  unit: string;
  discountPrice: string;
  discountPeriod: { from: string; to: string };
  taxRate: string;
  hsnSac: string;
  priceIncludeGst: boolean;
  gstRate: string;
  
  // Description & Media
  description: string;
  images: File[];
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  
  // Variants
  variants: Array<{
    id: string;
    color: string;
    size: string;
    material: string;
    weight: string;
    sku: string;
    price: string;
    stock: string;
  }>;
}

const ProductWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    itemType: "goods",
    productName: "",
    sku: "",
    barcode: "",
    ean: "",
    category: "",
    subCategory: "",
    brand: "",
    productType: "simple",
    supplier: "",
    supplierSku: "",
    warehouse: "",
    leadTime: "",
    reorderLevel: "",
    initialStock: "",
    track: "serial",
    status: "returnable",
    purchasePrice: "",
    sellingPrice: "",
    wholesalePrice: "",
    quantity: "",
    unit: "",
    discountPrice: "",
    discountPeriod: { from: "", to: "" },
    taxRate: "",
    hsnSac: "",
    priceIncludeGst: false,
    gstRate: "",
    description: "",
    images: [],
    seoTitle: "",
    seoDescription: "",
    keywords: [],
    variants: []
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const updateFormData = (data: Partial<ProductFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.productName.trim()) {
          toast({
            title: "Validation Error",
            description: "Product name is required.",
            variant: "destructive",
          });
          return false;
        }
        if (!formData.category) {
          toast({
            title: "Validation Error",
            description: "Category is required.",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 2:
        if (!formData.sellingPrice || parseFloat(formData.sellingPrice) <= 0) {
          toast({
            title: "Validation Error",
            description: "Valid selling price is required.",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 3:
        if (!formData.description.trim()) {
          toast({
            title: "Validation Error",
            description: "Product description is required.",
            variant: "destructive",
          });
          return false;
        }
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = async () => {
    if (!validateStep(currentStep)) {
      return;
    }

    setIsLoading(true);
    try {
      // Generate SKU if not provided
      if (!formData.sku) {
        const generatedSku = productService.generateSKU(formData.category, formData.productName);
        setFormData(prev => ({ ...prev, sku: generatedSku }));
      }

      const savedProduct = productService.saveProduct(formData);
      console.log("Product saved successfully:", savedProduct);
      
      setCurrentStep(5); // Show success page
      toast({
        title: "Success!",
        description: "Product has been saved successfully.",
      });
    } catch (error) {
      console.error("Error saving product:", error);
      toast({
        title: "Error",
        description: "Failed to save product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveAsDraft = async () => {
    setIsLoading(true);
    try {
      // In a real app, you might save to a different table or add a status field
      console.log("Saving as draft:", formData);
      
      toast({
        title: "Draft Saved",
        description: "Your product has been saved as a draft.",
      });
    } catch (error) {
      console.error("Error saving draft:", error);
      toast({
        title: "Error",
        description: "Failed to save draft. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      itemType: "goods",
      productName: "",
      sku: "",
      barcode: "",
      ean: "",
      category: "",
      subCategory: "",
      brand: "",
      productType: "simple",
      supplier: "",
      supplierSku: "",
      warehouse: "",
      leadTime: "",
      reorderLevel: "",
      initialStock: "",
      track: "serial",
      status: "returnable",
      purchasePrice: "",
      sellingPrice: "",
      wholesalePrice: "",
      quantity: "",
      unit: "",
      discountPrice: "",
      discountPeriod: { from: "", to: "" },
      taxRate: "",
      hsnSac: "",
      priceIncludeGst: false,
      gstRate: "",
      description: "",
      images: [],
      seoTitle: "",
      seoDescription: "",
      keywords: [],
      variants: []
    });
    setCurrentStep(1);
  };

  if (currentStep === 5) {
    return <SuccessPage onAddMore={resetForm} onGoBack={() => navigate("/")} />;
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <GeneralInformation formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <PricingTax formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <DescriptionMedia formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <Variants formData={formData} updateFormData={updateFormData} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <WizardProgress currentStep={currentStep} totalSteps={4} />
      
      <Card className="mt-6">
        <CardContent className="p-6">
          {renderStepContent()}
          
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1 || isLoading}
            >
              Previous
            </Button>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleSaveAsDraft}
                disabled={isLoading}
              >
                Save as draft
              </Button>
              
              {currentStep === 4 ? (
                <Button 
                  onClick={handleSave} 
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? "Saving..." : "Save"}
                </Button>
              ) : (
                <Button 
                  onClick={handleNext} 
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductWizard;
