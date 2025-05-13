// src/components/Switch/Switch.css.ts
import { style } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../styles/theme.css"; // Adjust path as needed

// --- Base Styles for the Switch Button ---
const baseSwitch = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center", // Centers thumb if track is larger
  position: "relative",
  cursor: "pointer",
  border: "none", // No border on the button itself
  padding: "2px", // Small padding to allow focus ring to be clearly outside track
  backgroundColor: "transparent", // Button itself is transparent, track has color
  borderRadius: vars.radii.full, // For the focus outline to be pill-shaped around the button
  outline: "none", // Custom focus styling

  transition: "opacity 0.2s ease-in-out", // For disabled state opacity

  selectors: {
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.5, // Overall opacity for disabled state
    },
    "&:focus-visible": {
      // Blueish glow/outline around the whole switch
      // boxShadow: `0 0 0 3px ${vars.colors.opacityPrimary15}`,
      outline: `4px solid #D1DFFF`,
      outlineOffset: "-1px",
    },
  },
});

// --- Track Styles ---
// The visible background part of the switch
const trackBase = style({
  display: "block",
  position: "relative", // For thumb positioning if absolute
  borderRadius: vars.radii.full, // Pill shape
  transition: "background-color 0.2s ease-in-out",
});

// --- Thumb Styles ---
// The circular part that slides
const thumbBase = style({
  display: "block",
  position: "absolute",
  top: "50%",
  // left will be handled by isChecked variant
  borderRadius: vars.radii.full, // Circle
  backgroundColor: vars.colors.surface0, // Default white, changes when off
  // boxShadow: vars.shadows.sm, // Subtle shadow for depth
  transition: "transform 0.2s ease-in-out, background-color 0.2s ease-in-out",
});

// --- Recipe for the Switch (applied to the button element) ---
export const switchRecipe = recipe({
  base: baseSwitch,
  variants: {
    size: {
      small: {
        // These dimensions are for the button wrapper to size focus outline correctly
        // Track and thumb will have their own dimensions based on these.
      },
      medium: {},
    },
    // No actual style changes directly on the button for isChecked or hover,
    // those affect the child track and thumb.
    // We could add data-attributes for state if needed for complex child selectors,
    // but direct variant styling on track and thumb is cleaner.
  },
  defaultVariants: {
    size: "medium",
  },
});

export type SwitchVariants = NonNullable<RecipeVariants<typeof switchRecipe>>;

// --- Recipe for the Track ---
export const trackRecipe = recipe({
  base: trackBase,
  variants: {
    size: {
      small: {
        width: "28px", // Example: 2 * thumb size + some travel
        height: "16px", // Example
      },
      medium: {
        width: "36px", // Example
        height: "20px", // Example
      },
    },
    isChecked: {
      true: {
        backgroundColor: vars.colors.primary200, // Blue when on
        selectors: {
          [`${baseSwitch}:hover:not(:disabled) &`]: {
            // Target track when parent button is hovered
            backgroundColor: vars.colors.primary300, // Darker blue on hover when on
          },
        },
      },
      false: {
        backgroundColor: vars.colors.surface300, // Grey when off
        selectors: {
          [`${baseSwitch}:hover:not(:disabled) &`]: {
            backgroundColor: vars.colors.surface400, // Darker grey on hover when off
          },
        },
      },
    },
    isDisabled: {
      // To handle specific disabled track colors if opacity isn't enough
      true: {
        backgroundColor: vars.colors.textDisabled, // Very light grey for disabled track
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

export type TrackVariants = RecipeVariants<typeof trackRecipe>;

// --- Recipe for the Thumb ---
export const thumbRecipe = recipe({
  base: thumbBase,
  variants: {
    size: {
      small: {
        width: "12px", // Matches icon size in spec
        height: "12px",
        // Positioning: (trackHeight - thumbHeight) / 2
        // If track height is 16px, thumb 12px: (16-12)/2 = 2px from top/bottom
        transform: "translateY(-50%) translateX(2px)", // Initial position for 'off'
      },
      medium: {
        width: "16px", // Matches icon size
        height: "16px",
        // If track height is 20px, thumb 16px: (20-16)/2 = 2px
        transform: "translateY(-50%) translateX(2px)",
      },
    },
    isChecked: {
      true: {
        backgroundColor: vars.colors.surface0, // White when on
        // Slide to the right. Calculation: trackWidth - thumbWidth - initialOffset
        // Small: 28 - 12 - 2 = 14px
        // Medium: 36 - 16 - 2 = 18px
      },
      false: {
        backgroundColor: vars.colors.surface0, // Grey when off
        // transform is already set by size for 'off' state
      },
    },
    isDisabled: {
      // To handle specific disabled thumb colors
      true: {
        backgroundColor: vars.colors.surface0, // Slightly darker grey for disabled thumb
        boxShadow: "none",
      },
      false: {},
    },
  },
  // Compound variants to handle sliding based on size AND isChecked
  compoundVariants: [
    // Small - Checked
    {
      variants: { size: "small", isChecked: true },
      style: {
        transform: "translateY(-50%) translateX(calc(28px - 12px - 2px))",
      }, // 28w - 12thumb - 2offset = 14px
    },
    // Medium - Checked
    {
      variants: { size: "medium", isChecked: true },
      style: {
        transform: "translateY(-50%) translateX(calc(36px - 16px - 2px))",
      }, // 36w - 16thumb - 2offset = 18px
    },
  ],
  defaultVariants: {
    size: "medium",
    isChecked: false,
    isDisabled: false,
  },
});

export type ThumbVariants = RecipeVariants<typeof thumbRecipe>;
