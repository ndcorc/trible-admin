import { useState } from "react";
import { X } from "lucide-react";
import { CampaignBasicsStep } from "./CampaignBasicsStep";
import { CampaignMessageStep } from "./CampaignMessageStep";
import { CampaignTargetingStep } from "../CampaignTargetingStep";
import { CampaignReviewStep } from "./CampaignReviewStep";
import { CampaignSuccessModal } from "./CampaignSuccessModal";
import { CampaignModalProgressSteps } from "./CampaignModalProgressSteps";
import { CampaignModalFooter } from "./CampaignModalFooter";
import type { CampaignStep } from "../../types/campaign.types";
import { useCampaignStore } from "../../stores/campaignStore";

export interface CampaignModalProps {
  onSuccess?: () => void;
}

export function CampaignModal({ onSuccess }: CampaignModalProps = {}) {
  const {
    isCreateModalOpen,
    currentStep,
    campaignData,
    loading,
    error,
    closeCreateModal,
    setCurrentStep,
    updateCampaignData,
    createCampaign,
  } = useCampaignStore();

  const [showSuccess, setShowSuccess] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<CampaignStep>>(
    new Set()
  );

  // Define step order for navigation
  const stepOrder: CampaignStep[] = [
    "basics",
    "message",
    "targeting",
    "review",
  ];
  const currentStepIndex = stepOrder.findIndex((step) => step === currentStep);

  const handleNext = () => {
    // Mark current step as completed
    setCompletedSteps((prev) => new Set([...prev, currentStep]));

    const nextIndex = currentStepIndex + 1;
    if (nextIndex < stepOrder.length) {
      setCurrentStep(stepOrder[nextIndex]);
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(stepOrder[prevIndex]);
    }
  };

  const handleEditStep = (step: CampaignStep) => {
    setCurrentStep(step);
  };

  const handleLaunch = async () => {
    try {
      await createCampaign(campaignData);
      setShowSuccess(true);
      onSuccess?.();
    } catch (error) {
      console.error("Failed to create campaign:", error);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    closeCreateModal();
    setCompletedSteps(new Set());
  };

  const handleClose = () => {
    closeCreateModal();
    setCompletedSteps(new Set());
  };

  // Validate step completion
  const isStepValid = (stepKey: CampaignStep): boolean => {
    switch (stepKey) {
      case "basics":
        return !!(
          campaignData.basics.name &&
          campaignData.basics.objective &&
          campaignData.basics.campaignType &&
          (campaignData.basics.campaignType === "custom" ||
            (campaignData.basics.rewardType &&
              campaignData.basics.rewardTrigger))
        );
      case "message":
        return !!(campaignData.message.title && campaignData.message.message);
      case "targeting":
        const hasDeliveryMethod = Object.values(
          campaignData.targeting.deliveryMethods
        ).some(Boolean);
        const isDeliveryWindowValid =
          !campaignData.targeting.deliveryWindow.enabled ||
          campaignData.targeting.deliveryWindow.days.length > 0;
        return hasDeliveryMethod && isDeliveryWindowValid;
      case "review":
        return campaignData.reviewed;
      default:
        return false;
    }
  };

  const canProceed = isStepValid(currentStep);

  if (!isCreateModalOpen) return null;

  if (showSuccess) {
    return (
      <CampaignSuccessModal
        onClose={handleSuccessClose}
        campaignName={campaignData.basics.name}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between pt-6 px-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Create new campaign
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Progress Steps */}
        <CampaignModalProgressSteps
          currentStep={currentStep}
          completedSteps={completedSteps}
          isStepValid={isStepValid}
          onEditStep={handleEditStep}
        />

        {/* Error Display */}
        {error && (
          <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-hidden max-h-[60vh]">
          {currentStep === "basics" && (
            <CampaignBasicsStep
              data={campaignData.basics}
              onChange={(basics) => updateCampaignData({ basics })}
              onNext={handleNext}
            />
          )}
          {currentStep === "message" && (
            <CampaignMessageStep
              data={campaignData.message}
              onDataChange={(message) => updateCampaignData({ message })}
              onNext={handleNext}
              onBack={handleBack}
              campaignType={`${
                campaignData.basics.campaignType === "automated"
                  ? `Automated reward: ${campaignData.basics.rewardType} ${campaignData.basics.rewardTrigger?.toLowerCase()}`
                  : "Custom campaign"
              }`}
            />
          )}
          {currentStep === "targeting" && (
            <CampaignTargetingStep
              data={campaignData.targeting}
              onDataChange={(targeting) => updateCampaignData({ targeting })}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === "review" && (
            <CampaignReviewStep
              data={campaignData}
              onLaunch={handleLaunch}
              onEdit={handleEditStep}
              onBack={handleBack}
              isLoading={loading}
            />
          )}
        </div>

        {/* Footer */}
        <CampaignModalFooter
          currentStep={currentStep}
          currentStepIndex={currentStepIndex}
          canProceed={canProceed}
          loading={loading}
          onBack={handleBack}
          onNext={handleNext}
        />
      </div>
    </div>
  );
}
