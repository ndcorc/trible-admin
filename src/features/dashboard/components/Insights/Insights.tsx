import { BasicButton, Button, Card } from "@/components/ui";
import { Plus } from "lucide-react";

interface InsightsProps {
  className?: string;
}

export function Insights({ className = "" }: InsightsProps) {
  return (
    <Card className={`${className} py-2 px-3`}>
      <div className="flex flex-col items-stretch justify-start h-full">
        <div className="flex w-full justify-between mb-1 flex-shrink-0">
          <p className="text-xs font-medium text-gray-600">Insights</p>
        </div>

        <div className="flex-1 flex flex-col justify-center px-6">
          <p className="text-primary text-3xl italic font-light leading-tight">
            Most users visited you between 4-6pm. Try offering a reward during
            this window.
          </p>
        </div>

        <div className="flex-shrink-0 mb-6 px-6">
          <Button
            className="w-full justify-center text-md font-normal"
            variant="filled-tonal"
            size="md"
          >
            <Plus className="h-4 w-4 mr-1" />
            Create new campaign
          </Button>
        </div>
      </div>
    </Card>
  );
}
