// src/components/IconButton/IconButton.css.ts
import { style } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../styles/theme.css"; // Adjust path as needed

const baseIconButton = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0, // Padding will be part of size variants to control overall dimensions
  border: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
  borderRadius: vars.radii.md, // Default rounded corners for focus/hover states
  transition:
    "background-color 0.2s ease-in-out, color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, opacity 0.2s ease-in-out",
  color: vars.colors.textPrimary, // Default icon color, will be overridden by emphasis

  ":disabled": {
    cursor: "not-allowed",
    // Opacity will be handled by emphasis variants
  },
  ":focus-visible": {
    outline: `4px solid #D1E0FF`,
  },
  ":hover": {
    cursor: "pointer",
  },
});

export const iconButtonRecipe = recipe({
  base: baseIconButton,

  variants: {
    emphasis: {
      intense: {
        color: vars.colors.textSubtlest, // Darker icon for intense
        // Default state might have a very subtle background or be transparent
        // backgroundColor: vars.colors.surface50, // Example if it has a light bg
        ":hover": {
          color: vars.colors.textPrimary, // Darker icon on hover
        },
        ":active": {
          color: vars.colors.textPrimary,
        },
        ":disabled": {
          color: vars.colors.textDisabled, // Lighter icon for disabled
          opacity: 0.5,
        },
      },
      subtle: {
        color: vars.colors.surface50, // Lighter icon for subtle
        // backgroundColor: vars.colors.primary50, // Using primary50 for base blue
        ":hover": {
          color: vars.colors.textInverse, // Slightly darker icon on hover
          backgroundColor: vars.colors.primary100, // Darker blue on hover
        },
        ":active": {
          color: vars.colors.textInverse,
          backgroundColor: vars.colors.primary200, // Even darker blue when active
        },
        ":disabled": {
          color: vars.colors.textInverse,
          opacity: 0.2,
          backgroundColor: vars.colors.primary50, // Keep same blue but with opacity
        },
      },
    },
    size: {
      // Sizes refer to the icon size. Padding will make the button larger.
      // The overall button clickable area should be larger than just the icon.
      // Example: For a 12px icon, button might be 24x24 or 28x28.
      // We'll set icon size via fontSize and control button size via width/height/padding.
      "12px": {
        // fontSize: vars.fontSize.headingForm, // 12px icon
        // Define overall button dimensions for touch target / visual balance
        width: "12px",
        height: "12px",
      },
      "16px": {
        // fontSize: "16px", // ~13-14px, adjust if you have a 16px font size token
        // fontSize: '1rem', // Or directly 16px
        width: "16px", // e.g., 32px
        height: "16px",
      },
      "20px": {
        // fontSize: "20px", // 20px icon
        width: "20px", // e.g., 40px
        height: "20px",
      },
    },
  },

  defaultVariants: {
    emphasis: "intense",
    size: "16px",
  },
});

export type IconButtonVariants = RecipeVariants<typeof iconButtonRecipe>;

// Style for the icon SVG/element itself if direct children
// Not strictly needed if icon scales with fontSize and color is inherited.
export const iconElement = style({
  display: "block", // Ensure it behaves as a block for sizing
  width: "100%",
  height: "100%",
});
