import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { vars } from "../../styles/theme.css";

import { Link } from "./Link";
// import '../../styles/global.css.ts'; // Ensure global styles are loaded

// Example Icons from the spec (simplified)
const PlusIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
);
const CheckIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </svg>
);

const meta: Meta<typeof Link> = {
  title: "Components/Link",
  component: Link,
  tags: ["autodocs"],
  parameters: {
    layout: "padded", // Links are often inline, 'padded' gives some space
    // Optional: Add backgrounds for testing the 'white' variant
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#FFFFFF" },
        { name: "dark", value: vars.colors.primary300 }, // Example dark background
      ],
    },
  },
  argTypes: {
    colorVariant: {
      control: "select",
      options: ["primary", "black", "danger", "success", "warning", "white"],
      description: "The color scheme of the link.",
    },
    as: {
      control: "select",
      options: ["a", "button"],
      description: "Render as an anchor or a button element.",
    },
    href: {
      control: "text",
      if: { arg: "as", eq: "a" },
      description: 'URL for the link (if `as="a"`).',
    },
    disabled: {
      control: "boolean",
      description: "Disables the link.",
    },
    children: {
      control: "text",
      description: "The text content of the link.",
    },
    icon: {
      control: false, // ReactNode is hard to control, show via specific stories
      description: "Optional icon to display with the link.",
    },
    onClick: {
      action: "clicked",
      description: "Click event handler.",
    },
    // Button specific type attribute
    type: {
      name: "type (HTML for button)",
      control: "select",
      options: [undefined, "button", "submit", "reset"],
      if: { arg: "as", eq: "button" },
      description: 'HTML button type attribute (if `as="button"`).',
    },
  },
  args: {
    // Default args
    children: "Link Text",
    colorVariant: "primary",
    as: "a",
    href: "#", // Default href for 'a'
    disabled: false,
    onClick: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    children: "Primary Link",
  },
};

export const Black: Story = {
  args: {
    colorVariant: "black",
    children: "Black Link",
  },
};

export const Danger: Story = {
  args: {
    colorVariant: "danger",
    children: "Danger Link",
  },
};

export const Success: Story = {
  args: {
    colorVariant: "success",
    children: "Success Link",
  },
};

export const Warning: Story = {
  args: {
    colorVariant: "warning",
    children: "Warning Link",
  },
};

export const WhiteOnDark: Story = {
  name: "White (on Dark Background)",
  args: {
    colorVariant: "white",
    children: "White Link",
  },
  parameters: {
    backgrounds: { default: "dark" }, // Use the dark background defined above
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled Link",
    disabled: true,
  },
};

export const WithIcon: Story = {
  args: {
    children: "Link with Icon",
    icon: <CheckIcon />, // Example icon
    colorVariant: "success",
  },
};

export const AsButton: Story = {
  name: "As <button>",
  args: {
    as: "button",
    children: "Action Link",
    onClick: fn(() => alert("Button action triggered!")),
    type: "button", // HTML button type
  },
};

export const AsDisabledButton: Story = {
  name: "As <button> (Disabled)",
  args: {
    as: "button",
    children: "Disabled Action",
    disabled: true,
  },
};

// Story to demonstrate all color variants
const AllColorVariantsTemplate: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Link {...args} colorVariant="primary">
        Primary Link {args.icon && args.icon}
      </Link>
      <Link {...args} colorVariant="black">
        Black Link {args.icon && args.icon}
      </Link>
      <Link {...args} colorVariant="danger">
        Danger Link {args.icon && args.icon}
      </Link>
      <Link {...args} colorVariant="success">
        Success Link {args.icon && args.icon}
      </Link>
      <Link {...args} colorVariant="warning">
        Warning Link {args.icon && args.icon}
      </Link>
      <div
        style={{
          backgroundColor: vars.colors.primary300,
          padding: "10px",
          borderRadius: vars.radii.md,
        }}
      >
        <Link {...args} colorVariant="white">
          White Link {args.icon && args.icon}
        </Link>
      </div>
    </div>
  ),
};

export const AllColors: Story = {
  ...AllColorVariantsTemplate,
  name: "All Colour Variants",
  args: {
    children: "", // Children will be set by the template
    as: "a",
    href: "#",
  },
};

export const AllColorsWithIcons: Story = {
  ...AllColorVariantsTemplate,
  name: "All Colours With Icons",
  args: {
    children: "",
    icon: <PlusIcon />,
    as: "a",
    href: "#",
  },
};
