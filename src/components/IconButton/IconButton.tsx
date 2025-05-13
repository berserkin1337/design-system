import { clsx } from "clsx";
import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from "react";
import {
  iconButtonRecipe,
  type IconButtonVariants,
  iconElement,
} from "./IconButton.css";

type IconButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & // Omit children as we expect an icon prop
  IconButtonVariants & {
    // `children` prop will be the icon itself
    icon: ReactNode; // Icon is required
    "aria-label": string; // aria-label is required for accessibility
    // emphasis and size are from IconButtonVariants
    className?: string;
  };

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      emphasis = "intense",
      size = "16px",
      "aria-label": ariaLabel, // Destructure aria-label
      disabled = false,
      className,
      ...rest
    },
    ref
  ) => {
    if (!ariaLabel) {
      console.warn(
        "IconButton requires an `aria-label` prop for accessibility."
      );
    }

    const buttonClasses = iconButtonRecipe({
      emphasis,
      size,
    });

    return (
      <button
        ref={ref}
        className={clsx(buttonClasses, className)}
        disabled={disabled}
        aria-label={ariaLabel}
        {...rest}
        type={rest.type || "button"} // Default to 'button' type
        style={{
          padding: "0px",
        }}
      >
        {/* Wrap icon in a span with iconElement style if needed for consistent sizing */}
        <span className={iconElement}>{icon}</span>
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
