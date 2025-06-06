import { Button, Card, DonutChart } from "@/components/ui";
import {
  Pencil,
  Plus,
  RotateCcw,
  Sparkles,
  Star,
  Triangle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { MdAutoAwesome } from "react-icons/md";

interface CustomerSegment {
  label: string;
  percentage: number;
  color: string;
}

interface StatItem {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
}

interface CustomerBreakdownProps {
  segments?: CustomerSegment[];
  className?: string;
}

export function CustomerBreakdown({
  segments = [
    { label: "New", percentage: 57, color: "#4A90A4" },
    { label: "Returning", percentage: 24, color: "#7BA7B0" },
    { label: "Lapsed", percentage: 19, color: "#A4C3CA" },
  ],
  className = "",
}: CustomerBreakdownProps) {
  return (
    <Card className={`${className} py-2 px-3`}>
      <div className="flex flex-col items-stretch justify-start h-full">
        <div className="flex w-full justify-between mb-1 flex-shrink-0">
          <p className="text-xs font-medium text-gray-600">
            {"Customer breakdown"}
          </p>
          <MdAutoAwesome size={18} fill="#578F9C" className="text-primary" />
        </div>
        <div className="flex-1 items-center grid grid-cols-3 gap-6 mt-2">
          {segments.map((segment, index) => (
            <div key={index} className="flex flex-col items-center">
              <DonutChart
                percentage={segment.percentage}
                color={segment.color}
                size={100}
                strokeWidth={10}
              />
              <p className="mt-3 text-sm font-medium text-gray-900">
                {segment.label}
              </p>
            </div>
          ))}
        </div>
        <div className="px-1 flex-shrink-0 mb-2">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-[#A4C3CA]"></div>
            <span className="text-sm text-gray-600">Total</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
