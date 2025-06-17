
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import ProductWizard from "@/components/ProductWizard";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const AddProduct = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/")}
              className="p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Add New Products</h1>
          </div>
        </div>

        {/* Wizard Content */}
        <div className="p-6">
          <ProductWizard />
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
