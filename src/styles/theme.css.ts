// src/styles/theme.css.ts
import { createGlobalTheme } from "@vanilla-extract/css";

export const root = ":root";

// Helper function to convert hex to rgba
const hexToRgba = (hex: string, alpha: number): string => {
  const hexValue = hex.startsWith("#") ? hex : `#${hex}`;
  if (hexValue.length !== 7) {
    console.warn(`Invalid hex color for RGBA conversion: ${hex}`);
    return hex;
  }
  const r = parseInt(hexValue.slice(1, 3), 16);
  const g = parseInt(hexValue.slice(3, 5), 16);
  const b = parseInt(hexValue.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const vars = createGlobalTheme(root, {
  colors: {
    rowHoverBg: "#F7F9FB",
    // Surface Colors (Light Mode) - Your updated values
    surface0: "#FFFFFF",
    surface50: "#F8F9FB",
    surface100: "#F2F4F8",
    surface200: "#DBE1EB",
    surface300: "#C4CDDF",
    surface400: "#AEBAD2",
    surface500: "#697791",
    surface600: "#495773",
    surface700: "#343F56",
    surface800: "#222C3F",
    surface900: "#13161E",

    // Primary Colors (Light Mode) - Your updated values
    primary50: "#3B7CFF",
    primary100: "#1F5EDC",
    primary200: "#0942B3",
    primary300: "#002E8A",
    primary400: "#002061",

    // Secondary Colors (Light Mode) - Your updated values
    secondary0: "#EBF2FF",
    secondary50: "#D7E5FF",
    secondary100: "#C8DAFF",
    secondary200: "#A5C3FF",
    secondary300: "#81ABFF",
    secondary400: "#5E94FF",

    // Text Colors - Your updated values
    textDisabled: "#BCC2D0",
    textSubtlest: "#8B96AE",
    textSubtler: "#525F7A",
    textPrimary: "#1A2031", // This is the #1A2031 from Figma Dev Mode
    textBolder: "#13161E",
    textInverse: "#FFF", // Often white for text on dark backgrounds; #13161E is very dark

    // Danger Colors (Light Mode) - Your updated values
    danger0: "#FEEBEB",
    danger50: "#FCA6A6",
    danger100: "#EA6262",
    danger200: "#B21C1C",
    danger300: "#810E0E",
    danger400: "#5D0404",

    // Success Colors (Light Mode) - Your updated values
    success0: "#EFFBF5",
    success50: "#DAF5E8",
    success100: "#91E3BA",
    success200: "#20845A",
    success300: "#11583B",
    success400: "#1C3329",

    // Warning Colors (Light Mode) - Your updated values
    warning0: "#FFF6EB",
    warning50: "#FFE1BC",
    warning100: "#F9DBB5", // This was in your file, Figma shows #FCA6A6 for danger50
    warning200: "#EE8B10",
    warning300: "#B56203",
    warning400: "#854500",

    // Opacity Colors (with specified opacities) - Your updated values
    opacityPrimary15: "rgba(9, 66, 179, 0.15)",
    opacitySecondary15: "rgba(165, 195, 255, 0.15)",
    opacityDanger15: "rgba(178, 28, 28, 0.15)",
    opacitySuccess15: "rgba(10, 128, 91, 0.15)", // Note: Figma dev mode showed #12825F as base
    opacityWarning15: "rgba(238, 139, 16, 0.15)",

    // Modal Opacity Colors
    backgroundModal: "rgba(18, 18, 18, 0.92)",
    opacityModal: hexToRgba("#FFFFFF", 0),
    opacityTransparent: hexToRgba("#FFFFFF", 0),
    opacityTransparent20: hexToRgba("#FFFFFF", 0.2),

    // Dark Mode Surface Primitives
    dark50: "#121212",
    dark100: "#161616",
    dark200: "#1A1A1A",
    dark300: "#1C1C1C",
    dark400: "#1E1E1E",
  },

  // --- TYPOGRAPHY PRIMITIVES (ALIGNED WITH FIGMA DEV MODE CSS) ---
  font: {
    body: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    mono: '"SF Mono", "SFMono-Regular", ui-monospace, "Consolas", "Liberation Mono", Menlo, Courier, monospace',
    // heading: "inherit", // Keep if headings use the same 'body' font family
  },

  fontSize: {
    // From Figma Dev Mode:
    // size-20: Heading lg (20px)
    // size-15: Heading md (15px)
    // size-13: Heading sm, Text-body/primary (13px)
    // size-12: Heading/Form heading (12px)
    // size-small: Text-body/secondary (11px) - renaming for consistency
    // (Base 16px = 1rem for conversion)
    textBodySecondary: "0.6875rem", // 11px (was xs)
    headingForm: "0.75rem", // 12px (was sm)
    headingSmBodyPrimary: "0.8125rem", // 13px (was md)
    headingMd: "0.9375rem", // 15px (was lg)
    headingLg: "1.25rem", // 20px (was xl)
  },

  fontWeight: {
    regular: "450", // Corresponds to "Weight-Regular"
    mediumFigma: "500", // The direct 500 weight from "Heading sm"
    mediumEmphasis: "550", // Corresponds to "Weight-Medium"
    semibold: "650", // Corresponds to "Weight-Semibold"
    bold: "700", // Corresponds to "Weight-Bold"
  },

  lineHeight: {
    fontLhsm: "1.0",
    fontLhLarge: "1.2",
    fontLhMedium: "1.46666666667", // More precision
    fontLhRegular: "1.53846153846", // More precision
    fontLhSmallForm: "1.33333333333", // More precision
    fontLhSmallBody: "1.45454545455", // More precision
  },

  letterSpacing: {
    // From Figma Dev Mode:
    // font-letter-spacing-denser: -0.2px (Heading lg)
    // font-letter-spacing-dense: -0.1px (Heading md)
    // font-letter-spacing-normal: 0px (Others)
    // Naming to reflect Figma's internal naming
    fontLetterSpacingDenser: "-0.2px",
    fontLetterSpacingDense: "-0.1px",
    fontLetterSpacingNormal: "0px",
  },
  radii: {
    sm: "0.125rem", // 2px
    md: "0.25rem", // 4px
    lg: "0.375rem", // 6px
    xl: "0.5rem", // 8px
    full: "9999px", // Full radius for circular elements
  },
  spacing: {
    smallest: "0.125rem", // 2px
    xs: "0.25rem", // 4px
    xxs: "0.5rem", // 6px
    sm: "0.75rem",
    smmd: "1rem",
    md: "1.37rem",
    lg: "1.5rem",
    xl: "2rem",
    tableCellPaddingYCompact: "0.75rem", // 8px
    tableCellPaddingXCompact: "0.75rem", // 12px
    tableCellPaddingYExpanded: "1rem", // 12px
    tableCellPaddingXExpanded: "0.75rem", // 16px
  },
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  },
  zIndices: {
    base: "0",
    sidebar: "1",
    sticky: "10",
    dropdown: "1000",
    modal: "1400",
  },
  // --- Other Primitives ---
  // Spacing, Radii, Shadows would go here if you have them
  // For now, keeping your existing structure (which was empty in the provided snippet for these)
});

// --- COMPOSITE TEXT STYLES (ALIGNED WITH FIGMA DEV MODE CSS) ---
// Common properties for these text styles
export const figmaTextFeatures = {
  fontFeatureSettings: '"liga" off, "clig" off', // Value is a string
  fontStyle: "normal",
};

export const textStyles = {
  headingLg: {
    ...figmaTextFeatures,
    fontFamily: vars.font.body,
    fontSize: vars.fontSize.headingLg, // 20px
    fontWeight: vars.fontWeight.semibold, // 650
    lineHeight: vars.lineHeight.fontLhLarge, // 24px
    letterSpacing: vars.letterSpacing.fontLetterSpacingDenser, // -0.2px
  },
  headingMd: {
    ...figmaTextFeatures,
    fontFamily: vars.font.body,
    fontSize: vars.fontSize.headingMd, // 15px
    fontWeight: vars.fontWeight.mediumEmphasis, // 550
    lineHeight: vars.lineHeight.fontLhMedium, // 22px
    letterSpacing: vars.letterSpacing.fontLetterSpacingDense, // -0.1px
  },
  headingSm: {
    ...figmaTextFeatures,
    fontFamily: vars.font.body,
    fontSize: vars.fontSize.headingSmBodyPrimary, // 13px
    fontWeight: vars.fontWeight.mediumFigma, // 500
    lineHeight: vars.lineHeight.fontLhRegular, // 20px
    letterSpacing: vars.letterSpacing.fontLetterSpacingNormal, // 0px
  },
  headingForm: {
    ...figmaTextFeatures,
    fontFamily: vars.font.body,
    fontSize: vars.fontSize.headingForm, // 12px
    fontWeight: vars.fontWeight.mediumEmphasis, // 550
    lineHeight: vars.lineHeight.fontLhSmallForm, // 16px
    letterSpacing: vars.letterSpacing.fontLetterSpacingNormal, // 0px
  },
  bodyPrimary: {
    // Corresponds to "Text-body/primary/primary"
    ...figmaTextFeatures,
    fontFamily: vars.font.body,
    fontSize: vars.fontSize.headingSmBodyPrimary, // 13px
    fontWeight: vars.fontWeight.regular, // 450
    lineHeight: vars.lineHeight.fontLhRegular, // 20px
    letterSpacing: vars.letterSpacing.fontLetterSpacingNormal, // 0px
  },
  bodySecondary: {
    // Corresponds to "Text-body/secondary/secondary"
    ...figmaTextFeatures,
    fontFamily: vars.font.body,
    fontSize: vars.fontSize.textBodySecondary, // 11px
    fontWeight: vars.fontWeight.regular, // 450
    lineHeight: vars.lineHeight.fontLhSmallBody, // 16px
    letterSpacing: vars.letterSpacing.fontLetterSpacingNormal, // 0px
  },
  bodyMdMono: {
    // You'll need to define what bodyMdMono should be if it's different
    // For now, assuming it might be similar to bodyPrimary but with mono font
    ...figmaTextFeatures, // Or a different color if mono text is styled differently
    fontFamily: vars.font.mono,
    fontSize: vars.fontSize.headingSmBodyPrimary, // 13px (assumption, adjust if needed)
    fontWeight: vars.fontWeight.regular, // 450 (assumption, adjust if needed)
    lineHeight: vars.lineHeight.fontLhRegular, // (assumption, adjust if needed)
    letterSpacing: vars.letterSpacing.fontLetterSpacingNormal, // (assumption, adjust if needed)
  },
};
