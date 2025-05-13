import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { useState } from "react";

import { Checkbox, type CheckboxProps } from "./Checkbox";
// import '../../styles/global.css.ts';

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "padded", // Give some space around
  },
  argTypes: {
    label: { control: "text" },
    size: { control: "select", options: ["small", "medium", "large"] },
    checked: { control: "boolean", description: "Controlled checked state" },
    defaultChecked: {
      control: "boolean",
      description: "Uncontrolled initial state",
    },
    indeterminate: { control: "boolean" },
    disabled: { control: "boolean" },
    onCheckedChange: { action: "checkedChanged" },
  },
  args: {
    label: "Checkbox Label",
    size: "medium",
    disabled: false,
    onCheckedChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const DefaultUnchecked: Story = {
  args: {
    defaultChecked: false,
  },
};

export const DefaultChecked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    // Note: when indeterminate, `checked` state of native input is often false
  },
};

export const Small: Story = {
  args: {
    size: "small",
    defaultChecked: true,
  },
};

export const Large: Story = {
  args: {
    size: "large",
    defaultChecked: true,
  },
};

export const DisabledUnchecked: Story = {
  args: {
    label: "Disabled Unchecked",
    defaultChecked: false,
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "Disabled Checked",
    defaultChecked: true,
    disabled: true,
  },
};

export const DisabledIndeterminate: Story = {
  args: {
    label: "Disabled Indeterminate",
    indeterminate: true,
    disabled: true,
  },
};

export const Controlled: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isChecked, setIsChecked] = useState(false);
    return (
      <Checkbox
        {...args}
        label={`Controlled - ${isChecked ? "Checked" : "Unchecked"}`}
        checked={isChecked}
        onCheckedChange={(checked) => {
          setIsChecked(checked);
          args.onCheckedChange?.(checked);
        }}
      />
    );
  },
};

// Matrix for visual testing
export const AllStatesMatrix: Story = {
  name: "Matrix - Visual Test",
  render: (args) => {
    const sizes: Array<CheckboxProps["size"]> = ["small", "medium", "large"];
    const checkedStates: Array<[string, Partial<CheckboxProps>]> = [
      ["Unchecked", { defaultChecked: false, indeterminate: false }],
      ["Checked", { defaultChecked: true, indeterminate: false }],
      ["Indeterminate", { defaultChecked: false, indeterminate: true }], // indeterminate often implies checked=false for native
    ];
    const disabledStates = [false, true];

    return (
      <table>
        <thead>
          <tr>
            <th>Size</th>
            <th>State</th>
            <th>Disabled</th>
            <th>Checkbox</th>
          </tr>
        </thead>
        <tbody>
          {sizes.map((size) =>
            checkedStates.map(([stateName, stateProps]) =>
              disabledStates.map((isDisabled) => (
                <tr key={`${size}-${stateName}-${isDisabled}`}>
                  <td>{size}</td>
                  <td>{stateName}</td>
                  <td>{isDisabled ? "Yes" : "No"}</td>
                  <td>
                    <Checkbox
                      {...args}
                      label={`${size} ${stateName} ${isDisabled ? "Dis" : ""}`}
                      size={size}
                      {...stateProps}
                      disabled={isDisabled}
                      // For controlled stories, you might need to manage state here or pass `checked`
                    />
                  </td>
                </tr>
              ))
            )
          )}
        </tbody>
      </table>
    );
  },
};
