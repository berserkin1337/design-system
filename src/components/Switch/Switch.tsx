import { clsx } from "clsx";
import {
  type ButtonHTMLAttributes,
  forwardRef,
  useMemo,
  useState,
} from "react";
import {
  switchRecipe,
  type SwitchVariants,
  thumbRecipe,
  trackRecipe,
} from "./Switch.css";

export interface SwitchProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "value"> {
  isChecked?: boolean; // Controlled state
  defaultChecked?: boolean; // Uncontrolled state
  onChange?: (isChecked: boolean) => void;
  size?: SwitchVariants["size"]; // This will be 'medium' | 'small'
  disabled?: boolean;
  // For associating with a label
  id?: string;
  "aria-labelledby"?: string;
  "aria-label"?: string; // If no visible label is associated
  className?: string; // Applied to the root button element
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      isChecked: controlledChecked,
      defaultChecked = false,
      onChange,
      size = "medium",
      disabled = false,
      id: providedId,
      className,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      ...rest
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isControlled = controlledChecked !== undefined;
    const currentChecked = isControlled ? controlledChecked : internalChecked;

    const id = useMemo(
      () => providedId || `switch-${Math.random().toString(36).substr(2, 9)}`,
      [providedId]
    );

    const handleClick = () => {
      if (disabled) return;
      const newCheckedState = !currentChecked;
      if (!isControlled) {
        setInternalChecked(newCheckedState);
      }
      onChange?.(newCheckedState);
    };

    if (!ariaLabel && !ariaLabelledBy) {
      console.warn(
        "Switch component requires an `aria-label` or `aria-labelledby` prop for accessibility."
      );
    }

    const switchClasses = switchRecipe({ size });
    const trackClasses = trackRecipe({
      size,
      isChecked: currentChecked,
      isDisabled: disabled,
    });
    const thumbClasses = thumbRecipe({
      size,
      isChecked: currentChecked,
      isDisabled: disabled,
    });

    return (
      <button
        ref={ref}
        id={id}
        type="button"
        role="switch"
        aria-checked={currentChecked}
        aria-disabled={disabled} // Use aria-disabled as well
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        disabled={disabled} // Standard HTML disabled
        onClick={handleClick}
        className={clsx(switchClasses, className)}
        {...rest}
      >
        <span className={trackClasses}>
          <span className={thumbClasses} />
        </span>
      </button>
    );
  }
);

Switch.displayName = "Switch";
