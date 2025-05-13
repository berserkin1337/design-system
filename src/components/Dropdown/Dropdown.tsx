// src/components/Dropdown/Dropdown.tsx
import React, {
  type HTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
  forwardRef,
  useRef,
  useEffect,
  useState,
} from "react";
import {
  dropdownPanel,
  dropdownItem,
  itemIconWrapper,
  itemLabel,
  itemTrailingContent,
  dropdownSeparator,
} from "./Dropdown.css";
import { clsx } from "clsx";

// --- DropdownPanel ---
export interface DropdownPanelProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  children: ReactNode;
  // Add props for positioning if implementing more advanced logic
  // e.g., triggerRef, placement, etc.
  className?: string;
  style?: React.CSSProperties; // For dynamic positioning
}

export const DropdownPanel = forwardRef<HTMLDivElement, DropdownPanelProps>(
  ({ isOpen, children, className, style: styleProp, ...rest }, ref) => {
    const panelClasses = dropdownPanel({ isOpen });

    return (
      <div
        ref={ref}
        className={clsx(panelClasses, className)}
        style={styleProp}
        {...rest}
        role="listbox"
      >
        {children}
      </div>
    );
  }
);
DropdownPanel.displayName = "DropdownPanel";

// --- DropdownItem ---
export interface DropdownItemProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "disabled" | "onSelect"
  > {
  children: ReactNode; // The main label of the item
  leadingIcon?: ReactNode;
  trailingContent?: ReactNode;
  isActive?: boolean;
  disabled?: boolean; // Consistent with other components
  value?: string | number; // Value associated with the item
  onSelect?: (value: string | number | undefined) => void;
}

export const DropdownItem = forwardRef<HTMLButtonElement, DropdownItemProps>(
  (
    {
      children,
      leadingIcon,
      trailingContent,
      isActive = false,
      disabled = false,
      value,
      onSelect,
      className,
      ...rest
    },
    ref
  ) => {
    const itemClasses = dropdownItem({ isActive, isDisabled: disabled });

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      onSelect?.(value);
      rest.onClick?.(e); // Call original onClick if provided
    };

    return (
      <button
        ref={ref}
        className={clsx(itemClasses, className)}
        disabled={disabled}
        onClick={handleClick}
        role="option"
        aria-selected={isActive}
        {...rest}
        type="button" // Ensure it's a button
      >
        {leadingIcon && <span className={itemIconWrapper}>{leadingIcon}</span>}
        <span className={itemLabel}>{children}</span>
        {trailingContent && (
          <span className={itemTrailingContent}>{trailingContent}</span>
        )}
      </button>
    );
  }
);
DropdownItem.displayName = "DropdownItem";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DropdownSeparatorProps extends HTMLAttributes<HTMLHRElement> {}

export const DropdownSeparator: React.FC<DropdownSeparatorProps> = ({
  className,
  ...rest
}) => {
  return <hr className={clsx(dropdownSeparator, className)} {...rest} />;
};
DropdownSeparator.displayName = "DropdownSeparator";

// --- Main Dropdown Wrapper (Example of how to use Panel and manage state) ---
// This is a basic example. A real Dropdown often uses a Context or a headless UI library.
export interface DropdownProps {
  trigger: (props: {
    onClick: () => void;
    isOpen: boolean;
    "aria-expanded": boolean;
    "aria-haspopup": "listbox";
  }) => ReactNode;
  children: ReactNode; // DropdownItems, DropdownSeparators
  panelClassName?: string;
  panelStyle?: React.CSSProperties;
  initialOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  children,
  panelClassName,
  panelStyle,
  initialOpen = false,
  onOpenChange,
}) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const triggerRef = useRef<HTMLElement>(null); // For positioning
  const panelRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onOpenChange?.(newState);
  };

  // Basic click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        triggerRef.current && // Check if triggerRef is current (could be an issue if trigger is complex)
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        onOpenChange?.(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onOpenChange]);

  // For dynamic positioning based on trigger (very basic example)
  // A library like Popper.js / Floating UI is recommended for robust positioning
  const [dynamicPanelStyle, setDynamicPanelStyle] =
    useState<React.CSSProperties>({});
  useEffect(() => {
    if (isOpen && triggerRef.current && panelRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      setDynamicPanelStyle({
        top: triggerRect.bottom + window.scrollY, // Position below trigger
        left: triggerRect.left + window.scrollX,
        width: triggerRect.width, // Match trigger width (optional)
        ...panelStyle, // Merge with any passed style
      });
    }
  }, [isOpen, triggerRef, panelRef, panelStyle]);

  // Pass ref to the trigger element rendered by the callback
  const triggerElement = trigger({
    onClick: toggleOpen,
    isOpen,
    "aria-expanded": isOpen,
    "aria-haspopup": "listbox",
  });
  const triggerWithRef = React.isValidElement(triggerElement)
    ? React.cloneElement(triggerElement, {
        // @ts-ignore
        ref: (node: HTMLElement) => {
          // @ts-ignore Assign to our ref
          triggerRef.current = node;
          // @ts-ignore Assign to original ref if exists
          const { ref: originalRef } = triggerElement as any;
          if (typeof originalRef === "function") {
            originalRef(node);
          } else if (originalRef) {
            originalRef.current = node;
          }
        },
      })
    : triggerElement;

  return (
    <>
      {triggerWithRef}
      <DropdownPanel
        ref={panelRef}
        isOpen={isOpen}
        className={panelClassName}
        style={dynamicPanelStyle}
        // Basic ARIA for a listbox popup
        aria-labelledby={
          React.isValidElement(triggerElement)
            ? (triggerElement as any).props.id
            : undefined
        }
      >
        {children}
      </DropdownPanel>
    </>
  );
};
Dropdown.displayName = "Dropdown";
