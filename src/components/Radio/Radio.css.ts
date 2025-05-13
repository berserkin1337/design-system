// src/components/Radio/Radio.css.ts
import { style } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../styles/theme.css";

// --- Base Styles ---
export const radioWrapper = style({
  // Similar to checkboxWrapper
  display: "inline-flex",
  alignItems: "center",
  cursor: "pointer",
  gap: vars.spacing.sm || "8px",
  position: "relative",
  selectors: {
    "&[data-disabled='true']": {
      cursor: "not-allowed",
      opacity: 0.7,
    },
  },
});

export const nativeRadioInput = style({
  // Similar to nativeInput
  position: "absolute",
  opacity: 0,
  cursor: "pointer",
  height: 0,
  width: 0,
});

// Custom styled circle
const circleBase = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  border: `1px solid ${vars.colors.surface500}`,
  backgroundColor: vars.colors.surface0,
  transition:
    "background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  borderRadius: vars.radii.full, // Always a circle
  position: "relative", // For the inner dot

  selectors: {
    [`${radioWrapper}:not([data-disabled='true']):hover &`]: {
      borderColor: vars.colors.primary200,
      backgroundColor: vars.colors.secondary0,
    },
    [`${nativeRadioInput}:focus-visible + &`]: {
      outline: `2px solid ${vars.colors.primary100}`,
      outlineOffset: "1px",
      borderColor: vars.colors.primary100,
    },
  },
});

export const radioCircleRecipe = recipe({
  base: circleBase,
  variants: {
    size: {
      small: {
        width: "16px",
        height: "16px",
      },
      medium: {
        width: "20px",
        height: "20px",
      },
      large: {
        width: "24px",
        height: "24px",
      },
    },
    isChecked: {
      true: {
        borderColor: vars.colors.primary200,
        backgroundColor: vars.colors.surface0,
        selectors: {
          [`${radioWrapper}:not([data-disabled='true']):hover &`]: {
            borderColor: vars.colors.primary300,
            backgroundColor: vars.colors.surface0,
          },
        },
      },
      false: {
        borderColor: vars.colors.surface500,
        backgroundColor: vars.colors.surface0,
      },
    },
    isDisabled: {
      true: {
        // borderColor: vars.colors.surface300,
        // backgroundColor: vars.colors.surface100,
        // opacity: 0.6,
        // cursor: "not-allowed",
        backgroundColor: vars.colors.surface100,
        borderColor: vars.colors.surface200,
        border: `1px solid ${vars.colors.surface200}`,
      },
      false: {},
    },
  },
  defaultVariants: {
    size: "medium",
    isChecked: false,
    isDisabled: false,
  },
});

export type RadioCircleVariants = RecipeVariants<typeof radioCircleRecipe>;

// Inner dot for selected state
export const radioDot = style({
  display: "block",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: vars.colors.primary200,
  borderRadius: "50%",
  transition: "all 0.15s ease-in-out",
  width: "8px",
  height: "8px",
  opacity: 0,
  pointerEvents: "none",
});

// Create separate styles for each state
export const radioDotSmall = style({
  width: "6px",
  height: "6px",
});

export const radioDotLarge = style({
  width: "10px",
  height: "10px",
});

export const radioDotChecked = style({
  opacity: 1,
  selectors: {
    [`${radioWrapper}:not([data-disabled='true']):hover &`]: {
      backgroundColor: vars.colors.primary300,
    },
    //disabled
    [`${radioWrapper}[data-disabled='true'] &`]: {
      backgroundColor: vars.colors.surface0,
    },
  },
});

export const radioDotDisabled = style({
  backgroundColor: vars.colors.textDisabled,
});
