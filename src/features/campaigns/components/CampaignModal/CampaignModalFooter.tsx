import { Button } from "@/components/ui";
import type { CampaignStep } from "../../types/campaign.types";

interface CampaignModalFooterProps {
  currentStep: CampaignStep;
  currentStepIndex: number;
  canProceed: boolean;
  loading: boolean;
  onBack: () => void;
  onNext: () => void;
}

export function CampaignModalFooter({
  currentStep,
  currentStepIndex,
  canProceed,
  loading,
  onBack,
  onNext,
}: CampaignModalFooterProps) {
  console.log("currentStepIndex", currentStepIndex);
  console.log("currentStep", currentStep);
  console.log("canProceed", canProceed);

  return (
    <div className="flex items-center justify-between p-6">
      {currentStepIndex > 0 ? (
        <Button
          variant="filled-tonal"
          onClick={onBack}
          disabled={currentStepIndex === 0 || loading}
        >
          Back
        </Button>
      ) : (
        <div></div>
      )}

      <Button
        onClick={onNext}
        /* disabled={!canProceed || loading} */
        variant="filled"
        className="px-12 text-md"
      >
        Next
      </Button>
    </div>
  );
}
