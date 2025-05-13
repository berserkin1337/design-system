import React, {
  type InputHTMLAttributes,
  type ReactNode,
  forwardRef,
  useMemo,
} from "react";
import {
  radioWrapper,
  nativeRadioInput,
  radioCircleRecipe,
  type RadioCircleVariants,
  radioDot,
  radioDotSmall,
  radioDotLarge,
  radioDotChecked,
  radioDotDisabled,
} from "./Radio.css";
import { clsx } from "clsx";

export interface RadioProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "size" | "type" | "checked" | "defaultChecked"
  > {
  label?: ReactNode;
  size?: NonNullable<RadioCircleVariants>["size"];
  checked?: boolean; // Controlled checked
  // defaultChecked is not standard for native radio, usually handled by group or name
  // For standalone radio, `checked` is primary.
  // onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckedChange?: (isChecked: boolean) => void; // Custom callback
  disabled?: boolean;
  className?: string; // Applied to the wrapper label
  inputClassName?: string;
  circleClassName?: string;
  id?: string;
  name?: string; // Radio buttons in a group need the same name
  value?: string; // Value of the radio button
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      size = "medium",
      checked, // Radios are typically controlled by `checked`
      // onChange,
      onCheckedChange,
      disabled = false,
      className,
      inputClassName,
      circleClassName,
      id: providedId,
      name,
      value,
      ...rest
    },
    ref
  ) => {
    const internalId = useMemo(
      () => providedId || `radio-${Math.random().toString(36).substr(2, 9)}`,
      [providedId]
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      // onChange?.(event);
      onCheckedChange?.(event.target.checked);
    };

    const circleClasses = radioCircleRecipe({
      size,
      isChecked: checked,
      isDisabled: disabled,
    });

    return (
      <label
        htmlFor={internalId}
        className={clsx(radioWrapper, className)}
        data-disabled={disabled}
      >
        <input
          type="radio"
          ref={ref}
          id={internalId}
          name={name}
          value={value}
          className={clsx(nativeRadioInput, inputClassName)}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          {...rest}
        />
        <span className={clsx(circleClasses, circleClassName)}>
          <span
            className={clsx(
              radioDot,
              size === "small" && radioDotSmall,
              size === "large" && radioDotLarge,
              checked && radioDotChecked,
              disabled && radioDotDisabled
            )}
          />
        </span>
        {label && <span className="radio-label-text">{label}</span>}
      </label>
    );
  }
);

Radio.displayName = "Radio";
