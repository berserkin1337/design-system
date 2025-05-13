import React, { type HTMLAttributes } from "react";
import { helpTextBase, helpTextColorVariants } from "./Input.css";
import { clsx } from "clsx";

export interface HelpTextProps
  extends HTMLAttributes<HTMLParagraphElement | HTMLSpanElement> {
  variant?: keyof typeof helpTextColorVariants;
  as?: "p" | "span";
}

export const HelpText: React.FC<HelpTextProps> = ({
  children,
  className,
  variant = "default",
  as: Component = "p",
  ...rest
}) => {
  if (!children) return null;
  return (
    <Component
      className={clsx(helpTextBase, helpTextColorVariants[variant], className)}
      {...rest}
    >
      {children}
    </Component>
  );
};
