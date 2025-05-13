// src/components/Input/Input.css.ts
import { globalStyle, style, styleVariants } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars, textStyles as globalTextStyles } from "../../styles/theme.css"; // Assuming globalTextStyles are your text utility classes

// --- LabelText Styles ---
export const labelText = style([
  globalTextStyles.bodyPrimary, // Or a specific label text style from your theme
  {
    display: "block",
    marginBottom: vars.spacing.xs || "4px", // Space between label and input
    color: vars.colors.textPrimary, // Or textSubtler if labels are lighter
    fontWeight: vars.fontWeight.mediumEmphasis, // Labels are often a bit bolder
  },
]);

// --- HelpText Styles ---
export const helpTextBase = style([
  globalTextStyles.bodySecondary, // Smaller text for help messages
  {
    display: "block",
    marginTop: vars.spacing.xs || "4px", // Space between input and help text
  },
]);

export const helpTextColorVariants = styleVariants({
  default: { color: vars.colors.textSubtler },
  error: { color: vars.colors.danger200 },
  warning: { color: vars.colors.warning300 }, // Or warning200 if 300 is too dark
  success: { color: vars.colors.success200 },
  info: { color: vars.colors.primary100 }, // Or a specific info color
});

// --- Input Field Styles ---
const baseInputStyle = style({
  display: "flex", // To align input and trailing item
  alignItems: "center",
  // width: "100%",
  border: `1px solid ${vars.colors.surface300}`, // Default border color
  borderRadius: vars.radii.md, // Default border radius
  backgroundColor: vars.colors.surface0, // Default background
  transition: "border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  fontFamily: vars.font.body,
  color: vars.colors.textPrimary,
  fontSize: vars.fontSize.headingSmBodyPrimary,
  position: "relative", // For positioning trailing item
  ":focus-visible": {
    outline: "2px solid #D1DFFF",
  },
  selectors: {
    "&:focus-within": {
      border: `1px solid ${vars.colors.primary200}`,
    },
  },
});

export const inputElementStyle = style({
  // Styles for the actual <input> tag
  flexGrow: 1,
  // width: "100%", // Removed to prevent overlap with trailing icon
  padding: 0, // Padding will be on the wrapper (baseInputStyle) or this element
  border: "none",
  outline: "none",
  backgroundColor: "transparent",
  fontFamily: "inherit",
  fontSize: "inherit", // Inherit from wrapper
  lineHeight: "inherit",
  color: "inherit",
  // Placeholder styling
  "::placeholder": {
    color: vars.colors.textSubtlest,
    opacity: 1, // Ensure placeholder is visible
  },
  // Remove spinner from number inputs for some browsers
  // minWidth: "fit-content",
  selectors: {
    '&[type="number"]::-webkit-inner-spin-button, &[type="number"]::-webkit-outer-spin-button':
      {
        WebkitAppearance: "none",
        margin: 0,
      },
    '&[type="number"]': {
      MozAppearance: "textfield", // Firefox
    },
    "&:disabled": {
      cursor: "not-allowed",
      color: vars.colors.textDisabled,
    },
    "&:disabled::placeholder": {
      color: vars.colors.textDisabled,
    },
  },
});

export const inputRecipe = recipe({
  base: baseInputStyle,
  variants: {
    size: {
      small: {
        fontSize: vars.fontSize.headingForm,
        lineHeight: vars.lineHeight.fontLhSmallForm,
        paddingTop: "4px",
        paddingBottom: "4px",
        paddingLeft: "8px",
        paddingRight: "8px",
        minHeight: "32px",
      },
      regular: {
        fontSize: vars.fontSize.headingSmBodyPrimary,
        lineHeight: vars.lineHeight.fontLhRegular,
        paddingTop: vars.spacing.xxs || "8px",
        paddingBottom: vars.spacing.xxs || "8px",
        paddingLeft: vars.spacing.sm || "12px",
        paddingRight: vars.spacing.sm || "12px",
      },
    },
    state: {
      default: {},
      error: { borderColor: vars.colors.danger200 },
      warning: { borderColor: vars.colors.warning200 },
      success: { borderColor: vars.colors.success200 },
      info: { borderColor: vars.colors.primary100 },
    },
    isFocused: {
      true: {
        borderColor: vars.colors.primary100,
        boxShadow: `0 0 0 2px ${vars.colors.opacityPrimary15}`,
      },
      false: {},
    },
    isDisabled: {
      true: {
        backgroundColor: vars.colors.surface50,
        borderColor: vars.colors.surface200,
        color: vars.colors.textDisabled,
        cursor: "not-allowed",
        opacity: 0.7,
      },
      false: {},
    },
    hasTrailingItem: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: { state: "error", isFocused: true },
      style: {
        borderColor: vars.colors.danger300,
        boxShadow: `0 0 0 2px ${vars.colors.opacityDanger15}`,
      },
    },
  ],
  defaultVariants: {
    size: "regular",
    state: "default",
    isFocused: false,
    isDisabled: false,
    hasTrailingItem: false,
  },
});

export type InputVariants = NonNullable<RecipeVariants<typeof inputRecipe>>;

// Styles for the Trailing Item
export const trailingItemWrapper = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // Position it absolutely or manage with flexbox padding
  // Using flexbox and margin on inputElementStyle for simplicity
  paddingLeft: vars.spacing.xs || "4px", // Space between input text and trailing item
  // Color should often match input text color or be slightly subdued
  color: vars.colors.textSubtler,
  flexShrink: 0, // Prevent it from shrinking
  // Match icon size to input text size
  fontSize: "1em", // So icon scales with input's font size
});

globalStyle("textarea::placeholder", {
  color: vars.colors.textSubtlest,
  fontSize: vars.fontSize.headingSmBodyPrimary,
  fontWeight: vars.fontWeight.regular,
});

export const textareaBase = style({
  // Your base styles for the textarea

  // Styling the placeholder for this specific textarea style
  "::placeholder": {
    color: vars.colors.textSubtlest,
    fontSize: vars.fontSize.headingSmBodyPrimary,
    fontStyle: "normal",
    fontWeight: vars.fontWeight.regular,
    // You could even use a textStyle from your theme if you have one for placeholders
    // ...textStyles.placeholderText,
  },
});
