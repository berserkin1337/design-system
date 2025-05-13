import { globalStyle, style } from "@vanilla-extract/css";
// This is the container for the entire page
globalStyle("html, body", {
  margin: 0,
  padding: 0,
  height: "100vh",
  width: "100%",
  overflow: "hidden",
});

globalStyle("html", {
  colorScheme: "light",
});

globalStyle("body", {
  fontFamily: "Inter",
});

export const container = style({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  maxWidth: "100vw",
  height: "100%",
  boxSizing: "border-box",
});
globalStyle("*,*::before,*::after", { boxSizing: "border-box" });
