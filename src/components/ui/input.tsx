import { cn } from "@/lib/utils";
import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  fieldLabel?: string;
  error?: string | boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      fieldLabel,
      error,
      startIcon,
      endIcon,
      ...props
    },
    ref
  ) => {
    return (
      <div className="space-y-1">
        {/* Label */}
        {fieldLabel && (
          <label className="text-sm font-semibold text-gray-800">
            {fieldLabel}
          </label>
        )}

        {/* Input Wrapper */}
        <div className="relative">
          {/* Start Icon */}
          {startIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {startIcon}
            </span>
          )}

          {/* Input */}
          <input
            ref={ref}
            type={type}
            aria-invalid={!!error}
            className={cn(
              "border-input flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              error && "border-destructive ring-1 ring-destructive/40",
              startIcon && "pl-10",
              endIcon && "pr-10",
              className
            )}
            {...props}
          />

          {/* End Icon */}
          {endIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer">
              {endIcon}
            </span>
          )}
        </div>

        {/* Error Message */}
        {error && typeof error === "string" && (
          <p className="text-xs text-red-600 text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
