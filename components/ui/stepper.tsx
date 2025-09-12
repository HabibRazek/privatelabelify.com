'use client';

interface StepperProps {
  currentStep: number;
  totalSteps: number;
}

export function Stepper({ currentStep, totalSteps }: StepperProps) {
  return (
    <div className="w-full bg-white px-4 py-3">
      <div className="max-w-md mx-auto">
        <div className="flex items-center">
          {Array.from({ length: totalSteps }, (_, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber <= currentStep;

            return (
              <div key={index} className="flex items-center flex-1">
                {/* Progress Bar */}
                <div
                  className={`h-1 flex-1 rounded-full ${
                    isActive ? 'bg-blue-800' : 'bg-gray-200'
                  }`}
                />
                {/* Spacing between bars */}
                {index < totalSteps - 1 && <div className="w-2" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
