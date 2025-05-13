import React, {
  type InputHTMLAttributes,
  type ReactNode,
  forwardRef,
  useState,
  useMemo,
  type TextareaHTMLAttributes,
} from "react";
import {
  inputRecipe,
  type InputVariants,
  inputElementStyle,
  trailingItemWrapper,
  textareaBase,
} from "./Input.css";
import { LabelText, type LabelTextProps } from "./LabelText";
import { HelpText, type HelpTextProps } from "./HelpText";
import { clsx } from "clsx";

const EyeSlashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M2.62003 11.255L3.33503 10.545C2.55214 9.84206 1.93702 8.97234 1.53503 8C2.55003 5.465 5.35003 3.5 8.00003 3.5C8.68198 3.509 9.35775 3.63064 10 3.86L10.775 3.08C9.89636 2.70866 8.95388 2.51167 8.00003 2.5C6.37029 2.56129 4.79423 3.09878 3.46663 4.04604C2.13904 4.99331 1.11811 6.30882 0.530031 7.83C0.490315 7.93985 0.490315 8.06015 0.530031 8.17C0.974155 9.34851 1.69025 10.4055 2.62003 11.255Z"
      fill="#525F7A"
    />
    <path
      d="M6.00003 7.865C6.0348 7.38586 6.24088 6.93524 6.58057 6.59554C6.92027 6.25584 7.37089 6.04977 7.85003 6.015L8.75503 5.105C8.24791 4.97147 7.71465 4.97321 7.20841 5.11003C6.70217 5.24685 6.24064 5.51399 5.86983 5.8848C5.49902 6.25561 5.23189 6.71714 5.09506 7.22338C4.95824 7.72962 4.9565 8.26288 5.09003 8.77L6.00003 7.865Z"
      fill="#525F7A"
    />
    <path
      d="M15.47 7.83C14.8967 6.3366 13.8991 5.04351 12.6 4.11L15 1.705L14.295 1L1.00003 14.295L1.70503 15L4.25503 12.45C5.39197 13.117 6.68205 13.4787 8.00003 13.5C9.62977 13.4387 11.2058 12.9012 12.5334 11.954C13.861 11.0067 14.882 9.69118 15.47 8.17C15.5097 8.06015 15.5097 7.93985 15.47 7.83ZM10 8C9.99793 8.35005 9.90398 8.69342 9.72758 8.99578C9.55119 9.29815 9.29852 9.54892 8.99484 9.72303C8.69115 9.89714 8.34709 9.9885 7.99703 9.98797C7.64697 9.98744 7.30319 9.89503 7.00003 9.72L9.72003 7C9.89979 7.30287 9.99637 7.64783 10 8ZM8.00003 12.5C6.95106 12.4817 5.92198 12.2107 5.00003 11.71L6.27003 10.44C6.8477 10.8408 7.5478 11.026 8.2481 10.9632C8.94839 10.9005 9.6044 10.5937 10.1016 10.0965C10.5987 9.59937 10.9055 8.94336 10.9683 8.24307C11.031 7.54277 10.8459 6.84267 10.445 6.265L11.88 4.83C13.0273 5.61749 13.9245 6.71771 14.465 8C13.45 10.535 10.65 12.5 8.00003 12.5Z"
      fill="#525F7A"
    />
  </svg>
);
const EyeIcons = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M15.4698 7.83C14.8817 6.30882 13.8608 4.99331 12.5332 4.04604C11.2056 3.09878 9.62953 2.56129 7.99979 2.5C6.37005 2.56129 4.79398 3.09878 3.46639 4.04604C2.1388 4.99331 1.11787 6.30882 0.529787 7.83C0.490071 7.93985 0.490071 8.06015 0.529787 8.17C1.11787 9.69118 2.1388 11.0067 3.46639 11.954C4.79398 12.9012 6.37005 13.4387 7.99979 13.5C9.62953 13.4387 11.2056 12.9012 12.5332 11.954C13.8608 11.0067 14.8817 9.69118 15.4698 8.17C15.5095 8.06015 15.5095 7.93985 15.4698 7.83ZM7.99979 12.5C5.34979 12.5 2.54979 10.535 1.53479 8C2.54979 5.465 5.34979 3.5 7.99979 3.5C10.6498 3.5 13.4498 5.465 14.4648 8C13.4498 10.535 10.6498 12.5 7.99979 12.5Z"
      fill="#525F7A"
    />
    <path
      d="M7.99979 5C7.40644 5 6.82642 5.17595 6.33308 5.50559C5.83973 5.83524 5.45521 6.30377 5.22815 6.85195C5.00109 7.40013 4.94168 8.00333 5.05743 8.58527C5.17319 9.16721 5.45891 9.70176 5.87847 10.1213C6.29802 10.5409 6.83257 10.8266 7.41452 10.9424C7.99646 11.0581 8.59966 10.9987 9.14784 10.7716C9.69602 10.5446 10.1646 10.1601 10.4942 9.66671C10.8238 9.17336 10.9998 8.59334 10.9998 8C10.9998 7.20435 10.6837 6.44129 10.1211 5.87868C9.5585 5.31607 8.79544 5 7.99979 5ZM7.99979 10C7.60422 10 7.21755 9.8827 6.88865 9.66294C6.55975 9.44318 6.3034 9.13082 6.15203 8.76537C6.00065 8.39991 5.96105 7.99778 6.03822 7.60982C6.11539 7.22186 6.30587 6.86549 6.58557 6.58579C6.86528 6.30608 7.22164 6.1156 7.60961 6.03843C7.99757 5.96126 8.3997 6.00087 8.76515 6.15224C9.13061 6.30362 9.44296 6.55996 9.66273 6.88886C9.88249 7.21776 9.99979 7.60444 9.99979 8C9.99979 8.53043 9.78907 9.03914 9.414 9.41421C9.03893 9.78929 8.53022 10 7.99979 10Z"
      fill="#525F7A"
    />
  </svg>
);
const EyeSlashIconSmall = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
  >
    <g clip-path="url(#clip0_2_9707)">
      <path
        d="M1.96484 8.44125L2.50109 7.90875C1.91392 7.38154 1.45258 6.72926 1.15109 6C1.91234 4.09875 4.01234 2.625 5.99984 2.625C6.5113 2.63175 7.01813 2.72298 7.49984 2.895L8.08109 2.31C7.42209 2.0315 6.71523 1.88376 5.99984 1.875C4.77753 1.92096 3.59549 2.32408 2.59979 3.03453C1.6041 3.74498 0.838401 4.73162 0.39734 5.8725C0.367553 5.95489 0.367553 6.04511 0.39734 6.1275C0.730433 7.01138 1.2675 7.80414 1.96484 8.44125Z"
        fill="#525F7A"
      />
      <path
        d="M4.49984 5.89875C4.52592 5.53939 4.68047 5.20143 4.93525 4.94666C5.19002 4.69188 5.52798 4.53733 5.88734 4.51125L6.56609 3.82875C6.18575 3.7286 5.7858 3.72991 5.40613 3.83252C5.02644 3.93514 4.6803 4.13549 4.40219 4.4136C4.12408 4.69171 3.92373 5.03785 3.82111 5.41753C3.7185 5.79721 3.7172 6.19716 3.81734 6.5775L4.49984 5.89875Z"
        fill="#525F7A"
      />
      <path
        d="M11.6023 5.8725C11.1723 4.75245 10.4241 3.78263 9.44984 3.0825L11.2498 1.27875L10.7211 0.75L0.749841 10.7213L1.27859 11.25L3.19109 9.3375C4.04379 9.83775 5.01136 10.109 5.99984 10.125C7.22215 10.079 8.4042 9.67592 9.39989 8.96547C10.3956 8.25502 11.1613 7.26838 11.6023 6.1275C11.6321 6.04511 11.6321 5.95489 11.6023 5.8725ZM7.49984 6C7.49826 6.26254 7.4278 6.52006 7.29551 6.74684C7.16321 6.97361 6.97371 7.16169 6.74594 7.29227C6.51818 7.42286 6.26013 7.49137 5.99759 7.49098C5.73505 7.49058 5.47721 7.42128 5.24984 7.29L7.28984 5.25C7.42466 5.47715 7.4971 5.73587 7.49984 6ZM5.99984 9.375C5.21311 9.36126 4.4413 9.15801 3.74984 8.7825L4.70234 7.83C5.13559 8.13062 5.66067 8.26951 6.18589 8.22243C6.71111 8.17534 7.20311 7.94528 7.57599 7.5724C7.94887 7.19952 8.17894 6.70752 8.22602 6.1823C8.2731 5.65708 8.13421 5.132 7.83359 4.69875L8.90984 3.6225C9.77031 4.21312 10.4432 5.03828 10.8486 6C10.0873 7.90125 7.98734 9.375 5.99984 9.375Z"
        fill="#525F7A"
      />
    </g>
    <defs>
      <clipPath id="clip0_2_9707">
        <rect width="12" height="12" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
const EyesIconSmall = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
  >
    <path
      d="M11.6023 5.8725C11.1613 4.73162 10.3956 3.74498 9.39989 3.03453C8.4042 2.32408 7.22215 1.92096 5.99984 1.875C4.77753 1.92096 3.59549 2.32408 2.59979 3.03453C1.6041 3.74498 0.838401 4.73162 0.39734 5.8725C0.367553 5.95489 0.367553 6.04511 0.39734 6.1275C0.838401 7.26838 1.6041 8.25502 2.59979 8.96547C3.59549 9.67592 4.77753 10.079 5.99984 10.125C7.22215 10.079 8.4042 9.67592 9.39989 8.96547C10.3956 8.25502 11.1613 7.26838 11.6023 6.1275C11.6321 6.04511 11.6321 5.95489 11.6023 5.8725ZM5.99984 9.375C4.01234 9.375 1.91234 7.90125 1.15109 6C1.91234 4.09875 4.01234 2.625 5.99984 2.625C7.98734 2.625 10.0873 4.09875 10.8486 6C10.0873 7.90125 7.98734 9.375 5.99984 9.375Z"
      fill="#525F7A"
    />
    <path
      d="M5.99984 3.75C5.55483 3.75 5.11982 3.88196 4.74981 4.12919C4.3798 4.37643 4.09141 4.72783 3.92111 5.13896C3.75081 5.5501 3.70626 6.0025 3.79307 6.43895C3.87989 6.87541 4.09418 7.27632 4.40885 7.59099C4.72352 7.90566 5.12443 8.11995 5.56089 8.20677C5.99734 8.29358 6.44975 8.24903 6.86088 8.07873C7.27201 7.90843 7.62341 7.62004 7.87065 7.25003C8.11788 6.88002 8.24984 6.44501 8.24984 6C8.24984 5.40326 8.01279 4.83097 7.59083 4.40901C7.16887 3.98705 6.59658 3.75 5.99984 3.75ZM5.99984 7.5C5.70317 7.5 5.41316 7.41203 5.16649 7.2472C4.91981 7.08238 4.72755 6.84811 4.61402 6.57403C4.50049 6.29994 4.47079 5.99834 4.52866 5.70736C4.58654 5.41639 4.7294 5.14912 4.93918 4.93934C5.14896 4.72956 5.41623 4.5867 5.70721 4.52882C5.99818 4.47094 6.29978 4.50065 6.57387 4.61418C6.84795 4.72771 7.08222 4.91997 7.24705 5.16664C7.41187 5.41332 7.49984 5.70333 7.49984 6C7.49984 6.39782 7.34181 6.77936 7.0605 7.06066C6.7792 7.34196 6.39767 7.5 5.99984 7.5Z"
      fill="#525F7A"
    />
  </svg>
);
const EyeIcon = ({
  visible,
  size,
}: {
  visible: boolean;
  size: "small" | "regular";
}) => {
  if (visible && size === "regular") {
    return <EyeIcons />;
  }
  if (visible && size === "small") {
    return <EyesIconSmall />;
  }
  if (!visible && size === "regular") {
    return <EyeSlashIcon />;
  }
  return <EyeSlashIconSmall />;
};

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  // Overriding HTML 'size' and 'type' for our component's props
  size?: InputVariants["size"];
  state?: InputVariants["state"];
  label?: ReactNode;
  labelProps?: LabelTextProps;
  helpText?: ReactNode;
  helpTextProps?: HelpTextProps;
  trailingItem?: ReactNode;
  wrapperClassName?: string; // Class for the outer wrapper (div)
  // HTML input type
  type?:
    | "text"
    | "password"
    | "email"
    | "number"
    | "search"
    | "tel"
    | "url"
    | "date"
    | "time"; // Add more as needed
  // Add onFocus, onBlur to control isFocused state
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  // For controlled focus state (e.g. Storybook)
  isFocused?: boolean;
  isTextArea?: boolean;
  // Add textarea specific props
  textareaProps?: Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    keyof InputProps
  >;
}

export const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(
  (
    {
      size = "regular",
      state = "default",
      label,
      labelProps,
      helpText,
      helpTextProps,
      trailingItem,
      className, // Applied to the <input> element itself
      wrapperClassName,
      disabled = false,
      type = "text",
      onFocus,
      onBlur,
      isFocused: controlledIsFocused,
      isTextArea = false,
      textareaProps,
      ...rest
    },
    ref
  ) => {
    const [internalIsFocused, setInternalIsFocused] = useState(false);
    const actualIsFocused = controlledIsFocused ?? internalIsFocused;
    const [showPassword, setShowPassword] = useState(false);

    const id = useMemo(
      () => rest.id || `input-${Math.random().toString(36).substr(2, 9)}`,
      [rest.id]
    );

    const handleFocus: React.FocusEventHandler<
      HTMLInputElement | HTMLTextAreaElement
    > = (e) => {
      setInternalIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur: React.FocusEventHandler<
      HTMLInputElement | HTMLTextAreaElement
    > = (e) => {
      setInternalIsFocused(false);
      onBlur?.(e);
    };

    const wrapperClasses = inputRecipe({
      size,
      state: disabled ? "default" : state, // When disabled, state styling might be overridden by isDisabled
      isFocused: actualIsFocused && !disabled,
      isDisabled: disabled,
      hasTrailingItem: !!trailingItem || type === "password",
    });

    // Password logic
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;
    const trailing =
      isPassword && !trailingItem ? (
        <button
          type="button"
          aria-label={showPassword ? "Hide password" : "Show password"}
          onClick={() => setShowPassword((v) => !v)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            margin: 0,
            color: "inherit",
            display: "flex",
            alignItems: "center",
          }}
          tabIndex={-1}
        >
          <EyeIcon visible={showPassword} size={size} />
        </button>
      ) : (
        trailingItem
      );

    // Adjust paddingRight on the wrapper if there's a trailing item
    // This is a bit manual; could be a compound variant in the recipe if preferred.
    const finalWrapperStyle: React.CSSProperties = {};
    if (trailing) {
      // Optionally adjust padding if needed
    }

    return (
      <div className={clsx("input-field-container", wrapperClassName)}>
        {" "}
        {/* Optional outer container for label+input+helptext */}
        {label && (
          <LabelText htmlFor={id} {...labelProps}>
            {label}
          </LabelText>
        )}
        <div className={clsx(wrapperClasses)} style={finalWrapperStyle}>
          {isTextArea ? (
            //@ts-ignore
            <textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              id={id}
              className={clsx(inputElementStyle, textareaBase, className)}
              disabled={disabled}
              onFocus={handleFocus}
              onBlur={handleBlur}
              aria-invalid={state === "error" ? true : undefined}
              {...textareaProps}
              {...rest}
            />
          ) : (
            <>
              <input
                ref={ref as React.Ref<HTMLInputElement>}
                id={id}
                className={clsx(inputElementStyle, className)}
                type={inputType}
                disabled={disabled}
                onFocus={handleFocus}
                onBlur={handleBlur}
                aria-invalid={state === "error" ? true : undefined}
                aria-describedby={helpText ? `${id}-helptext` : undefined}
                {...rest}
              />

              {trailing && (
                <div className={trailingItemWrapper}>{trailing}</div>
              )}
            </>
          )}
        </div>
        {helpText && (
          <HelpText
            id={`${id}-helptext`}
            variant={state === "default" ? "default" : state}
            {...helpTextProps}
          >
            {helpText}
          </HelpText>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
