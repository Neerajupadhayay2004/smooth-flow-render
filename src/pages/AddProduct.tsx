
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import ProductWizard from "@/components/ProductWizard";

const AddProduct = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 w-full">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header title="Add New Product" showAddButton={false} />
        
        <div className="flex-1 p-6">
          <ProductWizard />
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
