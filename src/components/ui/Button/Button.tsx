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
      "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none disabled:cursor-not-allowed cursor-pointer leading-none";

    const variants = {
      elevated:
        "bg-transparent text-gray-900 shadow-sm border border-gray-200 hover:bg-surface-variant text-primary",
      filled:
        "bg-primary text-white hover:bg-primary-fixed-dim shadow-sm hover:shadow-md",
      "filled-tonal":
        "bg-secondary-fixed text-gray-600 hover:bg-secondary-fixed-dim",
      outlined: "bg-transparent text-primary-600 border border-primary-600",
      text: "bg-transparent text-primary hover:bg-surface-variant",
    };

    const sizes = {
      sm: "px-4 py-1 text-sm min-h-[20px]",
      md: "px-6 py-2 text-sm min-h-[32]",
      lg: "px-8 py-3 text-base min-h-[40px]",
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
