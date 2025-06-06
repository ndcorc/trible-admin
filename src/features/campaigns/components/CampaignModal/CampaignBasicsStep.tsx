import { ChevronDown, Info, Lightbulb } from "lucide-react";
import type { CampaignBasics } from "../../types/campaign.types";

interface CampaignBasicsStepProps {
  data: CampaignBasics;
  onChange: (data: CampaignBasics) => void;
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
}: CampaignBasicsStepProps) {
  const handleChange = (field: keyof CampaignBasics, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const selectedObjective = objectives.find(
    (obj) => obj.value === data.objective
  );

  return (
    <div className="space-y-6">
      {/* Campaign Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Campaign name
        </label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Main Street's new promo"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      {/* Objective */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Objective
        </label>
        <div className="relative">
          <select
            value={data.objective}
            onChange={(e) => handleChange("objective", e.target.value)}
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
            onClick={() => handleChange("campaignType", "automated")}
            className={`px-6 py-3 rounded-md border text-sm font-medium transition-colors ${
              data.campaignType === "automated"
                ? "bg-primary-600 text-white border-primary-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Automated
          </button>
          <button
            onClick={() => handleChange("campaignType", "custom")}
            className={`px-6 py-3 rounded-md border text-sm font-medium transition-colors ${
              data.campaignType === "custom"
                ? "bg-primary-600 text-white border-primary-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Custom
          </button>
        </div>
      </div>

      {/* Automated Reward Type and Trigger (only show if automated) */}
      {data.campaignType === "automated" && (
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
                value={data.rewardType}
                onChange={(e) => handleChange("rewardType", e.target.value)}
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
                value={data.rewardTrigger}
                onChange={(e) => handleChange("rewardTrigger", e.target.value)}
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
          </div>
        </div>
      )}
    </div>
  );
}
