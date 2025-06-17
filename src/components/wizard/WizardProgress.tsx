
import { Check } from "lucide-react";

interface WizardProgressProps {
  currentStep: number;
  totalSteps: number;
}

const WizardProgress = ({ currentStep, totalSteps }: WizardProgressProps) => {
  const steps = [
    {
      number: 1,
      title: "General Information",
      subtitle: "Basic Info + Category + Supplier + Inventory + Product Type"
    },
    {
      number: 2,
      title: "Pricing & Tax",
      subtitle: "All price and tax-related"
    },
    {
      number: 3,
      title: "Description & Media",
      subtitle: "Images + Description + Documents + SEO"
    },
    {
      number: 4,
      title: "Variants",
      subtitle: "Product Type and Variants"
    }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  step.number < currentStep
                    ? "bg-green-500 border-green-500 text-white"
                    : step.number === currentStep
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-gray-200 border-gray-300 text-gray-500"
                }`}
              >
                {step.number < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-semibold">{step.number}</span>
                )}
              </div>
              
              {/* Step Text */}
              <div className="mt-2 text-center max-w-[200px]">
                <div
                  className={`text-sm font-medium ${
                    step.number <= currentStep ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {step.title}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {step.subtitle}
                </div>
              </div>
            </div>
            
            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-4 ${
                  step.number < currentStep ? "bg-green-500" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WizardProgress;
