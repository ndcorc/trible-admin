import { Check, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui";

interface CampaignSuccessModalProps {
  onClose: () => void;
  campaignName?: string;
}

export function CampaignSuccessModal({
  onClose,
  campaignName = "your campaign",
}: CampaignSuccessModalProps) {
  const handleViewCampaigns = () => {
    // Navigate to campaigns list or dashboard
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Campaign Created!
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="h-8 w-8 text-green-600" />
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Success! {campaignName} is now live
              </h3>
              <p className="text-gray-600">
                Your campaign has been successfully created and is now active.
                You can monitor its performance from the campaigns dashboard.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Check className="h-5 w-5 text-green-600 mt-0.5" />
                <div className="text-left">
                  <p className="text-sm font-medium text-green-800">
                    What happens next?
                  </p>
                  <ul className="mt-1 text-sm text-green-700 space-y-1">
                    <li>
                      • Campaign is now active and targeting your selected
                      audience
                    </li>
                    <li>
                      • You'll start seeing engagement metrics within 24 hours
                    </li>
                    <li>
                      • Real-time performance data is available in your
                      dashboard
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row gap-3 p-6 border-t border-gray-200">
          <Button
            variant="filled-tonal"
            onClick={onClose}
            className="flex-1 sm:flex-none"
          >
            Create Another Campaign
          </Button>

          <Button
            onClick={handleViewCampaigns}
            className="flex-1 sm:flex-none bg-primary-600 hover:bg-primary-700"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View All Campaigns
          </Button>
        </div>
      </div>
    </div>
  );
}
