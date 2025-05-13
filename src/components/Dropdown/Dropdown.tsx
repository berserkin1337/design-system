import { clsx } from "clsx";
import React, {
  type ButtonHTMLAttributes,
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  dropdownItem,
  dropdownPanel,
  dropdownSeparator, // Ensure types are imported
  itemIconWrapper,
  itemLabel,
  itemTrailingContent,
} from "./Dropdown.css";
import { DropdownContext, useDropdown } from "./DropdownContext"; // IMPORT CONTEXT

// --- DropdownPanel ---
export interface DropdownPanelProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const DropdownPanel = forwardRef<HTMLDivElement, DropdownPanelProps>(
  ({ isOpen, children, className, style: styleProp, ...rest }, ref) => {
    const panelClasses = dropdownPanel({ isOpen }); // Recipe call

    return (
      <div
        ref={ref}
        className={clsx(panelClasses, className)}
        style={styleProp}
        {...rest}
        role="listbox" // ARIA role for the panel
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
  children: ReactNode;
  leadingIcon?: ReactNode;
  trailingContent?: ReactNode;
  isActive?: boolean;
  disabled?: boolean;
  value?: string | number;
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
      onClick: originalOnClick, // Renamed to avoid conflict
      ...rest
    },
    ref
  ) => {
    const itemClasses = dropdownItem({ isActive, isDisabled: disabled }); // Recipe call
    const { closeDropdown } = useDropdown(); // GET closeDropdown FROM CONTEXT

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      onSelect?.(value);
      originalOnClick?.(e);
      closeDropdown(); // CLOSE THE DROPDOWN
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
        type="button"
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

// --- DropdownSeparator ---
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DropdownSeparatorProps extends HTMLAttributes<HTMLHRElement> {}

export const DropdownSeparator: React.FC<DropdownSeparatorProps> = ({
  className,
  ...rest
}) => {
  return <hr className={clsx(dropdownSeparator, className)} {...rest} />;
};
DropdownSeparator.displayName = "DropdownSeparator";

// --- Main Dropdown Wrapper ---
export interface DropdownProps {
  trigger: (props: {
    onClick: () => void;
    isOpen: boolean;
    "aria-expanded": boolean;
    "aria-haspopup": "listbox";
  }) => ReactNode;
  children: ReactNode;
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
  const triggerRef = useRef<HTMLElement | null>(null); // Initialize with null
  const panelRef = useRef<HTMLDivElement | null>(null); // Initialize with null

  // Function to explicitly close the dropdown, can be passed via context
  const closeDropdownInternal = () => {
    if (isOpen) {
      // Only change state if it's actually open
      setIsOpen(false);
      onOpenChange?.(false);
    }
  };

  const toggleOpen = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onOpenChange?.(newState);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        closeDropdownInternal();
      }
    };

    if (isOpen) {
      // Only add listener if dropdown is open
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onOpenChange]); // Rerun if isOpen or onOpenChange changes

  const [dynamicPanelStyle, setDynamicPanelStyle] =
    useState<React.CSSProperties>({});
  useEffect(() => {
    if (isOpen && triggerRef.current && panelRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      setDynamicPanelStyle({
        position: "absolute", // Ensure panel is absolutely positioned for top/left
        top: triggerRect.bottom + window.scrollY + 2, // +2 for small gap
        left: triggerRect.left + window.scrollX,
        width: triggerRect.width, // Or a minWidth from theme, or dynamic
        ...panelStyle,
      });
    }
  }, [isOpen, panelStyle]); // Rerun if isOpen or panelStyle changes

  const triggerElement = trigger({
    onClick: toggleOpen,
    isOpen,
    "aria-expanded": isOpen,
    "aria-haspopup": "listbox",
  });

  const triggerWithRef = React.isValidElement(triggerElement)
    ? React.cloneElement(triggerElement, {
        // @ts-ignore difficult to type precisely with cloneElement and refs
        ref: (node: HTMLElement | null) => {
          triggerRef.current = node;
          // Handle original ref if triggerElement itself had one

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const originalRef = (triggerElement as any).ref;
          if (typeof originalRef === "function") {
            originalRef(node);
          } else if (originalRef && typeof originalRef === "object") {
            originalRef.current = node;
          }
        },
      })
    : triggerElement;

  const contextValue = {
    closeDropdown: closeDropdownInternal,
    isOpen,
  };

  return (
    <>
      {triggerWithRef}
      <DropdownContext.Provider value={contextValue}>
        <DropdownPanel
          ref={panelRef}
          isOpen={isOpen}
          className={panelClassName}
          style={dynamicPanelStyle}
          aria-labelledby={
            React.isValidElement(triggerElement) &&
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (triggerElement.props as any).id
              ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (triggerElement.props as any).id
              : undefined
          }
        >
          {children}
        </DropdownPanel>
      </DropdownContext.Provider>
    </>
  );
};
Dropdown.displayName = "Dropdown";
