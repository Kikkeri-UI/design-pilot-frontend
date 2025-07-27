// src/components/ui/Button.tsx
import React from "react";
import { cn } from "@/app/lib/utils"; // Utility for merging classNames (see below)
import { Loader2 } from "lucide-react";

type Variant = "primary" | "secondary" | "outline" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  icon?: React.ReactNode;
  title? : string
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      icon,
      disabled,
      title,
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const sizeStyles: Record<Size, string> = {
      sm: "text-sm px-3 py-1.5",
      md: "text-base px-4 py-2",
      lg: "text-lg px-5 py-3",
    };

    const variantStyles: Record<Variant, string> = {
      primary: "bg-primary text-white hover:bg-blue-600 focus:ring-blue-500",
      secondary: "bg-transparent text-gray-800 hover:bg-indigo-600 focus:ring-indigo-500 border border-gray-800",
      outline: "border border-muted text-foreground hover:bg-gray-100",
      danger: "bg-danger text-white hover:bg-red-600 focus:ring-red-500",
    };

    return (
      <button
        ref={ref}
        className={cn(base, sizeStyles[size], variantStyles[variant], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          icon && <span className="mr-2">{icon}</span>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
