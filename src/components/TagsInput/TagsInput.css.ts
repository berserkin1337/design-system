// src/components/TagsInput/TagsInput.css.ts
import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css"; // Adjust path

export const tagsInputWrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.sm || "8px", // Space between input row and displayed tags
});

export const inputRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.xs || "4px", // Space between Key input, colon, and Value input
  // This row might need a shared border or background to look like one continuous input
  // For simplicity, we'll style individual inputs for now.
  // If a single visual container is needed:
  // border: `1px solid ${vars.colors.surface300}`,
  // borderRadius: vars.radii.md,
  // padding: `${vars.spacing.xs} ${vars.spacing.sm}`,
  // backgroundColor: vars.colors.surface0,
});

export const keyInputWrapper = style({
  flexBasis: "30%", // Example: Key takes up less space
  flexShrink: 0,
});

export const valueInputWrapper = style({
  flexGrow: 1, // Value takes remaining space
});

export const colonSeparator = style({
  color: vars.colors.textSubtler,
  padding: `0 ${vars.spacing.xs || "2px"}`, // Minimal padding around colon
  alignSelf: "center", // Vertically center with input text
  // Ensure its font size matches the input's internal font size
  fontSize: vars.fontSize.headingSmBodyPrimary, // Match input text size
  lineHeight: vars.lineHeight.fontLhRegular, // Match input line height
});

export const displayedTagsArea = style({
  display: "flex",
  flexWrap: "wrap", // Allow tags to wrap to new lines
  gap: vars.spacing.sm || "8px", // Space between displayed tags
  paddingTop: vars.spacing.xs || "4px", // Some space above the first row of tags
});

// Ensure Input component styles from Input.css.ts are applied
// We will pass classNames or use props for the Input component itself.
// If specific overrides are needed for inputs within TagsInput:
export const tagKeyInput = style({
  // Custom styles for the key <Input> if needed
  // e.g., if it needs less padding or different border when part of this composite
});

export const tagValueInput = style({
  // Custom styles for the value <Input>
});
