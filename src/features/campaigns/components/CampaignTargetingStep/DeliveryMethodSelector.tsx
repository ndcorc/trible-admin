// src/features/campaigns/components/CampaignTargetingStep/DeliveryMethodSelector.tsx

interface DeliveryMethods {
  pushNotification: boolean;
  inAppNotification: boolean;
  email: boolean;
}

interface DeliveryMethodSelectorProps {
  deliveryMethods: DeliveryMethods;
  onDeliveryMethodsChange: (methods: DeliveryMethods) => void;
}

export function DeliveryMethodSelector({
  deliveryMethods,
  onDeliveryMethodsChange,
}: DeliveryMethodSelectorProps) {
  const methods = [
    {
      key: "pushNotification" as keyof DeliveryMethods,
      label: "Push notification",
      recommended: true,
    },
    {
      key: "inAppNotification" as keyof DeliveryMethods,
      label: "In-app notification",
    },
    {
      key: "email" as keyof DeliveryMethods,
      label: "Email",
    },
  ];

  const handleMethodChange = (key: keyof DeliveryMethods, checked: boolean) => {
    onDeliveryMethodsChange({
      ...deliveryMethods,
      [key]: checked,
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-medium text-gray-900 mb-2">
          Delivery method
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          How should the reward notification be delivered?
        </p>
      </div>

      <div className="space-y-3">
        {methods.map((method) => (
          <label
            key={method.key}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={deliveryMethods[method.key]}
              onChange={(e) => handleMethodChange(method.key, e.target.checked)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-900">
              {method.label}
              {method.recommended && (
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
