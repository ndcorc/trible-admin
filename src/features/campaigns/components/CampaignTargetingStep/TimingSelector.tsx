// src/features/campaigns/components/CampaignTargetingStep/TimingSelector.tsx

interface TimingData {
  type: "immediate" | "delayed";
  delayTime?: string;
}

interface TimingSelectorProps {
  timing: TimingData;
  onTimingChange: (timing: TimingData) => void;
}

export function TimingSelector({
  timing,
  onTimingChange,
}: TimingSelectorProps) {
  const handleTypeChange = (type: "immediate" | "delayed") => {
    onTimingChange({
      type,
      delayTime: type === "delayed" ? timing.delayTime || "4:00pm" : undefined,
    });
  };

  const handleTimeChange = (delayTime: string) => {
    onTimingChange({
      ...timing,
      delayTime,
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-medium text-gray-900 mb-2">Timing</h3>
        <p className="text-sm text-gray-600 mb-4">
          When should users receive this reward?
        </p>
      </div>

      <div className="space-y-3">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="radio"
            name="timing"
            value="immediate"
            checked={timing.type === "immediate"}
            onChange={() => handleTypeChange("immediate")}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
          />
          <span className="text-sm text-gray-900">
            Immediately after trigger
            <span className="ml-2 text-xs text-gray-500">(recommended)</span>
          </span>
        </label>

        <div className="flex items-center space-x-3">
          <input
            type="radio"
            name="timing"
            value="delayed"
            checked={timing.type === "delayed"}
            onChange={() => handleTypeChange("delayed")}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
          />
          <span className="text-sm text-gray-900">Delay delivery until:</span>
          <input
            type="time"
            value={timing.delayTime || "16:00"}
            onChange={(e) => handleTimeChange(e.target.value)}
            disabled={timing.type !== "delayed"}
            className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
          />
        </div>
      </div>
    </div>
  );
}
