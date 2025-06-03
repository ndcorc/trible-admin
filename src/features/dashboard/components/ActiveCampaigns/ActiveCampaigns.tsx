import { TrendingUp } from "lucide-react";
import { Button } from "@/components/ui";

interface CampaignMetric {
  label: string;
  value: string;
}

interface CampaignData {
  totalValue: string;
  change: number;
  metrics: CampaignMetric[];
  description: string;
}

export function ActiveCampaigns() {
  // Local data structure matching the UI design
  const campaignData: CampaignData = {
    totalValue: "$2,180",
    change: 43,
    metrics: [
      { label: "Total redemptions", value: "144" },
      { label: "Average spend per visit", value: "$15.12" },
      { label: "Average reward value", value: "$2.50" },
      { label: "Incremental visits (est.)", value: "+52" },
    ],
    description:
      'You saw a 43% jump in redemptions after launching the "Spring promo". Most redemptions occurred between 4-6pm.',
  };

  const { totalValue, change, metrics, description } = campaignData;

  const isPositive = campaignData.change > 0;

  return (
    <div className="bg-surface-container rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Active campaigns
        </h3>
        <TrendingUp className="h-5 w-5 text-gray-400" />
      </div>

      {/* Main Value */}
      <div className="mb-4">
        <div className="text-3xl font-bold text-gray-900 mb-1">
          {totalValue}
        </div>
        {change !== undefined && (
          <div
            className={`text-sm ${isPositive ? "text-green-600" : "text-red-600"}`}
          >
            <span className="inline-flex items-center">
              {isPositive ? "+" : ""}
              {change}% vs. last 30 days
            </span>
          </div>
        )}
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {metrics.map((metric, index) => (
          <div key={index}>
            <div className="text-xs text-gray-500 uppercase tracking-wide">
              {metric.label}
            </div>
            <div className="text-sm font-semibold text-gray-900">
              {metric.value}
            </div>
          </div>
        ))}
      </div>

      {/* Description */}
      {description && (
        <div className="text-xs text-gray-600 mb-4 leading-relaxed">
          {description}
        </div>
      )}

      {/* Action Button */}
      <Button variant="secondary" size="sm" className="w-full">
        View full campaign report
      </Button>
    </div>
  );
}
