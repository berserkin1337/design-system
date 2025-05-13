import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { IconButton } from "./IconButton";
// import '../../styles/global.css.ts'; // If needed

// Example X Icon (replace with your actual icon component or SVG)
const CloseIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

const meta: Meta<typeof IconButton> = {
  title: "Components/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    emphasis: {
      control: "select",
      options: ["intense", "subtle"],
      description: "Visual emphasis of the icon button.",
    },
    size: {
      control: "select",
      options: ["12px", "16px", "20px"],
      description: "Size of the icon within the button.",
    },
    icon: {
      control: false, // ReactNode is hard to control
      description: "The icon element to display.",
    },
    "aria-label": {
      control: "text",
      description: "Accessible label for the icon button (required).",
    },
    disabled: {
      control: "boolean",
      description: "Disables the button.",
    },
    onClick: {
      action: "clicked",
      description: "Click event handler.",
    },
    // HTML button specific type (submit, reset, button)
    type: {
      name: "type (HTML)", // Display name in Storybook
      control: "select",
      options: ["button", "submit", "reset"],
      description: "HTML button type attribute.",
    },
  },
  args: {
    // Default args for all stories
    icon: <CloseIcon />,
    "aria-label": "Close",
    emphasis: "intense",
    size: "16px",
    disabled: false,
    onClick: fn(),
    type: "button",
  },
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    "aria-label": "Default Action",
  },
};

// --- Emphasis Stories ---
export const IntenseEmphasis: Story = {
  args: {
    emphasis: "intense",
    "aria-label": "Intense Action",
  },
};

export const SubtleEmphasis: Story = {
  args: {
    emphasis: "subtle",
    "aria-label": "Subtle Action",
  },
};

// --- Size Stories ---
export const Size12px: Story = {
  args: {
    size: "12px",
    "aria-label": "Small Action",
  },
};

export const Size16px: Story = {
  args: {
    size: "16px",
    "aria-label": "Medium Action",
  },
};

export const Size20px: Story = {
  args: {
    size: "20px",
    "aria-label": "Large Action",
  },
};

// --- State Stories ---
export const Disabled: Story = {
  args: {
    disabled: true,
    "aria-label": "Disabled Action",
  },
};

// Helper to render all variants for easy visual comparison
const AllVariantsTemplate: Story = {
  render: (args) => {
    const emphases = ["intense", "subtle"] as const;
    const sizes = ["12px", "16px", "20px"] as const;
    const states = [
      { name: "Default", props: {} },
      // Note: Hover, Focus, Active states are best tested interactively in Storybook.
      // We can show the disabled state though.
      { name: "Disabled", props: { disabled: true } },
    ];

    return (
      <div
        style={{
          display: "grid",
          gap: "20px",
          gridTemplateColumns: `repeat(${
            states.length * emphases.length
          }, auto)`,
        }}
      >
        {sizes.map((size) =>
          emphases.map((emphasis) =>
            states.map((state) => (
              <div
                key={`${size}-${emphasis}-${state.name}`}
                style={{ textAlign: "center" }}
              >
                <IconButton
                  {...args}
                  icon={args.icon || <CloseIcon />}
                  emphasis={emphasis}
                  size={size}
                  {...state.props}
                  aria-label={`${emphasis} ${size} ${state.name}`}
                />
                <p
                  style={{ fontSize: "10px", marginTop: "4px", color: "#666" }}
                >
                  {size} / {emphasis} / {state.name}
                </p>
              </div>
            ))
          )
        )}
      </div>
    );
  },
};

export const VisualTestMatrix: Story = {
  ...AllVariantsTemplate,
  name: "Visual Test Matrix (Default & Disabled)",
  args: {
    // Base args for the matrix, individual props are overridden in render
  },
};
