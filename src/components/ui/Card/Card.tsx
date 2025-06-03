// src/components/ui/Card/Card.tsx
import { type HTMLAttributes, forwardRef } from "react";
import { MoreVertical } from "lucide-react";
import { cn } from "@/utils/cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "elevated" | "filled" | "outlined";
  showMoreOptions?: boolean;
  onMoreOptionsClick?: () => void;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "elevated",
      showMoreOptions = false,
      onMoreOptionsClick,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = "relative p-6 rounded-xl transition-all duration-200";

    const variants = {
      elevated: "shadow-md border border-gray-200",
      filled: "bg-gray-100 border border-gray-200 hover:bg-gray-50",
      outlined: "bg-white border-2 border-gray-300 hover:border-gray-400",
    };

    return (
      <div
        className={cn(baseStyles, variants[variant], className)}
        ref={ref}
        {...props}
      >
        {showMoreOptions && (
          <button
            onClick={onMoreOptionsClick}
            className="absolute top-4 right-4 p-1 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="More options"
          >
            <MoreVertical className="h-4 w-4 text-gray-500" />
          </button>
        )}
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export { Card };
