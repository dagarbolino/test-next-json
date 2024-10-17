import * as React from "react";
import { cn } from "@/lib/utils";

export interface CheckboxPasterizedMilkProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void;
}

const CheckboxPasterizedMilk = React.forwardRef<HTMLInputElement, CheckboxPasterizedMilkProps>(
  ({ className, onCheckedChange, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onCheckedChange) {
        onCheckedChange(event.target.checked);
      }
    };

    return (
      <input
        type="checkbox"
        className={cn(
          "h-5 w-5 ml-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer",
          className
        )}
        ref={ref}
        onChange={handleChange}
        {...props}
      />
    );
  }
);

CheckboxPasterizedMilk.displayName = "CheckboxPasterizedMilk";

export { CheckboxPasterizedMilk };
