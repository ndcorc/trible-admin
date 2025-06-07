import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui";
import {
  Check,
  Edit2,
  Calendar,
  MessageSquare,
  Target,
  FileText,
} from "lucide-react";
import type { CampaignData } from "../../types/campaign.types";

interface CampaignReviewStepProps {
  data: CampaignData;
  onLaunch: () => void;
  onEdit: (step: "basics" | "message" | "targeting") => void;
  onBack: () => void;
  isLoading?: boolean;
}

const reviewSchema = z.object({
  reviewed: z
    .boolean()
    .refine(
      (val) => val === true,
      "Please review and confirm all campaign details"
    ),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

export function CampaignReviewStep({
  data,
  onLaunch,
  onEdit,
  onBack,
  isLoading = false,
}: CampaignReviewStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { reviewed: data.reviewed },
    mode: "onChange",
  });

  const onSubmit = handleSubmit(() => {
    onLaunch();
  });

  const formatDeliveryMethods = (
    methods: typeof data.targeting.deliveryMethods
  ) => {
    const enabled = Object.entries(methods)
      .filter(([, isEnabled]) => isEnabled)
      .map(([method]) => {
        switch (method) {
          case "pushNotification":
            return "Push notification";
          case "inAppNotification":
            return "In-app notification";
          case "email":
            return "Email";
          default:
            return method;
        }
      });
    return enabled.join(", ");
  };

  const formatDays = (days: string[]) => {
    const dayMap: Record<string, string> = {
      SU: "Sunday",
      M: "Monday",
      T: "Tuesday",
      W: "Wednesday",
      TH: "Thursday",
      F: "Friday",
      SA: "Saturday",
      S: "Sunday",
      Th: "Thursday",
      Sa: "Saturday",
    };

    return days.map((day) => dayMap[day] || day).join(", ");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Review Campaign
        </h2>
        <p className="text-gray-600">
          Please review all campaign details before launching. You can edit any
          section if needed.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Campaign Basics */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Campaign Basics
              </h3>
            </div>
            <Button
              type="button"
              variant="text"
              size="sm"
              onClick={() => onEdit("basics")}
              className="text-primary-600 hover:text-primary-700"
            >
              <Edit2 className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </div>

          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">
                Campaign Name
              </dt>
              <dd className="text-sm text-gray-900">{data.basics.name}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Objective</dt>
              <dd className="text-sm text-gray-900">{data.basics.objective}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">
                Campaign Type
              </dt>
              <dd className="text-sm text-gray-900 capitalize">
                {data.basics.campaignType}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Reward Type</dt>
              <dd className="text-sm text-gray-900">
                {data.basics.rewardType}
              </dd>
            </div>
            {data.basics.campaignType === "automated" && (
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Reward Trigger
                </dt>
                <dd className="text-sm text-gray-900">
                  {data.basics.rewardTrigger}
                </dd>
              </div>
            )}
          </dl>
        </div>

        {/* Campaign Message */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-primary-600" />
              <h3 className="text-lg font-semibold text-gray-900">Message</h3>
            </div>
            <Button
              type="button"
              variant="text"
              size="sm"
              onClick={() => onEdit("message")}
              className="text-primary-600 hover:text-primary-700"
            >
              <Edit2 className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </div>

          <dl className="space-y-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Title</dt>
              <dd className="text-sm text-gray-900">{data.message.title}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Message</dt>
              <dd className="text-sm text-gray-900">{data.message.message}</dd>
            </div>
          </dl>
        </div>

        {/* Campaign Targeting */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-primary-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Targeting & Delivery
              </h3>
            </div>
            <Button
              type="button"
              variant="text"
              size="sm"
              onClick={() => onEdit("targeting")}
              className="text-primary-600 hover:text-primary-700"
            >
              <Edit2 className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </div>

          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Audience</dt>
              <dd className="text-sm text-gray-900 capitalize">
                {data.targeting.audience}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">
                Delivery Methods
              </dt>
              <dd className="text-sm text-gray-900">
                {formatDeliveryMethods(data.targeting.deliveryMethods)}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Timing</dt>
              <dd className="text-sm text-gray-900">
                {data.targeting.timing.type === "immediate"
                  ? "Immediate"
                  : `Delayed - ${data.targeting.timing.delayTime}`}
              </dd>
            </div>
            {data.targeting.deliveryWindow.enabled && (
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Delivery Days
                </dt>
                <dd className="text-sm text-gray-900">
                  {formatDays(data.targeting.deliveryWindow.days)}
                </dd>
              </div>
            )}
          </dl>
        </div>

        {/* Schedule */}
        {data.schedule.startDate && data.schedule.endDate && (
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="h-5 w-5 text-primary-600" />
              <h3 className="text-lg font-semibold text-gray-900">Schedule</h3>
            </div>

            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Start Date
                </dt>
                <dd className="text-sm text-gray-900">
                  {data.schedule.startDate}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">End Date</dt>
                <dd className="text-sm text-gray-900">
                  {data.schedule.endDate}
                </dd>
              </div>
            </dl>
          </div>
        )}

        {/* Confirmation */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <input
              {...register("reviewed")}
              type="checkbox"
              className="mt-0.5 h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-900">
                I have reviewed all campaign details and confirm they are
                correct
              </label>
              {errors.reviewed && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.reviewed.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-6 border-t">
          <Button
            type="button"
            variant="filled-tonal"
            onClick={onBack}
            disabled={isLoading}
          >
            Back
          </Button>

          <Button
            type="submit"
            disabled={!isValid || isLoading}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Launching...
              </>
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                Launch Campaign
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
