// src/components/Table/Table.css.ts
import { style, globalStyle } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars, textStyles, figmaTextFeatures } from "../../styles/theme.css";

// --- Table Wrapper ---
export const tableWrapper = style({
  width: "100%",
  borderCollapse: "collapse",
  borderSpacing: 0,
  tableLayout: "fixed",
});

// --- Table Row Styles ---
export const tableRowRecipe = recipe({
  base: {
    transition: "background-color 0.1s ease-in-out",
  },
  variants: {
    isSelected: {
      true: {
        backgroundColor: vars.colors.secondary0,
        selectors: {
          "&:hover": {
            backgroundColor: vars.colors.secondary100,
          },
        },
      },
      false: {
        selectors: {
          "&:hover": {
            backgroundColor: vars.colors.rowHoverBg,
          },
        },
      },
    },
    isSpecActiveOrFocused: {
      // This drives background changes for Focus/Active
      true: {
        // This is the background for a non-selected row that is focused/active
        backgroundColor: vars.colors.secondary0,
      },
      false: {},
    },
    isHeaderRow: {
      true: {
        selectors: { "&:hover": { backgroundColor: "transparent" } },
      },
      false: {},
    },
  },
  compoundVariants: [
    {
      // Selected row that is also "Active" or "Focused" (gets the darkest "Active" BG from spec)
      variants: { isSelected: true, isSpecActiveOrFocused: true },
      style: {
        backgroundColor: vars.colors.secondary100,
      },
    },
    // If "Selected + Focus" needs a BG different from "Selected + Active" (e.g. same as "Selected + Hover")
    // you would need to split isSpecActiveOrFocused into two props/variants.
    // Current setup: Selected + (Focus or Active) -> rowSelectedBgActive.
  ],
  defaultVariants: {
    isSelected: false,
    isSpecActiveOrFocused: false,
    isHeaderRow: false,
  },
});
export type TableRowVariants = NonNullable<
  RecipeVariants<typeof tableRowRecipe>
>;

// --- Base Cell Styles (Common for Th and Td) ---
const baseCell = style({
  textAlign: "left",
  verticalAlign: "middle",
  borderBottom: `1px solid #DBE0EB`,
  position: "relative",
  fontFeatureSettings: figmaTextFeatures.fontFeatureSettings, // Apply common font features
  fontStyle: figmaTextFeatures.fontStyle,
});

// --- Table Header Cell (Th) Styles ---
export const tableHeaderCellRecipe = recipe({
  base: [
    baseCell,
    textStyles.bodyPrimary,
    {
      fontWeight: vars.fontWeight.mediumEmphasis,
      color: vars.colors.textSubtler,
      backgroundColor: vars.colors.surface100,
      position: "sticky",
      top: 0,
      zIndex: vars.zIndices.sticky,
      whiteSpace: "nowrap",
    },
  ],
  variants: {
    align: {
      left: { textAlign: "left" },
      center: { textAlign: "center" },
      right: { textAlign: "right" },
    },
    size: {
      compact: {
        padding: `${vars.spacing.tableCellPaddingYCompact} ${vars.spacing.tableCellPaddingXCompact}`,
      },
      expanded: {
        padding: `${vars.spacing.tableCellPaddingYExpanded} ${vars.spacing.tableCellPaddingXExpanded}`,
      },
    },
    isSortable: { true: { cursor: "pointer" }, false: {} },
    isSelectionCell: {
      true: {
        // width: vars.spacing.xxl,
        // paddingLeft: vars.spacing.md,
        // paddingRight: vars.spacing.md,
        width: vars.spacing.xl, // ⬅️ real width lives in CSS
        textAlign: "center",
      },
      false: {},
    },
  },
  defaultVariants: {
    align: "left",
    size: "expanded",
    isSortable: false,
    isSelectionCell: false,
  },
});
export type TableHeaderCellVariants = NonNullable<
  RecipeVariants<typeof tableHeaderCellRecipe>
>;

export const sortIcon = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginLeft: vars.spacing.xs,
  color: vars.colors.textSubtler,
  opacity: 0.6,
  verticalAlign: "middle",
  selectors: {
    [`th[class*="${tableHeaderCellRecipe.classNames.variants.isSortable.true}"]:hover &`]:
      {
        opacity: 1,
        color: vars.colors.textPrimary,
      },
  },
});
export const sortIconActive = style({
  opacity: 1,
  color: vars.colors.primary100,
});

// --- Table Data Cell (Td) Styles ---
export const tableCellRecipe = recipe({
  base: [
    baseCell,
    textStyles.bodyPrimary, // Default typography for data cells
    {
      color: vars.colors.textPrimary,
      outline: `2px solid transparent`, // Reserve space for outline, make it transparent
      outlineOffset: "-2px", // Draw outline inside padding, over background
      transition: "outline-color 0.1s ease-in-out",
    },
  ],
  variants: {
    align: {
      left: { textAlign: "left" },
      center: { textAlign: "center" },
      right: { textAlign: "right" },
    },
    size: {
      compact: {
        padding: `${vars.spacing.tableCellPaddingYCompact} ${vars.spacing.tableCellPaddingXCompact}`,
      },
      expanded: {
        padding: `${vars.spacing.tableCellPaddingYExpanded} ${vars.spacing.tableCellPaddingXExpanded}`,
      },
    },
    isSelectionCell: {
      true: {
        // width: vars.spacing.xxl,
        width: vars.spacing.xl, // ⬅️  same width here
        // paddingLeft: vars.spacing.md,
        // paddingRight: vars.spacing.md,
        textAlign: "center",
      },
      false: {},
    },
    isParentRowFocusedOrActive: {
      // For the cell's content border
      true: {
        outlineColor: "#D1DFFF",
        outlineWidth: "4px",
        outlineOffset: "1px",
      },
      false: {
        outlineColor: "transparent",
      },
    },
  },
  defaultVariants: {
    align: "left",
    size: "expanded",
    isSelectionCell: false,
    isParentRowFocusedOrActive: false,
  },
});
export type TableCellVariants = NonNullable<
  RecipeVariants<typeof tableCellRecipe>
>;

globalStyle(
  `${tableWrapper} > thead > tr > th, ${tableWrapper} > tbody > tr > td`,
  {
    verticalAlign: "middle",
  }
);
globalStyle(`${tableWrapper} > tbody > tr:last-child > td`, {
  borderBottom: "none",
});

// Helper styles
export const cellMemberAvatar = style({
  width: vars.spacing.xl,
  height: vars.spacing.xl,
  borderRadius: vars.radii.full,
  backgroundColor: vars.colors.surface200,
  flexShrink: 0,
  marginRight: vars.spacing.sm,
});
export const cellMemberName = style([
  textStyles.bodyPrimary,
  { fontWeight: vars.fontWeight.mediumEmphasis },
]);
export const cellStatusIcon = style({
  width: vars.spacing.sm,
  height: vars.spacing.sm,
  borderRadius: vars.radii.full,
  flexShrink: 0,
});
export const cellSlotPlaceholder = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  //  minHeight: vars.spacing.xxl,
  border: `1px dashed ${vars.colors.primary100}`,
  backgroundColor: vars.colors.opacityPrimary15,
  color: vars.colors.primary100,
  borderRadius: vars.radii.sm,
  fontSize: vars.fontSize.textBodySecondary,
  fontStyle: "italic",
});

// globalStyle(`${tableWrapper} > thead > tr > th:last-child`, {
//   display: "flex",
//   alignItems: "center",
//   gap: vars.spacing.xs,
//   width: "100%",
// });
