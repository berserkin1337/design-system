// src/components/Dropdown/Dropdown.css.ts
import { style } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars, textStyles } from "../../styles/theme.css"; // Using textStyles for item typography

// --- Dropdown Panel Styles ---
export const dropdownPanel = recipe({
  base: {
    position: "absolute", // For positioning relative to a trigger
    zIndex: 1000, // Ensure it's above other content
    minWidth: "160px", // Minimum width, can be overridden
    backgroundColor: vars.colors.surface0,
    borderRadius: vars.radii.md,
    border: `1px solid ${vars.colors.surface200}`, // Subtle border
    paddingTop: vars.spacing.xs || "4px", // Padding inside the panel
    paddingBottom: vars.spacing.xs || "4px",
    marginTop: vars.spacing.xs || "4px", // Small space between trigger and panel
    overflowY: "auto", // If list is too long
    maxHeight: "300px", // Limit height
    // Transition for open/close (optional)
    // opacity: 0,
    // transform: 'translateY(-10px)',
    // transition: 'opacity 0.15s ease-out, transform 0.15s ease-out',
  },
  variants: {
    isOpen: {
      true: {
        // opacity: 1,
        // transform: 'translateY(0)',
        display: "block", // Or 'flex' if using flex for layout internally
      },
      false: {
        display: "none", // Simplest way to hide
      },
    },
  },
  defaultVariants: {
    isOpen: false,
  },
});

export type DropdownPanelVariants = RecipeVariants<typeof dropdownPanel>;

// --- Dropdown Item Styles ---
export const dropdownItem = recipe({
  base: [
    textStyles.bodyPrimary, // Base typography for items
    {
      display: "flex",
      alignItems: "center",
      width: "100%",
      textAlign: "left",
      padding: `${vars.spacing.sm || "8px"} ${vars.spacing.sm || "12px"}`, // Consistent padding
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      color: vars.colors.textPrimary,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      borderRadius: vars.radii.sm, // Subtle rounding for hover/focus state
      transition: "background-color 0.1s ease-in-out, color 0.1s ease-in-out",

      // Apply common font features if not already in textStyles.bodyPrimary
      // fontFeatureSettings: figmaTextFeatures.fontFeatureSettings,
      // fontStyle: figmaTextFeatures.fontStyle,

      selectors: {
        "&:hover": {
          backgroundColor: vars.colors.secondary50, // Light blueish hover (from image)
          color: vars.colors.primary100, // Text color might change on hover
        },
        "&:focus-visible": {
          outline: "none",
          backgroundColor: vars.colors.secondary100, // Slightly more pronounced focus
          color: vars.colors.primary200,
        },
      },
    },
  ],
  variants: {
    isActive: {
      // For indicating the currently selected/active item
      true: {
        backgroundColor: vars.colors.secondary100, // Or opacityPrimary15
        color: vars.colors.primary200, // Or primary color
        fontWeight: vars.fontWeight.mediumEmphasis, // Make active item bolder
      },
      false: {},
    },
    isDisabled: {
      true: {
        color: vars.colors.textDisabled,
        cursor: "not-allowed",
        backgroundColor: "transparent", // Ensure no hover/active bg
        opacity: 0.6,
        selectors: {
          "&:hover": {
            // Override hover for disabled
            backgroundColor: "transparent",
            color: vars.colors.textDisabled,
          },
        },
      },
      false: {},
    },
  },
  defaultVariants: {
    isActive: false,
    isDisabled: false,
  },
});

export type DropdownItemVariants = RecipeVariants<typeof dropdownItem>;

// --- Styles for elements within DropdownItem ---
export const itemIconWrapper = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: vars.spacing.sm || "8px",
  flexShrink: 0,
  // Icon color will be inherited, size via fontSize of item
  fontSize: "1.1em", // Make icon slightly larger than text if desired
  color: vars.colors.textSubtler, // Default icon color, can change with item state

  selectors: {
    // Change icon color when item is hovered/active if needed
    [`${dropdownItem({ isActive: true })} &`]: {
      // Target icon when item is active
      // color: vars.colors.primary200,
    },
    [`${dropdownItem({})}:hover &`]: {
      // Target icon when item is hovered (non-active)
      // color: vars.colors.primary100,
    },
    [`${dropdownItem({ isDisabled: true })} &`]: {
      color: "inherit", // Inherit disabled color
    },
  },
});

export const itemLabel = style({
  flexGrow: 1,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const itemTrailingContent = style({
  marginLeft: vars.spacing.md || "16px",
  flexShrink: 0,
  color: vars.colors.textSubtler, // Lighter color for meta info
  fontSize: vars.fontSize.textBodySecondary, // Smaller font size

  selectors: {
    [`${dropdownItem({ isDisabled: true })} &`]: {
      color: "inherit", // Inherit disabled color
    },
  },
});

// --- Dropdown Separator (Optional) ---
export const dropdownSeparator = style({
  height: "1px",
  backgroundColor: vars.colors.surface200,
  margin: `${vars.spacing.xs || "4px"} 0`,
});
