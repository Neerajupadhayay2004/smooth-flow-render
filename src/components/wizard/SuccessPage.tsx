
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface SuccessPageProps {
  onAddMore: () => void;
  onGoBack: () => void;
}

const SuccessPage = ({ onAddMore, onGoBack }: SuccessPageProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <CheckCircle className="w-16 h-16 text-green-500 mb-6" />
      
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        The product has been successfully added.
      </h2>
      
      <p className="text-gray-600 mb-8 max-w-md">
        Your product has been created and is now available in your inventory. You can view it in the products list or add more products.
      </p>
      
      <Button 
        onClick={onAddMore}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        + Add More Product
      </Button>
      
      <Button 
        variant="link" 
        onClick={onGoBack}
        className="mt-4 text-gray-600"
      >
        Back to Products
      </Button>
    </div>
  );
};

export default SuccessPage;
