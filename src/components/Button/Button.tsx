import React, {
  type ButtonHTMLAttributes,
  type ReactNode,
  forwardRef,
} from "react";
import {
  buttonRecipe,
  type ButtonVariants,
  loaderContainer,
  spinnerStyle,
  spinnerColorVariants, // Make sure this is imported if you use it
  iconWrapper,
  iconLeading,
  iconTrailing,
  visuallyHidden,
} from "./Button.css";
import { clsx } from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  Omit<ButtonVariants, "isLoading"> & {
    // Rename to avoid conflict with HTML button type
    buttonType?: "primary" | "secondary" | "tertiary";
    // Other props remain the same
    children?: ReactNode;
    isLoading?: boolean;
    size?: "small" | "regular" | "large";
    iconBefore?: ReactNode;
    iconAfter?: ReactNode;
    iconOnly?: boolean;
    "aria-label"?: string;
    ifFullWidth?: boolean;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      buttonType = "primary", // Changed from type to buttonType
      size = "regular",
      ifFullWidth = false,
      iconOnly = false,
      isLoading = false,
      disabled = false,
      iconBefore,
      iconAfter,
      className,
      onClick,
      ...rest
    },
    ref
  ) => {
    const actualDisabled = isLoading || disabled;
    console.log("Button rendered with props:", {
      buttonType,
      size,
      ifFullWidth,
      iconOnly,
      isLoading,
      disabled,
    });

    console.trace("Button props:", {
      buttonType,
      size,
      ifFullWidth,
      iconOnly,
      isLoading,
      disabled,
    });
    // Check if there's meaningful content (not just whitespace or empty fragment)
    const hasVisibleContent = React.Children.toArray(children).some((child) => {
      if (typeof child === "string" && child.trim() === "") return false;
      return child != null; // Checks for null or undefined
    });

    const buttonClasses = buttonRecipe({
      type: buttonType, // Map buttonType to the recipe's type
      size,
      ifFullWidth,
      iconOnly,
      isLoading,
    });
    console.warn("Button classes:", buttonClasses);
    const handleClick = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      if (isLoading || actualDisabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event); // Directly call onClick
    };

    // Props for the <button> element
    const commonProps: ButtonHTMLAttributes<HTMLButtonElement> = {
      //@ts-ignore
      ref,
      className: clsx(buttonClasses, className),
      disabled: actualDisabled,
      // No need for aria-disabled since 'disabled' attribute is sufficient for buttons
      "aria-live": isLoading ? "polite" : undefined,
      "aria-label":
        iconOnly && typeof children === "string" && !rest["aria-label"]
          ? children
          : rest["aria-label"],
      onClick: handleClick,
      //@ts-ignore
      type: rest.type || "button", // Default to 'button' type if not specified in rest
      ...rest,
    };

    const content = (
      <>
        {iconBefore && (
          <span
            className={clsx(
              iconWrapper,
              !iconOnly && hasVisibleContent && iconLeading
            )}
          >
            {iconBefore}
          </span>
        )}
        {iconOnly && typeof children === "string" && !rest["aria-label"] ? (
          <span className={visuallyHidden}>{children}</span>
        ) : (
          children
        )}
        {iconAfter && (
          <span
            className={clsx(
              iconWrapper,
              !iconOnly && hasVisibleContent && iconTrailing
            )}
          >
            {iconAfter}
          </span>
        )}
        {isLoading && (
          <span className={loaderContainer} aria-hidden="true">
            {/* Apply spinner color variant based on button type */}
            <span
              //@ts-ignore ignore
              className={clsx(spinnerStyle, spinnerColorVariants?.[buttonType])}
            />
          </span>
        )}
      </>
    );

    return <button {...commonProps}>{content}</button>;
  }
);

Button.displayName = "Button";
