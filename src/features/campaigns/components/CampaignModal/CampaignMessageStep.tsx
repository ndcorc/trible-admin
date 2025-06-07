// src/features/campaigns/components/CampaignMessageStep/CampaignMessageStep.tsx

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Sparkles, Info, X } from "lucide-react";
import { Button } from "@/components/ui";
import { PhonePreview } from "./PhonePreview";
import type { CampaignMessage } from "../../types";

export interface CampaignMessageStepProps {
  data: CampaignMessage;
  onDataChange: (data: CampaignMessage) => void;
  onNext: () => void;
  onBack: () => void;
  campaignType?: string;
}

const messageSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(300, "Message must be less than 300 characters"),
});

type MessageFormData = z.infer<typeof messageSchema>;

const steps = [
  { number: 1, name: "Campaign basics", isActive: false, isCompleted: true },
  { number: 2, name: "Create message", isActive: true, isCompleted: false },
  {
    number: 3,
    name: "Targeting & delivery",
    isActive: false,
    isCompleted: false,
  },
  { number: 4, name: "Review", isActive: false, isCompleted: false },
];

export function CampaignMessageStep({
  data,
  onDataChange,
  onNext,
  onBack,
  campaignType = "Automated reward: 10% discount after 30 days of inactivity",
}: CampaignMessageStepProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
    defaultValues: data,
    mode: "onChange",
  });

  const watchedTitle = watch("title");
  const watchedMessage = watch("message");

  const onSubmit = (formData: MessageFormData) => {
    onDataChange(formData);
    onNext();
  };

  const handleAISuggestion = (field: "title" | "message") => {
    // Mock AI suggestions - in real implementation, this would call an AI service
    const suggestions = {
      title: [
        "Come back and visit us!",
        "We miss you! Here's a special offer",
        "Your exclusive reward is waiting",
      ],
      message: [
        "We've missed you! Here's 10% off your next purchase. Tap below to redeem your reward",
        "It's been a while! Enjoy 10% off when you visit us again. Click to claim your discount",
        "We'd love to see you again! Get 10% off your next order with this exclusive offer",
      ],
    };

    const randomSuggestion =
      suggestions[field][Math.floor(Math.random() * suggestions[field].length)];
    setValue(field, randomSuggestion, { shouldValidate: true });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Create new campaign
        </h1>
        <Button variant="text" size="sm">
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Steps */}
      <div className="mb-8">
        <div className="flex items-center space-x-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step.isActive
                      ? "bg-primary-600 text-white"
                      : step.isCompleted
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step.number}
                </div>
                <span
                  className={`text-sm font-medium ${
                    step.isActive ? "text-primary-600" : "text-gray-600"
                  }`}
                >
                  {step.name}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="w-12 h-px bg-gray-200 ml-6" />
              )}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 h-1 rounded-full">
            <div
              className="bg-primary-600 h-1 rounded-full transition-all duration-300"
              style={{ width: "50%" }}
            />
          </div>
        </div>
      </div>

      {/* Campaign Type */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">{campaignType}</h2>
      </div>

      {/* Info Message */}
      <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-blue-800">
            Users will receive this custom message when they unlock the reward
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Fields */}
          <div className="space-y-6">
            {/* Title Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <Button
                  type="button"
                  variant="filled-tonal"
                  size="sm"
                  onClick={() => handleAISuggestion("title")}
                  className="text-xs"
                >
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI suggestions
                </Button>
              </div>
              <input
                {...register("title")}
                type="text"
                id="title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter campaign title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Message Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <Button
                  type="button"
                  variant="filled-tonal"
                  size="sm"
                  onClick={() => handleAISuggestion("message")}
                  className="text-xs"
                >
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI suggestions
                </Button>
              </div>
              <textarea
                {...register("message")}
                id="message"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter campaign message"
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.message.message}
                </p>
              )}
            </div>
          </div>

          {/* Phone Preview */}
          <div className="flex justify-center">
            <PhonePreview title={watchedTitle} message={watchedMessage} />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-12">
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
    </div>
  );
}
