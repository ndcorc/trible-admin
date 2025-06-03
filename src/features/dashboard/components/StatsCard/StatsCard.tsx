interface StatItem {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
}

interface StatsCardProps {
  stats: StatItem[];
  className?: string;
}

export function StatsCard({ stats, className = "" }: StatsCardProps) {
  return (
    <div
      className={`bg-surface-container rounded-xl shadow-sm border border-gray-200 p-6 ${className}`}
    >
      <div
        className={`grid gap-6 ${stats.length === 1 ? "grid-cols-1" : stats.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}
      >
        {stats.map((stat, index) => {
          const isPositive = stat.change && stat.change > 0;
          const isNegative = stat.change && stat.change < 0;

          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                {stat.change !== undefined && (
                  <p
                    className={`text-sm ${
                      isPositive
                        ? "text-green-600"
                        : isNegative
                          ? "text-red-600"
                          : "text-gray-600"
                    }`}
                  >
                    {isPositive && "+"}
                    {stat.change}% from last month
                  </p>
                )}
              </div>
              {stat.icon && (
                <div className="text-gray-400 ml-4">{stat.icon}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
