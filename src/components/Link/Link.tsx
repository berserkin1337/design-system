import { clsx } from "clsx";
import React, {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
  forwardRef,
} from "react";
import { linkIcon, linkRecipe } from "./Link.css";

// Define a type for props common to both <a> and <button> that we customize
interface CustomLinkProps {
  children: ReactNode;
  colorVariant?:
    | "primary"
    | "black"
    | "danger"
    | "success"
    | "warning"
    | "white";
  // Add other custom props like 'hasIcon', 'iconType' if icons are part of the link
  // For simplicity now, we'll assume icons are passed via children or a specific prop
  icon?: ReactNode; // A generic icon prop
  disabled?: boolean;
  className?: string;
}

// Props for when 'as' is 'a'
type LinkAsAnchorProps = CustomLinkProps &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof CustomLinkProps | "href"
  > & {
    as?: "a";
    href: string; // href is required for <a>
  };

// Props for when 'as' is 'button'
type LinkAsButtonProps = CustomLinkProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CustomLinkProps> & {
    as?: "button";
    href?: never; // href is not allowed for <button>
  };

// Union type for all possible props
export type LinkProps = LinkAsAnchorProps | LinkAsButtonProps;

const AnchorLink = forwardRef<HTMLAnchorElement, LinkAsAnchorProps>(
  (props, ref) => {
    const {
      children,
      colorVariant = "primary",
      icon,
      disabled = false,
      className,
      href,
      ...rest
    } = props;
    const linkClasses = linkRecipe({ colorVariant });
    const content = (
      <>
        {children}
        {icon && <span className={linkIcon}>{icon}</span>}
      </>
    );

    return (
      <a
        ref={ref}
        className={clsx(linkClasses, className, { disabled })}
        href={disabled ? undefined : href}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          rest.onClick?.(e);
        }}
        onKeyDown={(e) => {
          if (disabled && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        {...rest}
      >
        {content}
      </a>
    );
  }
);

const ButtonLink = forwardRef<HTMLButtonElement, LinkAsButtonProps>(
  (props, ref) => {
    const {
      children,
      colorVariant = "primary",
      icon,
      disabled = false,
      className,
      type = "button",
      ...rest
    } = props;
    const linkClasses = linkRecipe({ colorVariant });
    const content = (
      <>
        {children}
        {icon && <span className={linkIcon}>{icon}</span>}
      </>
    );

    return (
      <button
        ref={ref}
        className={clsx(linkClasses, className)}
        disabled={disabled}
        type={type}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          rest.onClick?.(e);
        }}
        onKeyDown={(e) => {
          if (disabled && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        {...rest}
      >
        {content}
      </button>
    );
  }
);

export const Link = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  LinkProps
>((props, ref) => {
  if (props.as === "button") {
    return (
      <ButtonLink
        {...(props as LinkAsButtonProps)}
        ref={ref as React.Ref<HTMLButtonElement>}
      />
    );
  }
  return (
    <AnchorLink
      {...(props as LinkAsAnchorProps)}
      ref={ref as React.Ref<HTMLAnchorElement>}
    />
  );
});

Link.displayName = "Link";
