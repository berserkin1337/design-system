import type { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, within } from "@storybook/test";

import { Input } from "./"; // Assuming barrel file

// Example Icons (replace with actual components)
const ChevronDownIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6z"
    />
  </svg>
);
const SearchIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"
    />
  </svg>
);

const meta: Meta<typeof Input> = {
  title: "Components/Input Field",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    size: { control: "select", options: ["small", "regular"] },
    state: {
      control: "select",
      options: ["default", "error", "warning", "success", "info"],
    },
    label: { control: "text" },
    helpText: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    trailingItem: { control: false },
    type: {
      control: "select",
      options: ["text", "password", "email", "number", "search"],
    },
    isFocused: {
      control: "boolean",
      description: "Control focus state for Storybook",
    },
    // helpTextProps.variant is not directly controllable from top level args here easily
  },
  args: {
    label: "Service Name",
    placeholder: "Text Input",
    size: "regular",
    state: "default",
    disabled: false,
    type: "text",
    onClick: fn(),
    onFocus: fn(),
    onBlur: fn(),
    isFocused: false,
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    helpText: "Only numbers between 100 - 1000 are allowed",
  },
};

export const Small: Story = {
  args: {
    label: "Small Input",
    size: "small",
    placeholder: "Enter small text",
  },
};

export const WithTrailingIcon: Story = {
  args: {
    label: "Dropdown Select",
    trailingItem: <ChevronDownIcon />,
    placeholder: "Select an option",
    helpText: "Choose one from the list.",
  },
};

export const WithSearchIcon: Story = {
  args: {
    label: "Search",
    type: "search",
    trailingItem: <SearchIcon />,
    placeholder: "Search items...",
  },
};

export const ErrorState: Story = {
  args: {
    label: "Email Address",
    state: "error",
    type: "email",
    defaultValue: "invalid-email",
    helpText: "Please enter a valid email address.",
    // helpTextProps: { variant: 'error' } // Handled by Input component based on `state`
  },
};

export const SuccessState: Story = {
  args: {
    label: "Username",
    state: "success",
    defaultValue: "ValidUser",
    helpText: "Username is available!",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    defaultValue: "Cannot edit",
    disabled: true,
    helpText: "This field is not editable.",
    trailingItem: <ChevronDownIcon />,
  },
};

export const FocusedState: Story = {
  name: "Focus Demo (Visual)",
  args: {
    label: "Focus on me",
    placeholder: "I will get a focus ring",
    isFocused: true, // For visual style
  },
  // To actually focus the input for real in Storybook:
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const inputElement = await canvas.findByPlaceholderText(
      "I will get a focus ring"
    );
    await userEvent.click(inputElement); // Or inputElement.focus();
  },
};

export const Password: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    helpText: "Password must be at least 8 characters.",
  },
};

// Full example with all parts
export const FullExample: Story = {
  render: (args) => (
    <div
      style={{
        width: "300px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <Input
        {...args}
        label="Service Name"
        placeholder="Text Input"
        trailingItem={<ChevronDownIcon />}
        helpText="Only numbers between 100 ~ 1000 are allowed"
      />
      <Input
        {...args}
        label="Item Title (Error)"
        state="error"
        defaultValue="Problem here"
        trailingItem={<span>⌘ + E</span>}
        helpText="This field has an error."
      />
      <Input
        {...args}
        size="small"
        label="Small Search"
        type="search"
        placeholder="Search..."
        trailingItem={<SearchIcon />}
      />
    </div>
  ),
};
