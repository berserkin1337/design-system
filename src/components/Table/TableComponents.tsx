import React, {
  forwardRef,
  createContext,
  useContext,
  type ReactNode,
  type HTMLAttributes,
  type TableHTMLAttributes,
  type ThHTMLAttributes,
  type TdHTMLAttributes,
} from "react";
import { clsx } from "clsx";
import {
  tableWrapper,
  tableRowRecipe,
  tableHeaderCellRecipe,
  tableCellRecipe,
  sortIcon as sortIconStyle,
  sortIconActive,
} from "./Table.css";
import { vars } from "../../styles/theme.css";

// --- Simple sort icons (replace inline SVG with your icon components if preferred) ---
const ChevronUpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="8"
    height="6"
    viewBox="0 0 8 6"
    fill="none"
  >
    <path
      d="M4.4714 0.80045C4.21106 0.532662 3.78894 0.532662 3.5286 0.80045L0.195262 4.22902C-0.0650874 4.49681 -0.0650874 4.93098 0.195262 5.19877C0.455612 5.46656 0.877722 5.46656 1.13807 5.19877L4 2.25507L6.86193 5.19877C7.12228 5.46656 7.54439 5.46656 7.80474 5.19877C8.06509 4.93098 8.06509 4.49681 7.80474 4.22902L4.4714 0.80045Z"
      fill="#8B96AE"
    />
  </svg>
);
const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="8"
    height="6"
    viewBox="0 0 8 6"
    fill="none"
  >
    <path
      d="M3.5286 5.19955C3.78894 5.46734 4.21106 5.46734 4.4714 5.19955L7.80474 1.77098C8.06509 1.50319 8.06509 1.06902 7.80474 0.801232C7.54439 0.533444 7.12228 0.533444 6.86193 0.801232L4 3.74493L1.13807 0.801232C0.877722 0.533445 0.455611 0.533445 0.195262 0.801233C-0.0650887 1.06902 -0.0650886 1.50319 0.195262 1.77098L3.5286 5.19955Z"
      fill="#8B96AE"
    />
  </svg>
);

// Context to mark header rows
const TableHeaderContext = createContext(false);

// ---------- Table ----------
export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  wrapperClassName?: string;
}
export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ children, className, wrapperClassName, ...rest }, ref) => (
    <div className={wrapperClassName} style={{ overflowX: "auto" }}>
      <table
        ref={ref}
        className={clsx(tableWrapper, className)}
        // style={{ tableLayout: "auto", width: "100%" }}
        {...rest}
      >
        {children}
      </table>
    </div>
  )
);
Table.displayName = "Table";

// ---------- TableHeader ----------

export interface TableHeaderProps
  extends HTMLAttributes<HTMLTableSectionElement> {}
export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(({ children, className, ...rest }, ref) => (
  <TableHeaderContext.Provider value={true}>
    <thead ref={ref} className={className} {...rest}>
      {children}
    </thead>
  </TableHeaderContext.Provider>
));
TableHeader.displayName = "TableHeader";

// ---------- TableBody ----------
export interface TableBodyProps
  extends HTMLAttributes<HTMLTableSectionElement> {}
export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ children, className, ...rest }, ref) => (
    <TableHeaderContext.Provider value={false}>
      <tbody ref={ref} className={className} {...rest}>
        {children}
      </tbody>
    </TableHeaderContext.Provider>
  )
);
TableBody.displayName = "TableBody";

// ---------- TableRow ----------
export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  isSelected?: boolean;
  isSpecActiveOrFocused?: boolean;
  onClick?: React.MouseEventHandler<HTMLTableRowElement>;
}
export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  (
    {
      children,
      className,
      isSelected = false,
      isSpecActiveOrFocused = false,
      onClick,
      ...rest
    },
    ref
  ) => {
    const isHeaderRow = useContext(TableHeaderContext);
    const rowClasses = tableRowRecipe({
      isSelected,
      isSpecActiveOrFocused: isHeaderRow ? false : isSpecActiveOrFocused,
      isHeaderRow,
    });
    return (
      <tr
        ref={ref}
        className={clsx(rowClasses, className)}
        onClick={onClick}
        style={onClick ? { cursor: "pointer" } : undefined}
        {...rest}
      >
        {React.Children.map(children, (child) =>
          React.isValidElement(child) && !isHeaderRow
            ? React.cloneElement(child, {
                //@ts-ignore
                isParentRowFocusedOrActive: isSpecActiveOrFocused,
              })
            : child
        )}
      </tr>
    );
  }
);
TableRow.displayName = "TableRow";

// ---------- TableHeaderCell ----------
export interface TableHeaderCellProps
  extends ThHTMLAttributes<HTMLTableCellElement> {
  align?: "left" | "center" | "right";
  size?: "compact" | "expanded";
  isSortable?: boolean;
  sortDirection?: "asc" | "desc" | "none";
  onSort?: () => void;
  isSelectionCell?: boolean;
}
export const TableHeaderCell = forwardRef<
  HTMLTableCellElement,
  TableHeaderCellProps
>(
  (
    {
      children,
      className,
      align = "left",
      size = "expanded",
      isSortable = false,
      sortDirection = "none",
      onSort,
      isSelectionCell = false,
      ...rest
    },
    ref
  ) => {
    const thClasses = tableHeaderCellRecipe({
      align,
      size,
      isSortable,
      isSelectionCell,
    });

    // Hint width only for the selection checkbox; other columns will auto-size
    const widthHint: React.CSSProperties = {};

    const handleClick: React.MouseEventHandler<HTMLTableCellElement> = (e) => {
      if (isSortable && onSort) onSort();
      rest.onClick?.(e);
    };

    // Content + sortable icon, without forcing full wrapper width
    let content: ReactNode = children;
    if (isSortable) {
      const icon = (
        <span
          className={clsx(
            sortIconStyle,
            sortDirection !== "none" && sortIconActive
          )}
        >
          {sortDirection === "asc" && <ChevronUpIcon />}
          {sortDirection === "desc" && <ChevronDownIcon />}
          {sortDirection === "none" && (
            <>
              <ChevronUpIcon />
              <ChevronDownIcon />
            </>
          )}
        </span>
      );

      content = (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: vars.spacing.xs,
            justifyContent:
              align === "right"
                ? "flex-end"
                : align === "center"
                ? "center"
                : "flex-start",
          }}
        >
          {align !== "right" && icon}
          <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
            {children}
          </span>
          {align === "right" && icon}
        </div>
      );
    }

    return (
      <th
        ref={ref}
        className={clsx(thClasses, className)}
        onClick={handleClick}
        scope="col"
        style={widthHint}
        aria-sort={
          isSortable && sortDirection !== "none"
            ? `${sortDirection}ending`
            : undefined
        }
        {...rest}
      >
        {content}
      </th>
    );
  }
);
TableHeaderCell.displayName = "TableHeaderCell";

// ---------- TableCell ----------
export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  align?: "left" | "center" | "right";
  size?: "compact" | "expanded";
  isSelectionCell?: boolean;
  isParentRowFocusedOrActive?: boolean;
}
export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  (
    {
      children,
      className,
      align = "left",
      size = "expanded",
      isSelectionCell = false,
      isParentRowFocusedOrActive = false,
      ...rest
    },
    ref
  ) => {
    const tdClasses = tableCellRecipe({
      align,
      size,
      isSelectionCell,
      isParentRowFocusedOrActive,
    });

    return (
      <td ref={ref} className={clsx(tdClasses, className)} {...rest}>
        {children}
      </td>
    );
  }
);
TableCell.displayName = "TableCell";
