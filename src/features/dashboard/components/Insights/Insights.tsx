import { Button } from "@/components/ui";
import { Plus } from "lucide-react";

export function Insights() {
  return (
    <div className="bg-surface-container rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Insights</h3>

      <div className="mb-6">
        <p className="text-gray-600 text-sm leading-relaxed">
          Most users visited you between 4-6pm. Try offering a reward during
          this window.
        </p>
      </div>

      <Button className="w-full justify-center">
        <Plus className="h-4 w-4 mr-2" />
        Create new campaign
      </Button>
    </div>
  );
}
