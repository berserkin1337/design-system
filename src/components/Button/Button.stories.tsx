import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Button } from "./Button";
// import '../../styles/global.css.ts'; // If needed

const StarIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
  </svg>
);

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    type: {
      control: "select",
      options: ["primary", "secondary", "tertiary"],
    },
    size: {
      control: "select",
      options: ["small", "regular", "large"],
    },
    ifFullWidth: { control: "boolean" },
    iconOnly: { control: "boolean" },
    isLoading: { control: "boolean" },
    disabled: { control: "boolean" },
    iconBefore: { control: false },
    iconAfter: { control: false },
    // 'as' and 'href' argTypes are removed
    children: { control: "text" },
    onClick: { action: "clicked" },
    "aria-label": { control: "text" },
    className: { control: "text" },
    // HTML button specific type (submit, reset, button)
    // htmlType: {
    //   // Renamed from 'type' to avoid conflict with our 'type' variant prop
    //   name: "type (HTML)", // Display name in Storybook
    //   control: "select",
    //   options: ["button", "submit", "reset"],
    //   description: "HTML button type attribute.",
    //   table: { category: "HTML Attributes" }, // Group in Storybook table
    // },
  },
  args: {
    children: "Button Text",
    buttonType: "primary",
    size: "regular",
    ifFullWidth: false,
    iconOnly: false,
    isLoading: false,
    disabled: false,
    onClick: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

// Map htmlType arg to the actual 'type' prop for the button element
const mapHtmlTypeToProps = (args: Story["args"]) => ({
  ...args,
});

export const Default: Story = {
  args: {
    children: "Default Button",
  },
  render: (args) => <Button {...mapHtmlTypeToProps(args)} />,
};

export const Primary: Story = {
  args: {
    buttonType: "primary",
    children: "Primary Button",
  },
  render: (args) => <Button {...mapHtmlTypeToProps(args)} />,
};

export const Secondary: Story = {
  args: {
    buttonType: "secondary",
    children: "Secondary Button",
  },
  render: (args) => <Button {...mapHtmlTypeToProps(args)} />,
};

export const Tertiary: Story = {
  args: {
    buttonType: "tertiary",
    children: "Tertiary Button",
  },
  render: (args) => <Button {...mapHtmlTypeToProps(args)} />,
};

export const Small: Story = {
  args: {
    size: "small",
    children: "Small Button",
  },
  render: (args) => <Button {...mapHtmlTypeToProps(args)} />,
};

export const Regular: Story = {
  args: {
    size: "regular",
    children: "Regular Button",
  },
  render: (args) => <Button {...mapHtmlTypeToProps(args)} />,
};

export const Large: Story = {
  args: {
    size: "large",
    children: "Large Button",
  },
  render: (args) => <Button {...mapHtmlTypeToProps(args)} />,
};

export const FullWidth: Story = {
  args: {
    ifFullWidth: true,
    children: "Full Width Button",
  },
  decorators: [
    (
      StoryComponent,
      { args } // Pass args to decorator if needed for mapHtmlTypeToProps
    ) => (
      <div
        style={{
          width: "300px",
          padding: "10px",
          border: "1px dashed lightgray",
        }}
      >
        <StoryComponent args={mapHtmlTypeToProps(args)} />
      </div>
    ),
  ],
  render: (args) => <Button {...mapHtmlTypeToProps(args)} />, // Still need render here for the Story itself
};

export const WithIconBefore: Story = {
  args: {
    children: "Icon Before",
    iconBefore: <StarIcon />,
  },
  render: (args) => <Button {...mapHtmlTypeToProps(args)} />,
};

export const WithIconAfter: Story = {
  args: {
    children: "Icon After",
    iconAfter: <StarIcon />,
  },
  render: (args) => <Button {...mapHtmlTypeToProps(args)} />,
};

export const IconOnly: Story = {
  args: {
    iconOnly: true,
    children: <StarIcon />,
    "aria-label": "Favorite Item",
  },
  render: (args) => <Button {...mapHtmlTypeToProps(args)} />,
};

export const IconOnlyWithAccessibleText: Story = {
  args: {
    iconOnly: true,
    iconBefore: <StarIcon />,
    children: "Mark as Favorite Item",
  },
  render: (args) => <Button {...mapHtmlTypeToProps(args)} />,
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled Button",
  },
  render: (args) => <Button {...mapHtmlTypeToProps(args)} />,
};

export const Loading: Story = {
  args: {
    isLoading: true,
    children: "Loading State",
  },
  render: (args) => <Button {...mapHtmlTypeToProps(args)} />,
};

export const InteractiveLoading: Story = {
  args: {
    children: "Click to Load Data",
    buttonType: "secondary",
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isLoading, setIsLoading] = useState(false);
    const mappedArgs = mapHtmlTypeToProps(args); // Map htmlType

    const handleClick = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      // Use mappedArgs.onClick if it's defined, or args.onClick
      (mappedArgs.onClick || args.onClick)?.(e);
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2500);
    };
    return (
      <Button {...mappedArgs} isLoading={isLoading} onClick={handleClick}>
        {isLoading ? "Processing..." : mappedArgs.children}
      </Button>
    );
  },
};

// Stories for 'as="a"' are removed.

// Story for different HTML button types (submit, reset)
export const SubmitButton: Story = {
  name: "HTML Type: Submit",
  args: {
    children: "Submit Form",
    buttonType: "primary", // Our styling type
  },
  decorators: [
    (StoryComponent, { args }) => (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fn()(e);
          alert("Form Submitted!");
        }}
      >
        <StoryComponent args={mapHtmlTypeToProps(args)} />
      </form>
    ),
  ],
  render: (args) => <Button {...mapHtmlTypeToProps(args)} />,
};

export const AllPropsPlayground: Story = {
  name: "⚙️ Playground",
  args: {
    buttonType: "primary",
    size: "regular",
    children: "Playground Button",
    iconBefore: <StarIcon />,
  },
  render: (args) => <Button {...mapHtmlTypeToProps(args)} />,
};
