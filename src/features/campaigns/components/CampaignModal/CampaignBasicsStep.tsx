import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Info, Lightbulb } from "lucide-react";
import type { CampaignBasics } from "../../types/campaign.types";
import {
  campaignBasicsSchema,
  type CampaignBasicsFormData,
} from "../../schemas/campaign.schemas";

interface CampaignBasicsStepProps {
  data: CampaignBasics;
  onChange: (data: CampaignBasics) => void;
  onNext?: () => void;
}

const objectives = [
  {
    value: "Re-engage dormant users",
    label: "Re-engage dormant users",
    suggestion: "After 30 days of inactivity",
  },
  {
    value: "Increase visit frequency",
    label: "Increase visit frequency",
    suggestion: "After 7 days of inactivity",
  },
  {
    value: "Reward loyal customers",
    label: "Reward loyal customers",
    suggestion: "After 5 visits",
  },
  {
    value: "First-time visitor welcome",
    label: "First-time visitor welcome",
    suggestion: "Immediately after first visit",
  },
];

const rewardTypes = [
  { value: "% discount", label: "% discount" },
  { value: "Fixed amount discount", label: "Fixed amount discount" },
  { value: "Free item", label: "Free item" },
  { value: "Buy one get one", label: "Buy one get one" },
];

const rewardTriggers = [
  {
    value: "After 30 days of inactivity",
    label: "After 30 days of inactivity",
  },
  { value: "After 7 days of inactivity", label: "After 7 days of inactivity" },
  {
    value: "After 14 days of inactivity",
    label: "After 14 days of inactivity",
  },
  {
    value: "Immediately after first visit",
    label: "Immediately after first visit",
  },
  { value: "After 5 visits", label: "After 5 visits" },
];

export function CampaignBasicsStep({
  data,
  onChange,
  onNext,
}: CampaignBasicsStepProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CampaignBasicsFormData>({
    resolver: zodResolver(campaignBasicsSchema),
    defaultValues: data,
    mode: "onChange",
  });

  const watchedObjective = watch("objective");
  const watchedCampaignType = watch("campaignType");

  const selectedObjective = objectives.find(
    (obj) => obj.value === watchedObjective
  );

  const onSubmit = (formData: CampaignBasicsFormData) => {
    onChange(formData);
    onNext?.();
  };

  // Update parent when form data changes
  React.useEffect(() => {
    const subscription = watch((value) => {
      if (value && Object.keys(value).length > 0) {
        onChange(value as CampaignBasics);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  const handleCampaignTypeChange = (type: "automated" | "custom") => {
    setValue("campaignType", type);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Campaign Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Campaign name
        </label>
        <input
          {...register("name")}
          type="text"
          placeholder="Main Street's new promo"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Objective */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Objective
        </label>
        <div className="relative">
          <select
            {...register("objective")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
          >
            {objectives.map((objective) => (
              <option key={objective.value} value={objective.value}>
                {objective.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
        {selectedObjective?.suggestion && (
          <div className="mt-2 flex items-center space-x-2 text-sm text-gray-500">
            <Lightbulb className="h-4 w-4 text-yellow-500" />
            <span>Suggested: {selectedObjective.suggestion}</span>
          </div>
        )}
        {errors.objective && (
          <p className="mt-1 text-sm text-red-600">
            {errors.objective.message}
          </p>
        )}
      </div>

      {/* Campaign Type */}
      <div>
        <div className="flex items-center space-x-2 mb-3">
          <label className="text-sm font-medium text-gray-700">
            Campaign type
          </label>
          <Info className="h-4 w-4 text-gray-400" />
        </div>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => handleCampaignTypeChange("automated")}
            className={`px-6 py-3 rounded-md border text-sm font-medium transition-colors ${
              watchedCampaignType === "automated"
                ? "bg-primary-600 text-white border-primary-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Automated
          </button>
          <button
            type="button"
            onClick={() => handleCampaignTypeChange("custom")}
            className={`px-6 py-3 rounded-md border text-sm font-medium transition-colors ${
              watchedCampaignType === "custom"
                ? "bg-primary-600 text-white border-primary-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Custom
          </button>
        </div>
        <input {...register("campaignType")} type="hidden" />
      </div>

      {/* Automated Reward Type and Trigger (only show if automated) */}
      {watchedCampaignType === "automated" && (
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <label className="text-sm font-medium text-gray-700">
                Automated reward type
              </label>
              <Info className="h-4 w-4 text-gray-400" />
            </div>
            <div className="relative">
              <select
                {...register("rewardType")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
              >
                {rewardTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            {errors.rewardType && (
              <p className="mt-1 text-sm text-red-600">
                {errors.rewardType.message}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-2">
              <label className="text-sm font-medium text-gray-700">
                Reward trigger
              </label>
              <Info className="h-4 w-4 text-gray-400" />
            </div>
            <div className="relative">
              <select
                {...register("rewardTrigger")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
              >
                {rewardTriggers.map((trigger) => (
                  <option key={trigger.value} value={trigger.value}>
                    {trigger.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            {errors.rewardTrigger && (
              <p className="mt-1 text-sm text-red-600">
                {errors.rewardTrigger.message}
              </p>
            )}
          </div>
        </div>
      )}
    </form>
  );
}
