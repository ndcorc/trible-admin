import { Card } from "@/components/ui";
import { Sparkles, Triangle } from "lucide-react";
import { Link } from "react-router-dom";
import { MdAutoAwesome } from "react-icons/md";

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
    <Card className={`${className} py-2 px-3`}>
      <div
        className={`grid gap-6 ${stats.length === 1 ? "grid-cols-1" : stats.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}
      >
        {stats.map((stat, index) => {
          const isPositive = stat.change && stat.change > 0;
          const isNegative = stat.change && stat.change < 0;

          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex w-full justify-between mb-1">
                  <p className="text-xs font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <MdAutoAwesome
                    size={18}
                    fill="#578F9C"
                    className="text-primary"
                  />
                </div>
                {stat.change !== undefined && (
                  <p
                    className={`text-sm flex justify-center items-center gap-1 ${
                      isPositive
                        ? "text-green-600"
                        : isNegative
                          ? "text-red-600"
                          : "text-gray-600"
                    }`}
                  >
                    <Triangle
                      fill={
                        isPositive
                          ? "var(--color-green-600)"
                          : "var(--color-red-600)"
                      }
                      strokeWidth={1}
                      size={16}
                      className={`${!isPositive && "rotate-180"}`}
                    />
                    {stat.change}%
                  </p>
                )}
                <p className="flex justify-center text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </p>
                <Link
                  to="/"
                  className="flex justify-center text-xs text-blue-800"
                  title="View Details"
                >
                  <span className="mx-5">{"View Details"}</span>
                </Link>
              </div>
              {stat.icon && (
                <div className="text-gray-400 ml-4">{stat.icon}</div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
