// src/features/campaigns/components/CampaignModal/PhonePreview.tsx

interface PhonePreviewProps {
  title: string;
  message: string;
  businessName?: string;
}

export function PhonePreview({
  title,
  message,
  businessName = "Main Street Brew",
}: PhonePreviewProps) {
  return (
    <div className="relative">
      {/* Phone Frame */}
      <div className="w-64 h-96 bg-black rounded-3xl p-2 shadow-xl">
        {/* Screen */}
        <div className="w-full h-full bg-gray-400 rounded-2xl relative overflow-hidden">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>

          {/* Screen Content */}
          <div className="h-full w-full relative">
            {/* Status Bar Space */}
            <div className="h-8"></div>

            {/* Notification */}
            <div className="px-4 py-3">
              <div className="bg-white rounded-xl shadow-sm p-4 mx-2">
                <div className="flex items-center space-x-3 mb-2">
                  {/* Business Icon */}
                  <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                      <div className="w-3 h-3 bg-primary-600 rounded-full" />
                    </div>
                  </div>

                  {/* Business Name and Time */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 truncate">
                        {businessName}
                      </span>
                      <span className="text-xs text-gray-500">Now</span>
                    </div>
                  </div>
                </div>

                {/* Message Content */}
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-gray-900 leading-tight">
                    {title || "Your campaign title"}
                  </h3>
                  <p className="text-xs text-gray-600 leading-tight">
                    {message || "Your campaign message will appear here"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
