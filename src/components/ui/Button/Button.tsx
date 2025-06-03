import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/cn";
import { LoadingSpinner } from "@/components/feedback";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "elevated" | "filled" | "filled-tonal" | "outlined" | "text";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
  asChild?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "filled",
      size = "md",
      loading = false,
      fullWidth = false,
      asChild,
      disabled,
      children,
      icon,
      iconPosition = "left",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed cursor-pointer leading-none";

    const variants = {
      elevated:
        "bg-white text-gray-900 shadow-md hover:shadow-lg border border-gray-200",
      filled:
        "bg-primary text-white hover:bg-primary-700 focus:ring-primary-500 shadow-sm hover:shadow-md",
      "filled-tonal": "bg-primary-100 text-primary-900",
      outlined: "bg-transparent text-primary-600 border border-primary-600",
      text: "bg-transparent text-primary hover:bg-surface-variant",
    };

    const sizes = {
      sm: "px-4 py-1 text-sm min-h-[32px]",
      md: "px-6 py-2 text-sm min-h-[40px]",
      lg: "px-8 py-3 text-base min-h-[48px]",
    };

    const iconSizes = {
      sm: "h-4 w-4",
      md: "h-4 w-4",
      lg: "h-5 w-5",
    };

    const renderContent = () => {
      if (loading) {
        return (
          <>
            <LoadingSpinner
              size="sm"
              variant={variant === "filled" ? "white" : "primary"}
              className="mr-2"
            />
            {children}
          </>
        );
      }

      if (icon && children) {
        return iconPosition === "left" ? (
          <>
            <span className="mr-2">{icon}</span>
            {children}
          </>
        ) : (
          <>
            {children}
            <span className="mr-2">{icon}</span>
          </>
        );
      }

      if (icon && !children) {
        return <span>{icon}</span>;
      }

      return children;
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
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {renderContent()}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
