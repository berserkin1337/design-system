import { clsx } from "clsx";
import React, {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
} from "react";
import {
  checkboxBoxRecipe,
  type CheckboxBoxVariants,
  checkboxIcon,
  checkboxWrapper,
  disabledStyle,
  nativeInput,
} from "./Checkbox.css";

// Icons (replace with your actual SVG components if you have them)
const CheckmarkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    className={checkboxIcon}
  >
    <path
      d="M11.6663 3.5L5.24967 9.91667L2.33301 7"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const MinusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    className={checkboxIcon}
  >
    <path
      d="M2.91699 7H11.0837"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const MinusIconInverse = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={checkboxIcon}
  >
    <g id="minus">
      <path
        id="Icon"
        d="M3.33301 8H12.6663"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);
export interface CheckboxProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "size" | "type" | "checked" | "defaultChecked" | "indeterminate"
  > {
  label?: ReactNode;
  size?: CheckboxBoxVariants["size"];
  checked?: boolean; // Controlled checked
  defaultChecked?: boolean; // Uncontrolled checked
  indeterminate?: boolean; // For indeterminate state
  // onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Standard onChange
  onCheckedChange?: (isChecked: boolean) => void; // Custom callback with boolean
  disabled?: boolean;
  className?: string; // Applied to the wrapper label
  inputClassName?: string; // Applied to the native input
  boxClassName?: string; // Applied to the custom box
  id?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      size = "medium",
      checked: controlledChecked,
      defaultChecked,
      indeterminate = false,
      // onChange,
      onCheckedChange,
      disabled = false,
      className,
      inputClassName,
      boxClassName,
      id: providedId,
      ...rest
    },
    ref
  ) => {
    const internalId = useMemo(
      () => providedId || `checkbox-${Math.random().toString(36).substr(2, 9)}`,
      [providedId]
    );
    const inputRef = useRef<HTMLInputElement>(null); // Ref for native input

    // Handle indeterminate state for native input
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      // onChange?.(event); // Call original HTML onChange
      onCheckedChange?.(event.target.checked);
    };

    const checkboxState: CheckboxBoxVariants["state"] = indeterminate
      ? "indeterminate"
      : controlledChecked ?? defaultChecked ?? false // Determine checked state
      ? "checked"
      : "unchecked";

    const boxClasses = checkboxBoxRecipe({
      size,
      state: checkboxState,
      isDisabled: disabled,
    });

    return (
      <label
        htmlFor={internalId}
        className={clsx(checkboxWrapper, className, disabled && disabledStyle)}
      >
        <input
          type="checkbox"
          ref={(node) => {
            if (inputRef) inputRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          id={internalId}
          className={clsx(nativeInput, inputClassName)}
          checked={indeterminate ? false : controlledChecked} // Native checked shouldn't be true if indeterminate
          defaultChecked={defaultChecked}
          onChange={handleChange}
          disabled={disabled}
          {...rest}
        />
        <span className={clsx(boxClasses, boxClassName)}>
          {checkboxState === "checked" && <CheckmarkIcon />}
          {checkboxState === "indeterminate" && !disabled && <MinusIcon />}
          {checkboxState === "indeterminate" && disabled && (
            <MinusIconInverse />
          )}
        </span>
        {label && <span className="checkbox-label-text">{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
