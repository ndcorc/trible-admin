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
    <div className="px-6 py-4">
      <div className="flex px-2">
        {steps.map((step, index) => {
          const isActive = step.key === currentStep;
          const isCompleted =
            completedSteps.has(step.key) || isStepValid(step.key);
          const isPastStep = index < currentStepIndex;

          return (
            <div
              key={step.key}
              className={`flex-1 flex items-center justify-start ${index > 0 && "ml-8"}`}
            >
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
            </div>
          );
        })}
      </div>

      {/* Horizontal progress bar */}
      <div className="mt-1 w-full">
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-yellow-400 rounded-full transition-all duration-300 ease-in-out"
            style={{
              width: `${((currentStepIndex + 1) / steps.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
