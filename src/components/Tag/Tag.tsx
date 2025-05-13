import { clsx } from "clsx";
import {
  type HTMLAttributes,
  type ReactNode,
  forwardRef,
  useState,
} from "react";
import {
  type TagVariants,
  tagIcon,
  tagLabel,
  tagLabelFocused,
  tagRecipe,
  tagRemoveButton,
} from "./Tag.css";

export interface TagProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode; // The label of the tag
  size?: TagVariants["size"];
  disabled?: boolean;
  leadingIcon?: ReactNode;
  onRemove?: () => void;
  className?: string;
}

export const Tag = forwardRef<HTMLDivElement, TagProps>(
  (
    {
      children,
      size = "medium",
      disabled = false,
      leadingIcon,
      onRemove,
      className,
      ...rest
    },
    ref
  ) => {
    const tagClasses = tagRecipe({
      size,
      isDisabled: disabled,
    });
    const [tagLabelFocus, setTagLabelFocus] = useState(false);
    return (
      <div
        ref={ref}
        className={clsx(tagClasses, className)}
        aria-disabled={disabled ? true : undefined}
        {...rest}
      >
        {leadingIcon && <span className={tagIcon}>{leadingIcon}</span>}
        <span className={clsx(tagLabel, tagLabelFocus && tagLabelFocused)}>
          {children}
        </span>
        {onRemove && ( // The remove button is only rendered if onRemove is provided
          <button
            type="button"
            className={tagRemoveButton}
            onClick={(e) => {
              if (disabled) return;
              e.stopPropagation();
              onRemove();
            }}
            aria-label={`Remove ${
              typeof children === "string" ? children : "tag"
            }`}
            disabled={disabled}
            onFocus={() => setTagLabelFocus(true)}
            onBlur={() => setTagLabelFocus(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="0.5rem"
              height="0.5rem"
              viewBox="0 0 8 8"
              fill="currentColor"
            >
              <path
                d="M6.64645 0.646447C6.84171 0.451184 7.15822 0.451184 7.35348 0.646447C7.54874 0.841709 7.54874 1.15822 7.35348 1.35348L4.70699 3.99996L7.35348 6.64645C7.54874 6.84171 7.54874 7.15822 7.35348 7.35348C7.15822 7.54874 6.84171 7.54874 6.64645 7.35348L3.99996 4.70699L1.35348 7.35348C1.15822 7.54874 0.841709 7.54874 0.646447 7.35348C0.451184 7.15822 0.451184 6.84171 0.646447 6.64645L3.29293 3.99996L0.646447 1.35348C0.451184 1.15822 0.451184 0.841709 0.646447 0.646447C0.841709 0.451184 1.15822 0.451184 1.35348 0.646447L3.99996 3.29293L6.64645 0.646447Z"
                fill="currentColor"
              />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Tag.displayName = "Tag";
