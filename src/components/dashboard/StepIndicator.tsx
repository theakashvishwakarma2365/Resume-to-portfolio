import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex items-center">
              {/* Step Circle */}
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
                ${currentStep > step.id 
                  ? 'bg-green-500 border-green-500 text-white' 
                  : currentStep === step.id 
                    ? 'bg-blue-500 border-blue-500 text-white' 
                    : 'bg-transparent border-gray-400 text-gray-400'
                }
              `}>
                {currentStep > step.id ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-semibold">{step.id}</span>
                )}
              </div>
              
              {/* Step Info */}
              <div className="ml-4 flex-1">
                <h3 className={`font-semibold transition-colors ${
                  currentStep >= step.id ? 'text-white' : 'text-gray-400'
                }`}>
                  {step.title}
                </h3>
                <p className={`text-sm transition-colors ${
                  currentStep >= step.id ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  {step.description}
                </p>
              </div>
            </div>
            
            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className={`
                hidden lg:block w-full h-0.5 mx-4 transition-colors
                ${currentStep > step.id ? 'bg-green-500' : 'bg-gray-600'}
              `} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;