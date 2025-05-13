// src/components/Button/Button.css.ts
import { keyframes, style, styleVariants } from "@vanilla-extract/css"; // Keep style for individual styles
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars, figmaTextFeatures } from "../../styles/theme.css"; // Import figmaTextFeatures for font features

const baseButton = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  verticalAlign: "middle",
  cursor: "pointer",
  userSelect: "none",
  border: "none",
  textDecoration: "none",
  fontFamily: vars.font.body, // Base font family
  // fontFeatureSettings from figmaTextFeatures will be applied via the recipe variants for text
  transition:
    "background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, opacity 0.2s ease-in-out",
  position: "relative", // For loader positioning

  ":focus-visible": {
    outline: `4px solid #D1E0FF`,
  },

  ":disabled": {
    cursor: "not-allowed",
    // Specific disabled styles will be per 'type' variant
  },
});

export const buttonRecipe = recipe({
  base: baseButton,

  variants: {
    type: {
      primary: {
        backgroundColor: vars.colors.primary200, // Your updated primary color
        color: vars.colors.textInverse, // Assuming white text on primary
        // borderColor: vars.colors.primary200,
        ":hover": {
          backgroundColor: vars.colors.primary300,
          borderColor: vars.colors.primary300,
        },
        ":active": {
          backgroundColor: vars.colors.primary200,
        },
        ":disabled": {
          backgroundColor: vars.colors.surface100, // Using a secondary scale for disabled primary
          color: vars.colors.textDisabled,
        },
      },
      secondary: {
        backgroundColor: vars.colors.surface0,
        border: `1px solid ${vars.colors.surface300}`,
        color: vars.colors.textSubtler,
        // borderColor, // Using a secondary color for border
        ":hover": {
          backgroundColor: vars.colors.surface50, // Light secondary tint
          color: vars.colors.primary200,
        },
        ":disabled": {
          backgroundColor: vars.colors.surface100, // Using a secondary scale for disabled primary
          color: vars.colors.textDisabled,
        },
      },
      tertiary: {
        backgroundColor: "transparent",
        color: vars.colors.textSubtler,
        borderColor: "transparent",
        fontSize: vars.fontSize.textBodySecondary,
        ":hover": {
          color: vars.colors.primary200,
        },
        ":disabled": {
          color: vars.colors.textSubtlest,
        },
      },
      inverse: {
        borderColor: vars.colors.surface0,
        color: vars.colors.surface0,
        backgroundColor: vars.colors.surface900,
        fontSize: vars.fontSize.textBodySecondary,
        fontWeight: vars.fontWeight.regular,
        ":hover": {
          backgroundColor: "#43454B",
        },
        ":focus-visible": {
          outlineOffset: "1px",
        },
        ":disabled": {
          color: vars.colors.textDisabled,
          borderColor: vars.colors.textDisabled,
        },
      },
    },

    size: {
      small: {
        // Using Figma's specific typographic styles for text content
        // For a button, the most relevant aspects are fontSize, fontWeight, letterSpacing.
        // Line height is often controlled by padding for buttons.
        fontSize: vars.fontSize.headingSmBodyPrimary, // 12px (matches Heading/Form heading size)
        fontWeight: vars.fontWeight.regular, // 550
        letterSpacing: vars.letterSpacing.fontLetterSpacingNormal, // 0px
        fontFeatureSettings: figmaTextFeatures.fontFeatureSettings, // Apply ligatures off

        borderRadius: vars.radii.md, // Example radius
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: vars.spacing.sm, // 0.75rem
        paddingRight: vars.spacing.sm, // 0.75rem
      },
      regular: {
        fontSize: vars.fontSize.headingSmBodyPrimary, // 13px
        fontWeight: vars.fontWeight.regular, // 550 (can also be 'regular' depending on desired emphasis)
        letterSpacing: vars.letterSpacing.fontLetterSpacingNormal,
        fontFeatureSettings: figmaTextFeatures.fontFeatureSettings,

        borderRadius: vars.radii.md, // Example radius
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: vars.spacing.sm, // 0.75rem
        paddingRight: vars.spacing.sm, // 0.75rem
      },
      large: {
        fontSize: vars.fontSize.headingSmBodyPrimary, // 15px
        fontWeight: vars.fontWeight.regular, // 550
        letterSpacing: vars.letterSpacing.fontLetterSpacingDense, // -0.1px
        fontFeatureSettings: figmaTextFeatures.fontFeatureSettings,

        borderRadius: vars.radii.md, // Example radius
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: vars.spacing.sm, // 0.75rem
        paddingRight: vars.spacing.sm, // 0.75rem
      },
    },

    ifFullWidth: {
      true: {},
      false: {},
    },

    iconOnly: {
      true: {}, // Padding adjustments in compoundVariants
      false: {},
    },

    isLoading: {
      true: {
        // Hide text, but keep space for spinner alignment.
        // Color of text is made transparent.
        // Child elements (text, icons) will also become transparent.
        color: "transparent !important",
        // Ensure pseudo-elements also become transparent if they contribute to text color
        "::before": { color: "transparent !important" },
        "::after": { color: "transparent !important" },
        // Prevent interaction
        cursor: "wait",
        pointerEvents: "none",
      },
      false: {},
    },
  },

  compoundVariants: [
    {
      variants: { size: "small", iconOnly: true },
      style: {
        // fontSize: vars.fontSize.headingSmBodyPrimary,
        padding: "0.5rem",
      },
    },
    {
      variants: { size: "regular", iconOnly: true },
      style: {
        padding: "0.62rem",
      },
    },
    {
      variants: { size: "large", iconOnly: true },
      style: {
        padding: "0.75rem",
      },
    },
    {
      variants: { size: "small", ifFullWidth: true },
      style: {
        paddingLeft: "1.375rem",
        paddingRight: "1.375rem",
      },
    },

    {
      variants: { size: "regular", ifFullWidth: true },
      style: {
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
      },
    },
    {
      variants: { size: "large", ifFullWidth: true },
      style: {
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
      },
    },
    {
      variants: { isLoading: true, type: "primary" },
      style: {
        backgroundColor: vars.colors.secondary0,
      },
    },
    {
      variants: { isLoading: true, type: "secondary" },
      style: {
        backgroundColor: vars.colors.surface50,
      },
    },
  ],

  defaultVariants: {
    type: "primary",
    size: "regular",
    ifFullWidth: false,
    iconOnly: false,
    isLoading: false,
  },
});

export type ButtonVariants = RecipeVariants<typeof buttonRecipe>;

export const loaderContainer = style({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // Set a contrasting color for the spinner against the button's original text color.
  // This is tricky. For primary, if text is white, spinner should be white.
  // For secondary, if text is primary50, spinner should be primary50.
  // We might need to pass this via a CSS var from the component or have variants for the loader.
  // Simple approach: make it inherit the original text color before it was made transparent.
  // Vanilla Extract doesn't easily allow inheriting "original" color before a style change.
  // A common workaround is to have the spinner SVG use `currentColor` and then
  // set the `color` on the loaderContainer based on the button type.
  // For now, we'll rely on the spinner using `currentColor` and let it be transparent if `isLoading` makes text transparent.
  // The spinner will then need its own color or use one of the button's fixed colors.
});

// For the spinner to be visible when text is transparent, it needs its own explicit color.
// Let's assume for primary buttons, spinner is white, for others it's primary color.
// This can be refined.

const spinAnimation = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});
export const spinnerStyle = style({
  animationName: spinAnimation,
  animationDuration: "1s",
  animationTimingFunction: "linear",
  animationIterationCount: "infinite",
  display: "inline-block",

  width: "1em", // Scales with button font size
  height: "1em",
  borderRadius: "50%",
  borderWidth: "2px", // Or use a token vars.borderWidths.sm
  borderStyle: "solid",
  // Default spinner color (e.g., for primary buttons)
  borderColor: `${vars.colors.surface0} transparent`, // Example: white border
});

// We might need variants for spinner color based on button type
export const spinnerColorVariants = styleVariants({
  primary: { borderColor: `${vars.colors.surface0} transparent` },
  secondary: {
    borderColor: `${vars.colors.primary50} transparent`,
  },
  tertiary: {
    borderColor: `${vars.colors.primary50} transparent`,
  },
  inverse: {
    borderColor: `${vars.colors.surface0} transparent`,
  },
});

export const iconWrapper = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  lineHeight: 0, // Helps with icon alignment
});

export const iconLeading = style({
  // marginRight: vars.spacing[1_5], // Use a spacing token
  // Example:
  marginRight: "0.375em", // Relative to font-size for better scaling with button text
});

export const iconTrailing = style({
  // marginLeft: vars.spacing[1_5],
  marginLeft: "0.375em",
});

export const visuallyHidden = style({
  border: 0,
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  width: "1px",
  whiteSpace: "nowrap",
});
