import type { CampaignStep } from "../../types/campaign.types";

interface CampaignModalProgressStepsProps {
  currentStep: CampaignStep;
  completedSteps: Set<CampaignStep>;
  isStepValid: (step: CampaignStep) => boolean;
  onEditStep: (step: CampaignStep) => void;
}

const steps: { key: CampaignStep; title: string; number: number }[] = [
  { key: "basics", title: "Campaign basics", number: 1 },
  { key: "message", title: "Create message", number: 2 },
  { key: "targeting", title: "Targeting & delivery", number: 3 },
  { key: "review", title: "Review", number: 4 },
];

export function CampaignModalProgressSteps({
  currentStep,
  completedSteps,
  isStepValid,
  onEditStep,
}: CampaignModalProgressStepsProps) {
  const currentStepIndex = steps.findIndex((step) => step.key === currentStep);

  return (
    <div className="px-6 py-4 border-b border-gray-200">
      <div className="flex items-center space-x-8">
        {steps.map((step, index) => {
          const isActive = step.key === currentStep;
          const isCompleted =
            completedSteps.has(step.key) || isStepValid(step.key);
          const isPastStep = index < currentStepIndex;

          return (
            <div key={step.key} className="flex items-center">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{step.number}.</span>
                <span
                  className={`text-sm font-medium cursor-pointer ${
                    isActive
                      ? "text-primary-600"
                      : isCompleted || isPastStep
                        ? "text-gray-900 hover:text-primary-600"
                        : "text-gray-400"
                  }`}
                  onClick={() =>
                    (isCompleted || isPastStep) && onEditStep(step.key)
                  }
                >
                  {step.title}
                </span>
              </div>
              {(isActive || isCompleted || isPastStep) && (
                <div
                  className={`ml-2 h-1 w-16 rounded-full ${
                    isCompleted ? "bg-green-400" : "bg-yellow-400"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
