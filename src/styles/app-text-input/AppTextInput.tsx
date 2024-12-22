import {
  CSSProperties,
  cloneElement,
  forwardRef,
  useCallback,
  useId,
  useImperativeHandle,
  useRef,
} from "react";
import MaskedInput from "react-text-mask";

import classnames from "classnames";

import "@/styles/app-text-input/AppTextInput.scss";
import {
  AppInputAdornment,
  AppTextInputProps,
} from "@/styles/app-text-input/AppTextInput.types";
import AppTypography from "@/styles/app-typography/AppTypography";

const renderAdornment = (
  adornment: AppInputAdornment,
  position: "start" | "end"
) => {
  const { onClick, className } = adornment.props;

  return cloneElement(adornment, {
    "aria-hidden": !onClick ? "true" : undefined, // input adornments should be used only as decoration
    role: onClick ? "button" : undefined,
    className: classnames(
      "app-input__adornment",
      `app-input__${position}-adornment`,
      className
    ),
  });
};

const AppTextInput = forwardRef<HTMLDivElement, AppTextInputProps>(function (
  {
    variant = "filled",
    fullWidth,
    mask,
    errorMessage,
    label,
    helperText,
    startAdornment,
    endAdornment,
    minWidth = "400px",
    innerRef,
    ...props
  },
  ref
) {
  const inputId = useId();
  const errorId = `${inputId}-error`;
  const helperTextId = `${inputId}-helper`;
  const isInvalid = Boolean(errorMessage);

  const getAriaDescribedBy = useCallback(() => {
    if (isInvalid) {
      return errorId;
    }

    if (helperText) {
      return helperTextId;
    }

    return undefined;
  }, [isInvalid, helperText]);

  const maskedInputRef = useRef<MaskedInput | null>(null);

  // exposing only html element, not whole masked input ref
  useImperativeHandle(innerRef, () => {
    return maskedInputRef.current
      ? (maskedInputRef.current.inputElement as HTMLInputElement)
      : null;
  });

  return (
    <div
      ref={ref}
      className={classnames("app-input", fullWidth && "app-input--full-width")}
    >
      {label && (
        <AppTypography
          as="label"
          htmlFor={inputId}
          className="app-input__label"
        >
          {label}
        </AppTypography>
      )}
      <div
        className="app-input__control-container"
        style={{ "--min-width": minWidth } as CSSProperties}
      >
        {startAdornment && renderAdornment(startAdornment, "start")}
        <MaskedInput
          {...props}
          id={inputId}
          ref={maskedInputRef}
          type="text"
          mask={mask ?? false}
          className={classnames("app-input__control", `app-input__${variant}`)}
          aria-invalid={isInvalid}
          aria-describedby={getAriaDescribedBy()}
        />
        {endAdornment && renderAdornment(endAdornment, "end")}
      </div>
      {isInvalid ? (
        <AppTypography
          variant="caption"
          as="span"
          id={errorId}
          className="app-input__error"
          aria-live="assertive"
        >
          {errorMessage}
        </AppTypography>
      ) : (
        helperText && (
          <AppTypography
            variant="caption"
            as="span"
            id={helperTextId}
            className="app-input__helper-text"
          >
            {helperText}
          </AppTypography>
        )
      )}
    </div>
  );
});

AppTextInput.displayName = "AppTextInput";

export default AppTextInput;
