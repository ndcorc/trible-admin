import { Button, Card } from "@/components/ui";
import { Pencil, Plus, Sparkles, Triangle } from "lucide-react";
import { Link } from "react-router-dom";
import { MdAutoAwesome } from "react-icons/md";

interface StatItem {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
}

interface BulletinInteractionsProps {
  className?: string;
}

export function BulletinInteractions({
  className = "",
}: BulletinInteractionsProps) {
  const stat: StatItem = {
    title: "Bulletin interactions",
    value: "363",
    change: 29,
  };
  const isPositive = stat.change && stat.change > 0;
  const isNegative = stat.change && stat.change < 0;
  return (
    <Card className={`${className} py-2 px-3`}>
      <div className="flex flex-col items-stretch justify-start h-full">
        <div
          className="flex w-full justify-between mb-1 flex-shrink-0"
          id="bulletin-header"
        >
          <p className="text-xs font-medium text-gray-600">{stat.title}</p>
          <MdAutoAwesome size={18} fill="#578F9C" className="text-primary" />
        </div>
        <div
          className="flex-1 flex flex-col justify-center"
          id="bulletin-value"
        >
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
                  isPositive ? "var(--color-green-600)" : "var(--color-red-600)"
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
        <div className="px-1 flex-shrink-0 mb-6" id="bulletin-action">
          <Button
            className="w-full justify-center text-lg font-normal px-0"
            variant="filled-tonal"
            icon={<Pencil size={18} className="mr-2" />}
          >
            Edit bulletin post
          </Button>
        </div>
      </div>
    </Card>
  );
}
