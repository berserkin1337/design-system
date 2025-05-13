import React, { type LabelHTMLAttributes } from "react";
import { labelText } from "./Input.css";
import { clsx } from "clsx";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LabelTextProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export const LabelText: React.FC<LabelTextProps> = ({
  children,
  className,
  ...rest
}) => {
  if (!children) return null;
  return (
    <label className={clsx(labelText, className)} {...rest}>
      {children}
    </label>
  );
};
