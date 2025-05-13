import type { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, within } from "@storybook/test";
import { useState } from "react";

import { Switch } from "./Switch";
import { Button } from "../Button";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium"],
    },
    isChecked: {
      control: "boolean",
      description: "Controlled checked state of the switch.",
    },
    defaultChecked: {
      control: "boolean",
      description:
        "Initial checked state for uncontrolled switch (if `isChecked` is not provided).",
    },
    disabled: {
      control: "boolean",
    },
    onChange: {
      action: "changed",
      description: "Callback when the switch state changes.",
    },
    "aria-label": {
      control: "text",
      description:
        "Accessible label if no visible label is associated via aria-labelledby.",
    },
  },
  args: {
    // Default args
    size: "medium",
    disabled: false,
    onChange: fn(),
    "aria-label": "Toggle Feature", // Provide a default aria-label
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const DefaultMediumOff: Story = {
  name: "Medium - Off",
  args: {
    defaultChecked: false,
  },
};

export const DefaultMediumOn: Story = {
  name: "Medium - On",
  args: {
    defaultChecked: true,
  },
};

export const SmallOff: Story = {
  name: "Small - Off",
  args: {
    size: "small",
    defaultChecked: false,
  },
};

export const SmallOn: Story = {
  name: "Small - On",
  args: {
    size: "small",
    defaultChecked: true,
  },
};

export const DisabledMediumOff: Story = {
  name: "Medium - Off (Disabled)",
  args: {
    defaultChecked: false,
    disabled: true,
  },
};

export const DisabledMediumOn: Story = {
  name: "Medium - On (Disabled)",
  args: {
    defaultChecked: true,
    disabled: true,
  },
};

export const DisabledSmallOff: Story = {
  name: "Small - Off (Disabled)",
  args: {
    size: "small",
    defaultChecked: false,
    disabled: true,
  },
};

export const DisabledSmallOn: Story = {
  name: "Small - On (Disabled)",
  args: {
    size: "small",
    defaultChecked: true,
    disabled: true,
  },
};

// Controlled Switch Story
export const ControlledSwitch: Story = {
  name: "Controlled State",
  render: (args) => {
    const ControlledSwitchComponent = () => {
      const [isChecked, setIsChecked] = useState(args.isChecked ?? false);
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Switch
            {...args}
            isChecked={isChecked}
            onChange={(checked) => {
              setIsChecked(checked);
              args.onChange?.(checked); // Call the Storybook action
            }}
          />
          <Button onClick={() => setIsChecked(!isChecked)}>
            Toggle Externally
          </Button>
          <p>Current state: {isChecked ? "On" : "Off"}</p>
        </div>
      );
    };
    return <ControlledSwitchComponent />;
  },
  args: {
    isChecked: false, // Initial controlled state
  },
};

export const FocusInteraction: Story = {
  name: "Focus Interaction",
  args: {
    "aria-label": "Focusable Switch",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    //@ts-ignore
    const switchControl = await canvas.findByRole("switch");
    await userEvent.tab(); // Tab to the switch
    // Add assertions here for visual regression testing of focus state if possible
  },
};

// Matrix for visual testing
