// src/features/campaigns/components/CampaignTargetingStep/CampaignTargetingStep.tsx

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui";
import { AudienceSelector } from "./AudienceSelector";
import { DeliveryMethodSelector } from "./DeliveryMethodSelector";
import { TimingSelector } from "./TimingSelector";
import { DeliveryWindowSelector } from "./DeliveryWindowSelector";
import type {
  CampaignTargetingStepProps,
  CampaignTargetingData,
} from "../../types/campaign.types";
import {
  campaignTargetingSchema,
  type CampaignTargetingFormData,
} from "../../schemas/campaign.schemas";

export function CampaignTargetingStep({
  data,
  onDataChange,
  onNext,
  onBack,
}: CampaignTargetingStepProps) {
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<CampaignTargetingFormData>({
    resolver: zodResolver(campaignTargetingSchema),
    defaultValues: data,
    mode: "onChange",
  });

  const onSubmit = (formData: CampaignTargetingFormData) => {
    onDataChange(formData);
    onNext();
  };

  // Update parent when form data changes
  React.useEffect(() => {
    const subscription = watch((value) => {
      if (value && Object.keys(value).length > 0) {
        onDataChange(value as CampaignTargetingData);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, onDataChange]);

  const handleAudienceChange = (
    audience: CampaignTargetingData["audience"]
  ) => {
    setValue("audience", audience);
  };

  const handleDeliveryMethodsChange = (
    deliveryMethods: CampaignTargetingData["deliveryMethods"]
  ) => {
    setValue("deliveryMethods", deliveryMethods);
  };

  const handleTimingChange = (timing: CampaignTargetingData["timing"]) => {
    setValue("timing", timing);
  };

  const handleDeliveryWindowChange = (
    deliveryWindow: CampaignTargetingData["deliveryWindow"]
  ) => {
    setValue("deliveryWindow", deliveryWindow);
  };

  const watchedData = watch();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-2">
          Automated reward: 10% discount after 30 days of inactivity
        </h2>
      </div>

      {/* Form Errors */}
      {errors.deliveryMethods && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-sm text-red-600">
            {errors.deliveryMethods.message}
          </p>
        </div>
      )}
      {errors.deliveryWindow && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-sm text-red-600">
            {errors.deliveryWindow.message}
          </p>
        </div>
      )}

      {/* Audience Selection */}
      <AudienceSelector
        selectedAudience={watchedData.audience}
        onAudienceChange={handleAudienceChange}
      />

      {/* Delivery Method Selection */}
      <DeliveryMethodSelector
        deliveryMethods={watchedData.deliveryMethods}
        onDeliveryMethodsChange={handleDeliveryMethodsChange}
      />

      {/* Timing Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TimingSelector
          timing={watchedData.timing}
          onTimingChange={handleTimingChange}
        />

        <DeliveryWindowSelector
          deliveryWindow={watchedData.deliveryWindow}
          onDeliveryWindowChange={handleDeliveryWindowChange}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between pt-6">
        <Button
          type="button"
          variant="filled-tonal"
          onClick={onBack}
          className="px-8"
        >
          Back
        </Button>

        <Button type="submit" disabled={!isValid} className="px-8">
          Next
        </Button>
      </div>
    </form>
  );
}
