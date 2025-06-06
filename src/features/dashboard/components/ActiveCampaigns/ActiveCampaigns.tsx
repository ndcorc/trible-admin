import { TrendingUp } from "lucide-react";
import { BasicButton, Button, Card } from "@/components/ui";
import { MdAutoAwesome } from "react-icons/md";

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

interface ActiveCampaignsProps {
  className?: string;
}

export function ActiveCampaigns({ className = "" }: ActiveCampaignsProps) {
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
    <Card className={`${className} py-2 px-3 flex flex-col gap-1`}>
      <div className="flex w-full justify-between mb-0 flex-shrink-0">
        <p className="text-xs font-medium text-gray-600">
          {"Active campaigns"}
        </p>
        <MdAutoAwesome size={18} fill="#578F9C" className="text-primary" />
      </div>

      {/* Main Value */}
      <div className="mb-1">
        <div className="text-2xl font-bold text-primary mb-1">{totalValue}</div>
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
      <div className="grid grid-cols-2 gap-0 mb-2">
        {metrics.map((metric, index) => (
          <div key={index}>
            <div className="text-[0.6rem] text-gray-500 uppercase tracking-wide">
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
        <div className="text-xs text-gray-600 mb-2 leading-snug">
          {description}
        </div>
      )}

      {/* Action Button */}
      <Button
        className="w-full justify-center font-normal mb-2"
        variant="elevated"
        size="md"
      >
        View full campaign report
      </Button>
    </Card>
  );
}
