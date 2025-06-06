import { BasicButton, Button, Card } from "@/components/ui";
import { Plus } from "lucide-react";

export function Insights() {
  return (
    <Card className="py-2 px-3">
      <div className="flex w-full justify-between mb-2">
        <p className="text-xs font-medium text-gray-600">Insights</p>
      </div>

      <div className="my-10 px-4">
        <p className="text-primary text-xl italic font-light leading-normal">
          Most users visited you between 4-6pm. Try offering a reward during
          this window.
        </p>
      </div>

      <div className="px-1">
        <Button
          className="w-full justify-center text-sm font-normal"
          variant="filled-tonal"
        >
          <Plus className="h-4 w-4 mr-1" />
          Create new campaign
        </Button>
      </div>
    </Card>
  );
}
