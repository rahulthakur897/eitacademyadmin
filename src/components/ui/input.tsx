import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  fieldLabel?: string;
  error?: string | boolean;
  startIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, fieldLabel, error, startIcon, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {fieldLabel && (
          <label className="text-sm font-semibold text-gray-800">
            {fieldLabel}
          </label>
        )}

        <div className="relative">
          {startIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {startIcon}
            </span>
          )}

          <input
            ref={ref}
            type={type}
            data-slot="input"
            aria-invalid={!!error}
            className={cn(
              "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
              "border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow]",
              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
              error && "border-destructive ring-destructive/20",
              startIcon && "pl-9",
              className
            )}
            {...props}
          />
        </div>

        {error && typeof error === "string" && (
          <p className="text-xs text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };

