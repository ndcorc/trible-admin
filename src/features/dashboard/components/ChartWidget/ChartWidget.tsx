import { useMemo } from "react";
import type { ChartData } from "../../types/dashboard.types";
import { Card } from "@/components/ui";

interface ChartWidgetProps {
  data: ChartData[];
  title: string;
}

export function ChartWidget({ data, title }: ChartWidgetProps) {
  const maxValue = useMemo(
    () => Math.max(...data.map((item) => item.value)),
    [data]
  );

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-600 w-8">
              {item.name}
            </span>
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-900 w-12 text-right">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
