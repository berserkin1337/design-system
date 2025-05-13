// src/components/Table/Table.stories.tsx
import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { vars } from "../../styles/theme.css";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
  cellMemberAvatar,
  cellMemberName,
  cellStatusIcon as cellStatusIconStyle,
  type TableRowProps,
} from "./";

import { Checkbox } from "../Checkbox";
import { IconButton } from "../IconButton";

// --- Example Icons ---
const EditIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75l1.83-1.83z"
    />
  </svg>
);

const CopyIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
    />
  </svg>
);

const DeleteIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12l1.41 1.41L13.41 14l2.12 2.12l-1.41 1.41L12 15.41l-2.12 2.12l-1.41-1.41L10.59 14l-2.12-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"
    />
  </svg>
);

const PlusIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    style={{ verticalAlign: "middle" }}
  >
    <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
);

const StatusDot = ({ color }: { color: string }) => (
  <span className={cellStatusIconStyle} style={{ backgroundColor: color }} />
);

const AvatarPlaceholder = () => <div className={cellMemberAvatar} />;

interface TableStoryProps {
  cellSize?: "compact" | "expanded";
  showFocusOnSelected?: boolean;
}

// Extend the Table component's props
declare module "./" {
  interface TableProps
    extends React.TableHTMLAttributes<HTMLTableElement>,
      TableStoryProps {}
  interface TableRowProps {
    isHeaderRow?: boolean;
    isSelected?: boolean;
    isSpecActiveOrFocused?: boolean;
  }
}

interface ColumnDef {
  id: string;
  Header: React.ReactNode | ((props: HeaderProps) => React.ReactNode);
  Cell: (props: {
    row: { original: SampleDataRow };
    onSelectRow?: (id: string, checked: boolean) => void;
  }) => React.ReactNode;
  isSelectionCell?: boolean;
  headerAlign?: "left" | "center" | "right";
  align?: "left" | "center" | "right";
  isSortable?: boolean;
  defaultSortDir?: "asc" | "desc";
}

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  subcomponents: {
    TableHeader,
    TableBody,
    TableRow,
    TableHeaderCell,
    TableCell,
  },
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof Table>;

// Sample data and column configurations
interface SampleDataRow {
  id: string;
  selected: boolean;
  item: string;
  itemIcon?: React.ReactNode;
  type: string;
  memberName: string;
  status: string;
  statusColor: string;
}

interface HeaderProps {
  onSelectAll: (checked: boolean) => void;
  areAllSelected: boolean;
}

const sampleData: SampleDataRow[] = [
  {
    id: "1",
    selected: false,
    item: "Annual Report 2023",
    itemIcon: <PlusIcon />,
    type: "Document",
    memberName: "Eleanor Vance",
    status: "Active",
    statusColor: vars.colors.success200,
  },
  {
    id: "2",
    selected: true,
    item: "Q2 Financials Presentation",
    itemIcon: <PlusIcon />,
    type: "Slides",
    memberName: "Marcus Cole",
    status: "Pending Review",
    statusColor: vars.colors.warning200,
  },
  {
    id: "3",
    selected: false,
    item: "New Logo Concepts & Assets for Marketing Campaign",
    itemIcon: <PlusIcon />,
    type: "Image Assets",
    memberName: "Lena Petrova",
    status: "Archived",
    statusColor: vars.colors.surface400,
  },
];

const columnsConfig: ColumnDef[] = [
  {
    id: "select",
    Header: ({
      onSelectAll,
      areAllSelected,
    }: {
      onSelectAll: (checked: boolean) => void;
      areAllSelected: boolean;
    }) => (
      <span onClick={(e) => e.stopPropagation()}>
        <Checkbox
          checked={areAllSelected}
          onCheckedChange={onSelectAll}
          aria-label="Select all rows"
          size="small"
        />
      </span>
    ),
    Cell: ({ row, onSelectRow }) => (
      <span onClick={(e) => e.stopPropagation()}>
        <Checkbox
          checked={row.original.selected}
          onCheckedChange={(checked) => onSelectRow?.(row.original.id, checked)}
          aria-label={`Select row ${row.original.item}`}
          size="small"
        />
      </span>
    ),
    isSelectionCell: true,
    headerAlign: "center",
  },
  {
    id: "item",
    Header: "Item",
    Cell: ({ row }) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        {row.original.itemIcon}{" "}
        <span
          style={{
            marginLeft: vars.spacing.xs,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {row.original.item}
        </span>
      </div>
    ),
    isSortable: true,
    defaultSortDir: "asc",
  },
  {
    id: "type",
    Header: "Type",
    Cell: ({ row }) => row.original.type,
    isSortable: true,
    align: "left",
  }, // Changed to left for example
  {
    id: "member",
    Header: "Member",
    Cell: ({ row }) => (
      <div
        style={{ display: "flex", alignItems: "center", gap: vars.spacing.sm }}
      >
        <AvatarPlaceholder />
        <span className={cellMemberName}>{row.original.memberName}</span>
      </div>
    ),
  },
  {
    id: "status",
    Header: "Status",
    Cell: ({ row }) => (
      <div
        style={{ display: "flex", alignItems: "center", gap: vars.spacing.xs }}
      >
        <StatusDot color={row.original.statusColor} />
        {row.original.status}
      </div>
    ),
  },
  {
    id: "actions",
    Header: "Actions",
    Cell: () => (
      <div
        style={{ display: "flex", alignItems: "center", gap: vars.spacing.xs }}
      >
        <IconButton
          icon={<CopyIcon />}
          aria-label="Copy"
          size="12px"
          emphasis="subtle"
        />
        <IconButton
          icon={<EditIcon />}
          aria-label="Edit"
          size="12px"
          emphasis="subtle"
        />
        <IconButton
          icon={<DeleteIcon />}
          aria-label="Delete"
          size="12px"
          emphasis="subtle"
        />
      </div>
    ),
    align: "right",
  },
];

export const DefaultTable: Story = {
  name: "Interactive Table",
  render: function Render(args) {
    const [currentData, setCurrentData] = useState(() =>
      sampleData.map((d) => ({ ...d }))
    );
    const [sortConfig, setSortConfig] = useState<{
      key: string;
      direction: "asc" | "desc" | "none";
    }>({ key: "item", direction: "asc" });

    const handleSort = (columnId: string) => {
      setSortConfig((prev) => ({
        key: columnId,
        direction:
          prev.key === columnId && prev.direction === "asc"
            ? "desc"
            : prev.key === columnId && prev.direction === "desc"
            ? "none"
            : "asc",
      }));
    };

    const handleSelectRow = (id: string, checked: boolean) => {
      console.log("handleSelectRow", id, checked);
      setCurrentData((prevData) =>
        prevData.map((row) =>
          row.id === id ? { ...row, selected: checked } : row
        )
      );
    };

    const areAllSelected =
      currentData.length > 0 && currentData.every((row) => row.selected);
    const handleSelectAll = (checked: boolean) => {
      setCurrentData((prevData) =>
        prevData.map((row) => ({ ...row, selected: checked }))
      );
    };

    const sortedData = React.useMemo(() => {
      if (sortConfig.key && sortConfig.direction !== "none") {
        return [...currentData].sort((a, b) => {
          const valA = a[sortConfig.key as keyof SampleDataRow];
          const valB = b[sortConfig.key as keyof SampleDataRow];

          // Handle null/undefined values
          if (valA == null && valB == null) return 0;
          if (valA == null) return sortConfig.direction === "asc" ? -1 : 1;
          if (valB == null) return sortConfig.direction === "asc" ? 1 : -1;

          if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
          if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
          return 0;
        });
      }
      return currentData;
    }, [currentData, sortConfig]);

    return (
      <div style={{ padding: "20px", maxWidth: "100vw" }}>
        <Table>
          <TableHeader>
            <TableRow>
              {columnsConfig.map((col) => (
                <TableHeaderCell
                  key={col.id}
                  size={args.cellSize}
                  align={col.headerAlign || col.align || "left"}
                  isSortable={col.isSortable}
                  sortDirection={
                    col.isSortable && sortConfig.key === col.id
                      ? sortConfig.direction
                      : "none"
                  }
                  onSort={col.isSortable ? () => handleSort(col.id) : undefined}
                  isSelectionCell={col.isSelectionCell}
                >
                  {typeof col.Header === "function" ? (
                    <col.Header
                      onSelectAll={handleSelectAll}
                      areAllSelected={areAllSelected}
                    />
                  ) : (
                    col.Header
                  )}
                </TableHeaderCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((dataRow) => (
              <TableRow
                key={dataRow.id}
                isSelected={dataRow.selected}
                // isSpecActiveOrFocused can be controlled by parent for hover/focus/active states
                // For demo, let's make it focusable if it's clickable (selected)
                isSpecActiveOrFocused={
                  dataRow.selected && args.showFocusOnSelected
                } // Example control
                onClick={() => handleSelectRow(dataRow.id, !dataRow.selected)}
              >
                {columnsConfig.map((col) => (
                  <TableCell
                    key={col.id}
                    size={args.cellSize}
                    align={col.align || "left"}
                    isSelectionCell={col.isSelectionCell}
                  >
                    <col.Cell
                      row={{ original: dataRow }}
                      onSelectRow={handleSelectRow}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  },
  args: {
    cellSize: "expanded",
    showFocusOnSelected: false, // New arg for demo
  },
  argTypes: {
    cellSize: { control: "select", options: ["compact", "expanded"] },
    showFocusOnSelected: {
      control: "boolean",
      name: "Demo: Show Focus on Selected Rows",
    },
  },
};

export const CompactTable: Story = {
  ...DefaultTable,
  name: "Compact Table",
  args: {
    ...DefaultTable.args,
    cellSize: "compact",
  },
};

const RowStatesDemoStory: Story = {
  name: "Demo: Row Interaction States",
  render: (args) => {
    // Use a single row of data for clarity
    const demoRowData: SampleDataRow = { ...sampleData[0], id: "demo-row" };
    const statesToDemo: Array<Partial<TableRowProps> & { name: string }> = [
      {
        name: "Default (Non-Selected)",
        isSelected: false,
        isSpecActiveOrFocused: false,
      },
      {
        name: "Focus (Non-Selected)",
        isSelected: false,
        isSpecActiveOrFocused: true,
      },
      {
        name: "Active (Non-Selected)",
        isSelected: false,
        isSpecActiveOrFocused: true,
      }, // Background from compound variant
      {
        name: "Selected - Default",
        isSelected: true,
        isSpecActiveOrFocused: false,
      },
      {
        name: "Selected - Focus",
        isSelected: true,
        isSpecActiveOrFocused: true,
      }, // BG from compound, cell border from isSpecActiveOrFocused
      {
        name: "Selected - Active",
        isSelected: true,
        isSpecActiveOrFocused: true,
      }, // BG from compound, cell border from isSpecActiveOrFocused
    ];

    return (
      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Table>
          <TableHeader>
            <TableRow isHeaderRow>
              {columnsConfig.map((col) => (
                <TableHeaderCell
                  key={col.id}
                  size={args.cellSize}
                  align={col.headerAlign || col.align || "left"}
                  isSelectionCell={col.isSelectionCell}
                >
                  {typeof col.Header === "function" ? (
                    <col.Header onSelectAll={fn()} areAllSelected={false} />
                  ) : (
                    col.Header
                  )}
                </TableHeaderCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {statesToDemo.map((stateConfig) => (
              <React.Fragment key={stateConfig.name}>
                <TableRow isHeaderRow={false}>
                  <TableCell
                    colSpan={columnsConfig.length}
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      backgroundColor: vars.colors.surface50,
                      borderBottom: `1px solid ${vars.colors.surface200}`,
                    }}
                  >
                    {stateConfig.name}
                  </TableCell>
                </TableRow>
                <TableRow
                  isSelected={stateConfig.isSelected}
                  isSpecActiveOrFocused={stateConfig.isSpecActiveOrFocused}
                >
                  {columnsConfig.map((col) => (
                    <TableCell
                      key={col.id}
                      size={args.cellSize}
                      align={col.align || "left"}
                      isSelectionCell={col.isSelectionCell}
                    >
                      <col.Cell
                        row={{
                          original: {
                            ...demoRowData,
                            selected: !!stateConfig.isSelected,
                          },
                        }}
                        onSelectRow={fn()}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  },
  args: {
    cellSize: "expanded",
  },
  argTypes: {
    cellSize: { control: "select", options: ["compact", "expanded"] },
  },
};
export { RowStatesDemoStory as RowStatesDemo };
