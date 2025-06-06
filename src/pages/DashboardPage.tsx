import { Cog } from "lucide-react";
import { useDashboard } from "@/features/dashboard/hooks";
import {
  StatsCard,
  ChartWidget,
  Insights,
  ActiveCampaigns,
  BulletinInteractions,
  CustomerBreakdown,
} from "@/features/dashboard/components";
import { LoadingSpinner } from "@/components/feedback";
import { Button } from "@/components/ui";
import { useBusiness } from "@/features/business";
import { CampaignModal } from "@/features/campaigns/components";

export function DashboardPage() {
  const { stats, chartData, loading, error, refetch } = useDashboard();
  const { currentBusiness } = useBusiness();

  const handleCampaignSuccess = () => {
    // Optional: You could refresh the dashboard data here if campaigns are shown
    // refetch();
  };

  if (loading && !stats) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center min-h-96">
          <LoadingSpinner size="lg" text="Loading dashboard..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={refetch}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-normal text-gray-900">
            Welcome back,{" "}
            <span className="font-medium italic text-primary">
              {currentBusiness?.name || "Main Street Brew"}
            </span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="text" size="md" icon={<Cog className="h-5 w-5" />}>
            Configure dashboard
          </Button>
        </div>
      </div>

      {/* Top Stats Row - 3 individual cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          stats={[
            {
              title: "Page views",
              value: "2,123",
              change: 21,
            },
          ]}
        />
        <StatsCard
          stats={[
            {
              title: "Total foot traffic",
              value: "782",
              change: 41,
            },
          ]}
        />
        <StatsCard
          stats={[
            {
              title: "View-to-Visit Conversion",
              value: "36.8%",
              change: 12,
            },
          ]}
        />
      </div>

      {/* Middle Row - Chart and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartWidget title="Foot traffic trend" data={chartData} />
        </div>
        <Insights />
      </div>

      {/* Bottom Row - 3 cards */}
      <div className="grid grid-cols-1 lg:grid-cols-8 gap-6">
        {/* Bulletin interactions */}
        <BulletinInteractions className="lg:col-span-2" />

        {/* Customer breakdown - 3 stats in one card */}
        <CustomerBreakdown className="lg:col-span-3" />

        {/* Active Campaigns */}
        <ActiveCampaigns className="lg:col-span-3" />
      </div>

      {/* Campaign Creation Modal */}
      <CampaignModal onSuccess={handleCampaignSuccess} />
    </div>
  );
}
