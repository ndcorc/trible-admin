import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui";
/* import { CampaignBasicsStep } from "./CampaignBasicsStep";
import { CampaignMessageStep } from "./CampaignMessageStep";
import { CampaignTargetingStep } from "./CampaignTargetingStep";
import { CampaignReviewStep } from "./CampaignReviewStep";
import { CampaignSuccessModal } from "./CampaignSuccessModal"; */
import type {
  CampaignData,
  CampaignModalProps,
  CampaignStep,
} from "../../types/campaign.types";

const defaultCampaignData: CampaignData = {
  basics: {
    name: "",
    objective: "Re-engage dormant users",
    campaignType: "automated",
    rewardType: "% discount",
    rewardTrigger: "After 30 days of inactivity",
  },
  message: {
    title: "",
    message: "",
  },
  targeting: {
    audience: "inactive",
    deliveryMethods: {
      pushNotification: true,
      inAppNotification: false,
      email: false,
    },
    timing: {
      type: "delayed",
      delayTime: "4:00pm",
    },
    deliveryWindow: {
      enabled: true,
      days: ["S", "Th", "F", "Sa", "Su"],
    },
  },
  schedule: {
    startDate: "",
    endDate: "",
  },
  reviewed: false,
};

const steps: { key: CampaignStep; title: string; number: number }[] = [
  { key: "basics", title: "Campaign basics", number: 1 },
  { key: "message", title: "Create message", number: 2 },
  { key: "targeting", title: "Targeting & delivery", number: 3 },
  { key: "review", title: "Review", number: 4 },
];

export function CampaignModal({
  isOpen,
  onClose,
  onSuccess,
}: CampaignModalProps) {
  const [currentStep, setCurrentStep] = useState<CampaignStep>("basics");
  const [campaignData, setCampaignData] =
    useState<CampaignData>(defaultCampaignData);
  const [showSuccess, setShowSuccess] = useState(false);

  const currentStepIndex = steps.findIndex((step) => step.key === currentStep);

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].key);
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].key);
    }
  };

  const handleLaunch = async () => {
    // Here you would integrate with your campaign creation API
    try {
      // await createCampaign(campaignData)
      setShowSuccess(true);
      onSuccess?.();
    } catch (error) {
      console.error("Failed to create campaign:", error);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    onClose();
    // Reset form
    setCampaignData(defaultCampaignData);
    setCurrentStep("basics");
  };

  const updateCampaignData = (updates: Partial<CampaignData>) => {
    setCampaignData((prev) => ({ ...prev, ...updates }));
  };

  if (!isOpen) return null;

  if (showSuccess) {
    return {
      /* <CampaignSuccessModal onClose={handleSuccessClose} />; */
    };
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900">
            Create new campaign
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-8">
            {steps.map((step, index) => (
              <div key={step.key} className="flex items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{step.number}.</span>
                  <span
                    className={`text-sm font-medium ${
                      index <= currentStepIndex
                        ? "text-gray-900"
                        : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index <= currentStepIndex && (
                  <div className="ml-2 h-1 w-16 bg-yellow-400 rounded-full" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* {currentStep === "basics" && (
            <CampaignBasicsStep
              data={campaignData.basics}
              onChange={(basics) => updateCampaignData({ basics })}
            />
          )}
          {currentStep === "message" && (
            <CampaignMessageStep
              data={campaignData.message}
              rewardSummary={`${campaignData.basics.rewardType === "% discount" ? "10% discount" : campaignData.basics.rewardType} ${campaignData.basics.rewardTrigger.toLowerCase()}`}
              onChange={(message) => updateCampaignData({ message })}
            />
          )}
          {currentStep === "targeting" && (
            <CampaignTargetingStep
              data={campaignData.targeting}
              rewardSummary={`${campaignData.basics.rewardType === "% discount" ? "10% discount" : campaignData.basics.rewardType} ${campaignData.basics.rewardTrigger.toLowerCase()}`}
              onChange={(targeting) => updateCampaignData({ targeting })}
            />
          )}
          {currentStep === "review" && (
            <CampaignReviewStep
              data={campaignData}
              onChange={updateCampaignData}
            />
          )} */}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <Button
            variant="filled-tonal"
            onClick={handleBack}
            disabled={currentStepIndex === 0}
          >
            Back
          </Button>

          {currentStep === "review" ? (
            <Button
              onClick={handleLaunch}
              disabled={!campaignData.reviewed}
              className="bg-green-600 hover:bg-green-700"
            >
              Launch
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="bg-primary-600 hover:bg-primary-700"
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
