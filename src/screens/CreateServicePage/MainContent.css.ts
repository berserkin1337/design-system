// MainContentContainer.css.ts
import { style } from "@vanilla-extract/css";
import { sidebarWidth } from "./sidebarWidth";

export const mainContentContainer = style({
  position: "relative",
  height: "100%",
  width: `calc(100vw - ${sidebarWidth} )`,
  marginLeft: `calc(${sidebarWidth})`, // slides it out from under the sidebar
  overflow: "auto", // scroll if needed
  boxSizing: "border-box", // margin not added on top of width
  display: "flex",
  // gap: vars.spacing.xl,
  flexDirection: "column",
});
