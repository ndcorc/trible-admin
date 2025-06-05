import { useMemo, useState } from "react";
import type { ChartData } from "../../types/dashboard.types";
import { Card, SegmentedButton } from "@/components/ui";
import { Calendar, Calendar1, CalendarDays, Grid3X3 } from "lucide-react";
import type { SegmentOption } from "@/components/ui/SegmentedButton/SegmentedButton";

interface ChartWidgetProps {
  data: ChartData[];
  title: string;
}

export function ChartWidget({ data, title }: ChartWidgetProps) {
  const maxValue = useMemo(
    () => Math.max(...data.map((item) => item.value)),
    [data]
  );

  const [selectedPeriod, setSelectedPeriod] = useState("day");

  const periodOptions: SegmentOption[] = [
    {
      value: "day",
      label: "Day",
      icon: <Calendar1 className="h-4 w-4" />,
      // No icon needed since the component shows a checkmark when selected
    },
    {
      value: "week",
      label: "Week",
      icon: <CalendarDays className="h-4 w-4" />,
    },
    {
      value: "month",
      label: "Month",
      icon: <Grid3X3 className="h-4 w-4" />,
    },
    {
      value: "year",
      label: "Year",
      icon: <Calendar className="h-4 w-4" />,
    },
  ];

  return (
    <Card className="py-2 px-3">
      <div className="flex w-full justify-between mb-2">
        <p className="text-xs font-medium text-gray-600">{title}</p>
        <SegmentedButton
          options={periodOptions}
          value={selectedPeriod}
          onChange={setSelectedPeriod}
          className="mb-4"
          size="xs"
        />
      </div>
      <div className="space-y-4 mb-4">
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
