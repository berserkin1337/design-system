import { style } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars, figmaTextFeatures } from "../../styles/theme.css";

const baseTag = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.spacing.xs || "0.25em",
  border: "1px solid transparent",
  borderRadius: vars.radii.full,
  backgroundColor: "#EEF1F6",
  color: vars.colors.textPrimary,
  fontFamily: vars.font.body,
  transition:
    "background-color 0.2s ease-in-out, color 0.2s ease-in-out, opacity 0.2s ease-in-out",
  cursor: "default",
  fontFeatureSettings: figmaTextFeatures.fontFeatureSettings,
  fontStyle: figmaTextFeatures.fontStyle,
  fontSize: vars.fontSize.textBodySecondary,
  letterSpacing: vars.letterSpacing.fontLetterSpacingNormal,
  fontWeight: vars.fontWeight.regular,
  lineHeight: vars.lineHeight.fontLhMedium,
});

export const tagRemoveButton = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  background: "none",
  border: "none",
  padding: "0.2em",
  margin: 0,
  marginLeft: vars.spacing.xs || "0.25em",
  cursor: "pointer",
  color: "inherit",
  outline: "none",

  ":focus-visible": {
    outlineStyle: "solid",
    outlineWidth: "2px",
    outlineColor: vars.colors.secondary100,
    outlineOffset: "2px",
    color: vars.colors.primary200,
  },
});

export const tagLabel = style({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const tagLabelFocused = style({
  color: vars.colors.primary200,
});

export const tagIcon = style({
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
  width: "1em",
  height: "1em",
});

export const tagRecipe = recipe({
  base: baseTag,
  variants: {
    size: {
      medium: {
        paddingTop: vars.spacing.smallest,
        paddingBottom: vars.spacing.smallest,
        paddingLeft: vars.spacing.xxs,
        paddingRight: vars.spacing.sm,
        minHeight: "24px",
      },
      large: {
        paddingTop: vars.spacing.xs,
        paddingBottom: vars.spacing.xs,
        paddingLeft: vars.spacing.sm,
        paddingRight: vars.spacing.sm,
        minHeight: "32px",
      },
    },
    isDisabled: {
      // This state applies to the whole tag including the remove button
      true: {
        backgroundColor: vars.colors.surface100,
        color: vars.colors.textDisabled,
        cursor: "not-allowed",
        opacity: 0.65,
      },
      false: {},
    },
    // 'isFocused' variant removed from here, as focus is on the X button
  },
  defaultVariants: {
    size: "medium",
    isDisabled: false,
  },
});

export type TagVariants = Required<
  NonNullable<RecipeVariants<typeof tagRecipe>>
>;
