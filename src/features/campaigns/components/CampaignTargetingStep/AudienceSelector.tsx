// src/features/campaigns/components/CampaignTargetingStep/AudienceSelector.tsx

interface AudienceSelectorProps {
  selectedAudience: "all" | "inactive" | "returning" | "vip";
  onAudienceChange: (
    audience: "all" | "inactive" | "returning" | "vip"
  ) => void;
}

export function AudienceSelector({
  selectedAudience,
  onAudienceChange,
}: AudienceSelectorProps) {
  const audiences = [
    { id: "all" as const, label: "All customers" },
    { id: "inactive" as const, label: "Inactive customers", recommended: true },
    { id: "returning" as const, label: "Returning customers" },
    { id: "vip" as const, label: "VIP / high spenders" },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-medium text-gray-900 mb-2">Audience</h3>
        <p className="text-sm text-gray-600 mb-4">
          Who should receive this reward?
        </p>
      </div>

      <div className="space-y-3">
        {audiences.map((audience) => (
          <label
            key={audience.id}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <input
              type="radio"
              name="audience"
              value={audience.id}
              checked={selectedAudience === audience.id}
              onChange={(e) =>
                onAudienceChange(e.target.value as typeof selectedAudience)
              }
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
            />
            <span className="text-sm text-gray-900">
              {audience.label}
              {audience.recommended && (
                <span className="ml-2 text-xs text-gray-500">
                  (recommended)
                </span>
              )}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
