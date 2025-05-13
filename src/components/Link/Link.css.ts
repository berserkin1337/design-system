import { style } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { figmaTextFeatures, vars } from "../../styles/theme.css"; // Adjust path as needed

const baseLink = style({
  display: "inline-flex", // To align icon and text
  alignItems: "center",
  gap: vars.spacing.xs || "0.25em", // Space between text and icon (defaulting to 0.25em if xs not in your spacing)
  backgroundColor: "transparent",
  border: "none",
  margin: 0, // Reset margin
  cursor: "pointer",
  textDecoration: "none", // Base: no underline
  fontFamily: vars.font.body,
  // Using a common text style for links, e.g., bodyPrimary. Adjust if links have unique typography.
  fontSize: vars.fontSize.textBodySecondary, // 13px
  fontWeight: vars.fontWeight.regular, // 550, or vars.fontWeight.regular (450) if links are less emphasized
  letterSpacing: vars.letterSpacing.fontLetterSpacingNormal,
  fontFeatureSettings: figmaTextFeatures.fontFeatureSettings,
  lineHeight: vars.lineHeight.fontLhMedium, // 1.5, or adjust based on your design
  transition:
    "color 0.2s ease-in-out, text-decoration-color 0.2s ease-in-out, background-color 0.2s ease-in-out",
  borderRadius: vars.radii.md, // For the focus state's background/outline

  selectors: {
    "&:disabled, &.disabled": {
      cursor: "not-allowed !important",
      pointerEvents: "auto",
      textDecoration: "none",
      opacity: 0.5,
      userSelect: "none",
      WebkitUserSelect: "none",
      MozUserSelect: "none",
      msUserSelect: "none",
    },
  },

  ":focus": {
    textDecoration: "underline",
  },
  ":focus-visible": {
    outline: `2px solid #D1E0FF`,
  },
});

export const linkRecipe = recipe({
  base: baseLink,

  variants: {
    colorVariant: {
      primary: {
        color: vars.colors.primary200,
        ":hover": {
          color: vars.colors.primary300,
          textDecoration: "underline",
        },
        selectors: {
          "&:disabled, &.disabled": {
            color: vars.colors.textDisabled,
            textDecoration: "none",
          },
        },
      },
      black: {
        // Corresponds to "Colour Black" in image, using textPrimary
        color: vars.colors.textPrimary,
        ":hover": {
          color: vars.colors.primary200,
          textDecoration: "underline",
        },
        selectors: {
          "&:disabled, &.disabled": {
            color: vars.colors.textDisabled,
            textDecoration: "none",
          },
        },
      },
      danger: {
        color: vars.colors.danger200,
        ":hover": {
          color: vars.colors.danger300,
          textDecoration: "underline",
        },
        selectors: {
          "&:disabled, &.disabled": {
            color: vars.colors.textDisabled,
            textDecoration: "none",
          },
        },
      },
      success: {
        color: vars.colors.success200,
        ":hover": {
          color: vars.colors.success300,
          textDecoration: "underline",
        },
        selectors: {
          "&:disabled, &.disabled": {
            color: vars.colors.textDisabled,
            textDecoration: "none",
          },
        },
      },
      warning: {
        color: vars.colors.warning200,
        ":hover": {
          color: vars.colors.warning300,
          textDecoration: "underline",
        },
        selectors: {
          "&:disabled, &.disabled": {
            color: vars.colors.textDisabled,
            textDecoration: "none",
          },
        },
      },
      white: {
        // For use on dark backgrounds
        color: vars.colors.textInverse, // White
        ":hover": {
          textDecoration: "underline",
        },
        selectors: {
          "&:disabled, &.disabled": {
            color: vars.colors.textDisabled,
            textDecoration: "none",
          },
        },
      },
    },
  },

  defaultVariants: {
    colorVariant: "primary",
  },
});

export type LinkVariants = Required<RecipeVariants<typeof linkRecipe>>;

// Styles for the icon within the link (if you implement it this way)
export const linkIcon = style({
  // display: 'inline-block', // Already inline-flex on parent
  // marginLeft: vars.spacing.xs, // If icon is always trailing
  // Vertical alignment might need slight adjustment based on icon
  verticalAlign: "middle", // Or 'text-bottom', etc.
  width: "1em", // Scale with font size
  height: "1em",
  // Color will be inherited from the parent link's color
});
