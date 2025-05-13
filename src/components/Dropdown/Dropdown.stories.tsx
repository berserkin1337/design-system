import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

// Assuming Input component is in a sibling directory
import { Input } from "../Input"; // Adjust path if needed
import { Button } from "../Button"; // For a generic button trigger

import {
  Dropdown,
  DropdownPanel,
  DropdownItem,
  DropdownSeparator,
} from "./Dropdown";
// import '../../styles/global.css.ts';

// Example Icons (replace with actual components)
const PlusIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24">
    <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
);
const CloudIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M19.35 10.04C18.67 6.59 15.64 4 12 4C9.11 4 6.6 5.64 5.35 8.04C2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5c0-2.64-2.05-4.78-4.65-4.96z"
    />
  </svg>
);
const BarChartIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"
    />
  </svg>
);
const ChevronDownIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6z"
    />
  </svg>
);

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown, // The main wrapper component
  subcomponents: { DropdownPanel, DropdownItem, DropdownSeparator }, // List subcomponents
  tags: ["autodocs"],
  parameters: {
    layout: "centered", // Or 'padded' or provide a decorator with space
  },
  argTypes: {
    // Args for the main Dropdown wrapper
    initialOpen: {
      control: "boolean",
      description: "Initial open state of the dropdown.",
    },
    // children and trigger are complex, better demonstrated via stories
  },
  args: {
    initialOpen: false,
    onOpenChange: fn((isOpen) => console.log("Dropdown open state:", isOpen)),
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const sampleItems = (onItemSelect: (value: string) => void) => [
  <DropdownItem
    key="1"
    onSelect={() => onItemSelect("Profile")}
    leadingIcon={<PlusIcon />}
    trailingContent="⌘ + P"
  >
    Item Title (Profile)
  </DropdownItem>,
  <DropdownItem
    key="2"
    onSelect={() => onItemSelect("Settings")}
    leadingIcon={<CloudIcon />}
    trailingContent="⌘ + S"
    isActive
  >
    Item Title (Settings) - Active
  </DropdownItem>,
  <DropdownSeparator key="sep1" />,
  <DropdownItem
    key="3"
    onSelect={() => onItemSelect("Analytics")}
    leadingIcon={<BarChartIcon />}
    trailingContent="⌘ + A"
  >
    Item Title (Analytics) with a very long label that should be truncated
  </DropdownItem>,
  <DropdownItem key="4" onSelect={() => onItemSelect("Logout")} disabled>
    Logout (Disabled)
  </DropdownItem>,
];

export const Default: Story = {
  name: "With Button Trigger",
  args: {
    trigger: (props) => <Button {...props}>Open Dropdown</Button>,
    children: sampleItems(fn((value) => alert(`Selected: ${value}`))),
  },
};

export const WithInputTrigger: Story = {
  name: "With Input Field as Trigger",
  args: {
    trigger: (props) => {
      const [value, setValue] = useState("");
      return (
        <div style={{ width: "250px" }}>
          {" "}
          {/* Container for input */}
          <Input
            id="service-input" // ID for aria-labelledby on panel
            label="Service Name"
            placeholder="Text Input"
            trailingItem={<ChevronDownIcon />}
            readOnly
            // Pass down props from Dropdown's trigger callback
            onClick={props.onClick}
            aria-expanded={props["aria-expanded"]}
            aria-haspopup={props["aria-haspopup"]}
            // Add style to mimic a button
            style={{ cursor: "pointer" }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      );
    },
    children: sampleItems(
      fn((value) => console.log(`Input selected: ${value}`))
    ),
    panelStyle: { minWidth: "250px" }, // Make panel match input width
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates using an Input component as the trigger for the dropdown. The input is set to `readOnly`.",
      },
    },
  },
};

export const InitiallyOpen: Story = {
  args: {
    initialOpen: true,
    trigger: (props) => <Button {...props}>Dropdown (Initially Open)</Button>,
    children: sampleItems(fn()),
  },
};

// Story for just the panel and items for styling in isolation
export const PanelAndItems: StoryObj<{}> = {
  name: "Panel & Items (Static)",
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ position: "relative", height: "350px", width: "250px" }}>
      {" "}
      {/* Relative container for absolute panel */}
      <DropdownPanel isOpen={true} style={{ position: "static", marginTop: 0 }}>
        {" "}
        {/* Override position for static view */}
        {sampleItems(fn())}
      </DropdownPanel>
    </div>
  ),
};
