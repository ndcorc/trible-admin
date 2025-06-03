import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/cn";
import { LoadingSpinner } from "@/components/feedback";

export interface BasicButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
  asChild?: boolean;
}

const BasicButton = forwardRef<HTMLButtonElement, BasicButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      asChild,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary:
        "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500",
      secondary:
        "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 focus:ring-primary-500",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
      ghost:
        "text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-primary-500",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
    };

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        {...(!asChild ? { disabled: disabled || loading } : {})}
        ref={ref}
        {...props}
      >
        {loading && !asChild && <LoadingSpinner size="sm" className="mr-2" />}
        {children}
      </button>
    );
  }
);

BasicButton.displayName = "BasicButton";

export { BasicButton };
