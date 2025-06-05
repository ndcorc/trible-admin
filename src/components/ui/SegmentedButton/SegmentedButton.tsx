import { type HTMLAttributes, forwardRef } from "react";
import { Check } from "lucide-react";
import { cn } from "@/utils/cn";
export interface SegmentOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}
export interface SegmentedButtonProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: SegmentOption[];
  value: string;
  onChange: (value: string) => void;
  size?: "xs" | "sm" | "md" | "lg";
}
const SegmentedButton = forwardRef<HTMLDivElement, SegmentedButtonProps>(
  ({ className, options, value, onChange, size = "md", ...props }, ref) => {
    const sizes = {
      xs: "px-2 py-1 text-xs",
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
    };
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-l-full rounded-full border-1 border-gray-300",
          className
        )}
        role="radiogroup"
        {...props}
      >
        {options.map((option, index) => {
          const isSelected = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={cn(
                "cursor-pointer relative flex items-center justify-center font-medium transition-all duration-200 mr-2",
                index === 0 && "rounded-l-full",
                index === options.length - 1 && "rounded-r-full",
                sizes[size],
                isSelected
                  ? "bg-secondary-fixed text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              )}
              onClick={() => onChange(option.value)}
            >
              {isSelected && <Check className="h-4 w-4 mr-2 flex-shrink-0" />}
              {option.icon && !isSelected && (
                <span className="mr-2 flex-shrink-0">{option.icon}</span>
              )}
              <span className="whitespace-nowrap">{option.label}</span>
            </button>
          );
        })}
      </div>
    );
  }
);
SegmentedButton.displayName = "SegmentedButton";
export { SegmentedButton };
