import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { useState } from "react";

import { Radio, type RadioProps } from "./Radio"; // Assuming RadioProps is exported

const meta: Meta<typeof Radio> = {
  title: "Components/Radio",
  component: Radio,
  tags: ["autodocs"],
  parameters: {
    layout: "padded", // Give some space around
  },
  argTypes: {
    label: { control: "text" },
    size: { control: "select", options: ["small", "medium", "large"] },
    checked: { control: "boolean", description: "Controlled checked state" },
    disabled: { control: "boolean" },
    onCheckedChange: { action: "checkedChanged" },
    name: {
      control: "text",
      description: "Name attribute for grouping radio buttons.",
    },
    value: {
      control: "text",
      description: "Value attribute for the radio button.",
    },
  },
  args: {
    // Default args
    label: "Radio Option",
    size: "medium",
    disabled: false,
    onCheckedChange: fn(),
    name: "storybook-radio-group", // Default name for grouping in stories
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const DefaultUnselected: Story = {
  name: "Medium - Unselected",
  args: {
    checked: false,
    value: "option1",
    label: ""
  },
};

export const DefaultSelected: Story = {
  name: "Medium - Selected",
  args: {
    checked: true,
    value: "option1",
    label: ""
  },
};

export const Small: Story = {
  name: "Small - Selected",
  args: {
    size: "small",
    checked: true,
    value: "option_small",
    label: ""
  },
};

export const Large: Story = {
  name: "Large - Selected",
  args: {
    size: "large",
    checked: true,
    value: "option_large",
    label: ""
  },
};

export const DisabledUnselected: Story = {
  args: {
    label: "",
    checked: false,
    disabled: true,
    value: "option_dis_un",
  },
};

export const DisabledSelected: Story = {
  args: {
    label: "",
    checked: true,
    disabled: true,
    value: "option_dis_sel",
  },
};

// --- Radio Group Example (Controlled) ---
const RadioGroupStory: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedValue, setSelectedValue] = useState<string | undefined>(
      args.value || "opt2"
    );
    const groupName = args.name || "controlled-group";

    const handleChange = (value: string | undefined) => {
      setSelectedValue(value);
      // For a radio, onCheckedChange(true) means it was selected.
      // The actual value selected is more important.
      args.onCheckedChange?.(true); // Call the action
      fn((val) => alert(`Selected value: ${val}`))(value); // Simulate another action
    };

    return (
      <fieldset
        style={{
          border: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <legend style={{ fontWeight: "bold", marginBottom: "8px" }}>
          Choose an option:
        </legend>
        <Radio
          {...args} // Spread base args like size, disabled (if set for whole group)
          label="Option 1"
          name={groupName}
          value="opt1"
          checked={selectedValue === "opt1"}
          onCheckedChange={() => handleChange("opt1")}
        />
        <Radio
          {...args}
          label="Option 2"
          name={groupName}
          value="opt2"
          checked={selectedValue === "opt2"}
          onCheckedChange={() => handleChange("opt2")}
        />
        <Radio
          {...args}
          label="Option 3 (Disabled)"
          name={groupName}
          value="opt3"
          checked={selectedValue === "opt3"}
          onCheckedChange={() => handleChange("opt3")}
          disabled={true} // Individual radio can be disabled
        />
        <Radio
          {...args}
          size="small"
          label="Option 4 (Small)"
          name={groupName}
          value="opt4"
          checked={selectedValue === "opt4"}
          onCheckedChange={() => handleChange("opt4")}
        />
        <p style={{ marginTop: "10px", fontSize: "12px" }}>
          Selected: {selectedValue || "None"}
        </p>
      </fieldset>
    );
  },
};

export const ControlledGroup: Story = {
  ...RadioGroupStory,
  name: "Controlled Radio Group",
  args: {
    // Initial selected value for the group can be set via args if needed,
    // but the render function initializes its own state for `selectedValue`.
    // This story mainly demonstrates the grouping.
    // `value` in args here would be for the first radio if not managed by internal state.
    // `name` will be used by the render function.
  },
};

// Matrix for visual testing (individual radio states)
export const AllStatesMatrix: Story = {
  name: "Matrix - Visual Test (Individual Radios)",
  render: (args) => {
    const sizes: Array<RadioProps["size"]> = ["small", "medium", "large"];
    const checkedStates = [false, true];
    const disabledStates = [false, true];

    return (
      <table>
        <thead>
          <tr>
            <th>Size</th>
            <th>Checked</th>
            <th>Disabled</th>
            <th>Radio</th>
          </tr>
        </thead>
        <tbody>
          {sizes.map((size) =>
            checkedStates.map((isChecked) =>
              disabledStates.map((isDisabled) => (
                <tr key={`${size}-${isChecked}-${isDisabled}`}>
                  <td>{size}</td>
                  <td>{isChecked ? "Selected" : "Unselected"}</td>
                  <td>{isDisabled ? "Yes" : "No"}</td>
                  <td>
                    <Radio
                      {...args} // Base args like name
                      label={`${size} ${isChecked ? "Sel" : "Unsel"} ${
                        isDisabled ? "Dis" : ""
                      }`}
                      size={size}
                      checked={isChecked} // For this matrix, control directly
                      disabled={isDisabled}
                      value={`${size}-${isChecked}-${isDisabled}`}
                      // onCheckedChange will be the mocked fn() from args
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
