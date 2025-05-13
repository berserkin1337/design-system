import React, { useCallback, useMemo, useState } from "react";
// Assuming CSS for this specific wrapper is minimal or part of Table.css
// import './InteractiveDataTable.css'; // If you have specific styles for this wrapper

// --- Import Your Existing Components ---
import { Button } from "../../components/Button"; // Using Button if that's what TrashIcon is part of
import { Checkbox } from "../../components/Checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "../../components/Table"; // Adjust path

// --- Placeholder Icons (Replace with your actuals) ---
const TrashIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
    <path
      fillRule="evenodd"
      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
    />
  </svg>
);

// --- Types ---
interface DataRow {
  id: string;
  // Add other properties your data rows will have
  linkText: string;
  rowTitle: string;
  // Add any other fields that might be used for sorting
  [key: string]: any; // Allow other properties
}

type SortDirection = "asc" | "desc" | "none";

interface SortConfig {
  key: keyof DataRow | null;
  direction: SortDirection;
}

export interface ColumnDefinition {
  id: keyof DataRow | "select" | "actions"; // Unique ID for the column
  header: React.ReactNode;
  // Cell renderer function, receives the full row object
  cell: (row: DataRow) => React.ReactNode;
  isSortable?: boolean;
  // Add align, size props if they need to be configurable per column
  align?: "left" | "center" | "right"; // From TableCellVariants['align']
  headerAlign?: "left" | "center" | "right"; // From TableHeaderCellVariants['align']
  isSelectionCell?: boolean; // From TableCellVariants['isSelectionCell']
}

export interface InteractiveDataTableProps {
  columns: ColumnDefinition[];
  data: DataRow[];
  initialSort?: SortConfig;
  onRowDelete?: (rowId: string) => void; // Callback for delete action
  // Add other table props like density (size for cells)
  cellSize?: "compact" | "expanded"; // From TableCellVariants['size']
  className?: string; // For the main Table wrapper
}

export const InteractiveDataTable: React.FC<InteractiveDataTableProps> = ({
  columns,
  data: initialData,
  initialSort = { key: null, direction: "none" },
  onRowDelete,
  cellSize = "compact", // Default to compact as in your snippet
  className,
}) => {
  const [currentData, setCurrentData] = useState<DataRow[]>(() =>
    initialData.map((row) => ({ ...row, _isSelected: false }))
  );
  const [sortConfig, setSortConfig] = useState<SortConfig>(initialSort);

  const sortedData = useMemo(() => {
    if (sortConfig.key && sortConfig.direction !== "none") {
      return [...currentData].sort((a, b) => {
        const valA = a[sortConfig.key!];
        const valB = b[sortConfig.key!];
        if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return currentData;
  }, [currentData, sortConfig]);

  const handleSort = useCallback((columnId: keyof DataRow) => {
    setSortConfig((prev) => {
      let direction: SortDirection = "asc";
      if (prev.key === columnId && prev.direction === "asc") {
        direction = "desc";
      } else if (prev.key === columnId && prev.direction === "desc") {
        direction = "none"; // Cycle through: asc -> desc -> none -> asc
      }
      return { key: direction === "none" ? null : columnId, direction };
    });
  }, []);

  const handleSelectRow = useCallback((rowId: string, checked: boolean) => {
    setCurrentData((prevData) =>
      prevData.map((row) =>
        row.id === rowId ? { ...row, _isSelected: checked } : row
      )
    );
  }, []);

  const areAllSelected = useMemo(
    () => currentData.length > 0 && currentData.every((row) => row._isSelected),
    [currentData]
  );

  const handleSelectAll = useCallback((checked: boolean) => {
    setCurrentData((prevData) =>
      prevData.map((row) => ({ ...row, _isSelected: checked }))
    );
  }, []);

  return (
    <div className={className}>
      {" "}
      {/* Use this for specific table container if needed */}
      <Table>
        {" "}
        {/* Pass down className from props if Table component supports it */}
        <TableHeader>
          <TableRow isHeaderRow>
            {columns.map((col) => (
              <TableHeaderCell
                key={String(col.id)}
                size={cellSize}
                align={col.headerAlign || col.align || "left"}
                isSortable={col.isSortable}
                sortDirection={
                  sortConfig.key === col.id ? sortConfig.direction : "none"
                }
                onSort={
                  col.isSortable
                    ? () => handleSort(col.id as keyof DataRow)
                    : undefined
                }
                isSelectionCell={col.id === "select"}
              >
                {col.id === "select" ? (
                  <Checkbox
                    aria-label="Select all rows"
                    checked={areAllSelected}
                    onCheckedChange={handleSelectAll}
                    size="medium" // Match visual
                    className="SettingsTable-checkbox" // If needed from your CSS
                  />
                ) : (
                  col.header
                )}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((dataRow) => (
            <TableRow
              key={dataRow.id}
              isSelected={dataRow._isSelected}
              // isSpecActiveOrFocused={...} // Control this based on focus/active logic if needed
            >
              {columns.map((col) => (
                <TableCell
                  key={String(col.id)}
                  size={cellSize}
                  align={col.align || "left"}
                  isSelectionCell={col.id === "select"}
                >
                  {col.id === "select" ? (
                    <Checkbox
                      aria-label={`Select row ${dataRow.id}`}
                      checked={dataRow._isSelected}
                      onCheckedChange={(checked) =>
                        handleSelectRow(dataRow.id, checked)
                      }
                      size="medium"
                      className="SettingsTable-checkbox"
                    />
                  ) : col.id === "actions" && onRowDelete ? ( // Example for actions column
                    <Button
                      aria-label={`Delete ${dataRow.rowTitle}`}
                      iconBefore={<TrashIcon />} // Assuming Button can take iconBefore
                      // buttonType="tertiary" // Use your Button's variant prop
                      buttonType="tertiary" // Use your Button's variant prop
                      size="small"
                      onClick={() => onRowDelete(dataRow.id)}
                    >
                      <span /* className="SettingsTable-deleteButtonText" */>
                        Delete
                      </span>
                    </Button>
                  ) : (
                    col.cell(dataRow)
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

InteractiveDataTable.displayName = "InteractiveDataTable";
