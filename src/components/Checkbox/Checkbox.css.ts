// src/components/Checkbox/Checkbox.css.ts
import { style } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../styles/theme.css";

// --- Base Styles ---
// Wrapper for the input and custom box, usually used with a label
export const checkboxWrapper = style({
  display: "inline-flex",
  alignItems: "center",
  cursor: "pointer",
  gap: vars.spacing.sm || "8px", // Space between checkbox and label text
  position: "relative", // For focus styling if needed on wrapper
});

// Visually hidden native input
export const nativeInput = style({
  position: "absolute",
  opacity: 0,
  cursor: "pointer",
  height: 0,
  width: 0,
});

// Custom styled box
const boxBase = style({
  display: "inline-flex", // Changed to inline-flex to center icon
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0, // Prevent shrinking
  border: `1.5px solid ${vars.colors.surface400}`, // Default border
  backgroundColor: vars.colors.surface0, // Default background (white)
  transition:
    "background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  selectors: {
    // Hover state on the wrapper (label) affects the box
    [`${checkboxWrapper}:hover &`]: {
      borderColor: vars.colors.primary200, // Example hover border
      backgroundColor: vars.colors.secondary0,
    },
    // Focus state on the NATIVE input affects the box
    [`${nativeInput}:focus-visible + &`]: {
      // Target box when native input is focused
      outline: `2px solid ${vars.colors.primary100}`, // Or use boxShadow for glow
      outlineOffset: "1px",
      borderColor: vars.colors.primary100, // Stronger border on focus
    },
  },
});

export const checkboxBoxRecipe = recipe({
  base: boxBase,
  variants: {
    size: {
      small: {
        width: "12px",
        height: "12px",
        borderRadius: vars.radii.md,
      },
      medium: {
        width: "16px",
        height: "16px",
        borderRadius: vars.radii.md,
      },
      large: {
        width: "20px",
        height: "20px",
        borderRadius: vars.radii.md,
      },
    },
    state: {
      // Checked, Indeterminate
      unchecked: {
        // Default state styles from boxBase
      },
      checked: {
        backgroundColor: vars.colors.primary100, // Blue background
        borderColor: vars.colors.primary100, // Blue border
        selectors: {
          //not disabled
          [`${checkboxWrapper}:hover &`]: {
            backgroundColor: vars.colors.primary200,
            borderColor: vars.colors.primary200,
          },
        },
      },
      indeterminate: {
        // Background might be same as checked or different
        backgroundColor: vars.colors.secondary0,
        borderColor: vars.colors.primary200,
        selectors: {},
      },
    },
    isDisabled: {
      true: {
        border: `1px solid ${vars.colors.surface200}`,
        backgroundColor: vars.colors.surface100, // Faded background
        cursor: "not-allowed",
        selectors: {
          [`${checkboxWrapper}:hover &`]: {
            // No hover effect when disabled
            borderColor: vars.colors.surface300,
          },
          // Ensure icon inside also gets disabled color if not handled by opacity
        },
      },
      false: {},
    },
  },
  defaultVariants: {
    size: "medium",
    state: "unchecked",
    isDisabled: false,
  },
});

export type CheckboxBoxVariants = NonNullable<
  RecipeVariants<typeof checkboxBoxRecipe>
>;

// Icon styles (checkmark, minus)
export const checkboxIcon = style({
  display: "block",
  width: "0.75em", // Relative to checkbox box's font-size (which can be set to match icon size)
  height: "0.75em",
  color: vars.colors.primary200, // White icon on blue background
  borderRadius: vars.radii.sm || "2px",
  selectors: {
    // If indeterminate icon needs a different color when box is not filled blue
    // This assumes indeterminate state still has a blue background for the icon to be white
    // If indeterminate is on a white bg, icon color needs to be e.g. vars.colors.primary100
    [`${checkboxBoxRecipe({ state: "indeterminate" })} &`]: {
      color: vars.colors.primary200,
    },

    [`${checkboxBoxRecipe({ state: "indeterminate" })}:hover &`]: {
      color: vars.colors.primary300,
    },
    [`${checkboxBoxRecipe({ isDisabled: true })} &`]: {
      color: vars.colors.textDisabled, // Faded icon color when disabled
    },
  },
});

export const disabledStyle = style({
  cursor: "not-allowed",
});
