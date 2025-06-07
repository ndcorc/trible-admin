// src/features/campaigns/components/CampaignTargetingStep/DeliveryWindowSelector.tsx

interface DeliveryWindow {
  enabled: boolean;
  days: string[];
}

interface DeliveryWindowSelectorProps {
  deliveryWindow: DeliveryWindow;
  onDeliveryWindowChange: (window: DeliveryWindow) => void;
}

export function DeliveryWindowSelector({
  deliveryWindow,
  onDeliveryWindowChange,
}: DeliveryWindowSelectorProps) {
  const dayOptions = [
    { key: "SU", label: "Sunday", display: "S" },
    { key: "M", label: "Monday", display: "M" },
    { key: "T", label: "Tuesday", display: "T" },
    { key: "W", label: "Wednesday", display: "W" },
    { key: "TH", label: "Thursday", display: "Th" },
    { key: "F", label: "Friday", display: "F" },
    { key: "SA", label: "Saturday", display: "S" },
  ];

  const handleEnabledChange = (enabled: boolean) => {
    onDeliveryWindowChange({
      ...deliveryWindow,
      enabled,
    });
  };

  const handleDayToggle = (dayKey: string) => {
    const newDays = deliveryWindow.days.includes(dayKey)
      ? deliveryWindow.days.filter((day) => day !== dayKey)
      : [...deliveryWindow.days, dayKey];

    onDeliveryWindowChange({
      ...deliveryWindow,
      days: newDays,
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-medium text-gray-900 mb-4">
          Delivery window
        </h3>
      </div>

      <div className="space-y-4">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={deliveryWindow.enabled}
            onChange={(e) => handleEnabledChange(e.target.checked)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-900">
            Only send during these days
            <span className="ml-2 text-xs text-gray-500">(recommended)</span>
          </span>
        </label>

        {deliveryWindow.enabled && (
          <div className="flex space-x-2">
            {dayOptions.map((day) => (
              <button
                key={day.key}
                type="button"
                onClick={() => handleDayToggle(day.key)}
                className={`w-10 h-10 text-sm font-medium rounded transition-colors ${
                  deliveryWindow.days.includes(day.key)
                    ? "bg-primary-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                title={day.label}
              >
                {day.display}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
