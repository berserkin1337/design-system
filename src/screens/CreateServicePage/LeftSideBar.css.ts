import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";
import { sidebarWidth } from "./sidebarWidth";

export const sidebarContainer = style({
  display: "flex",
  flexDirection: "column",
  width: sidebarWidth,
  height: "100%",
  padding: vars.spacing.smmd,
  justifyContent: "space-between",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: vars.zIndices.sidebar,
  borderRight: `1px solid ${vars.colors.surface100}`,
  boxSizing: "border-box",
});

export const SideBarTop = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "11px",
});

export const SideBarHeader = style({
  display: "flex",
  alignItems: "center",
  gap: "11px",
  justifyContent: "space-between",
  width: "100%",
  padding: "2px 0px",
});
export const SideBarMenu = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  alignItems: "flex-start",
});

export const SideBarBottom = style({
  fontSize: vars.fontSize.headingForm,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "6px",
  alignSelf: "stretch",
  paddingBottom: "18px",
  color: vars.colors.textSubtler,
  letterSpacing: "0px",
});
