import type { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, within } from "@storybook/test";
import { Tag } from "./Tag";
import { type TagVariants } from "./Tag.css";

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="1em"
    height="1em"
  >
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
);
// RemoveIcon is now internal to Tag.tsx

const meta: Meta<typeof Tag> = {
  title: "Components/Tag",
  component: Tag,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: { control: "select", options: ["medium", "large"] },
    disabled: { control: "boolean" },
    children: { control: "text" },
    leadingIcon: { control: false },
    onRemove: { action: "removed" },
    // isFocused argType removed
  },
  args: {
    children: "Label",
    size: "medium",
    disabled: false,
    onRemove: undefined,
    leadingIcon: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const DefaultMedium: Story = {
  name: "Medium - Default",
  args: {
    children: "Tag Label",
    size: "medium",
  },
};

export const DefaultLarge: Story = {
  name: "Large - Default",
  args: {
    children: "Tag Label",
    size: "large",
  },
};

export const WithLeadingIcon: Story = {
  args: {
    children: "With Icon",
    leadingIcon: <PlusIcon />,
  },
};

export const Removable: Story = {
  name: "Removable (with X icon)",
  args: {
    children: "Removable Tag",
    onRemove: fn(() => alert("Tag remove clicked!")),
  },
};

export const WithLeadingIconAndRemovable: Story = {
  args: {
    children: "Full Tag",
    leadingIcon: <PlusIcon />,
    onRemove: fn(),
  },
};

export const DisabledTag: Story = {
  // Renamed for clarity
  name: "Disabled (with icons)",
  args: {
    children: "Disabled Tag",
    disabled: true,
    leadingIcon: <PlusIcon />,
    onRemove: fn(),
  },
};

// Story to specifically test focus on the remove button
export const FocusOnRemoveButton: Story = {
  name: "Removable - Focus on X",
  args: {
    children: "Focus X",
    onRemove: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Wait for the component to render and find the button
    // Adjust selector if needed, e.g., if using a specific data-testid
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //@ts-ignore
    const removeButton = await canvas.findByRole("button", {
      name: /Remove Focus X/i,
    });
    await userEvent.tab(); // Simulate tabbing to the button
    // Or: await removeButton.focus(); // Directly focus
    // Add an assertion here if you have visual regression testing for the outline
  },
  decorators: [
    // Optional: to ensure it's visually clear in the story
    (Story) => (
      <div style={{ padding: "20px" }}>
        <Story />
      </div>
    ),
  ],
};

export const AllVariants: Story = {
  name: "Matrix - Sizes & States (Focus on X)",
  render: (baseArgs) => {
    const sizes: Array<TagVariants["size"]> = ["medium", "large"];
    // Simplified states for the matrix, focus tested separately
    const states = [
      { name: "Default", props: { disabled: false } },
      { name: "Disabled", props: { disabled: true } },
    ];
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {sizes.map((size) => (
          <div key={size}>
            <h3
              style={{
                fontFamily: "sans-serif",
                fontSize: "14px",
                marginBottom: "8px",
                textTransform: "capitalize",
              }}
            >
              {size} Tags
            </h3>
            <div
              style={{
                display: "flex",
                gap: "16px",
                flexWrap: "wrap",
                alignItems: "flex-start",
              }}
            >
              {states.map((state) => (
                <div
                  key={state.name}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "sans-serif",
                      fontSize: "12px",
                      margin: 0,
                    }}
                  >
                    {state.name}
                  </p>
                  {/* Example 1: Removable */}
                  <Tag
                    {...baseArgs}
                    size={size}
                    {...state.props}
                    onRemove={state.props.disabled ? undefined : fn()}
                    aria-label={`Tag ${size} ${state.name} removable`}
                  >
                    Label
                  </Tag>
                  {/* Example 2: Full */}
                  <Tag
                    {...baseArgs}
                    size={size}
                    {...state.props}
                    leadingIcon={<PlusIcon />}
                    onRemove={state.props.disabled ? undefined : fn()}
                    aria-label={`Tag ${size} ${state.name} full`}
                  >
                    Label
                  </Tag>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
