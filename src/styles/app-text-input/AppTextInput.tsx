import { cloneElement, forwardRef, useImperativeHandle, useRef } from "react";
import MaskedInput from "react-text-mask";

import classnames from "classnames";

import AppFormControl from "@/styles/app-form-control/AppFormControl";
import "@/styles/app-text-input/AppTextInput.scss";
import { AppTextInputProps } from "@/styles/app-text-input/AppTextInput.types";
import { AppAdornment } from "@/styles/types";

const renderAdornment = (
  adornment: AppAdornment,
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

const AppTextInput = forwardRef<HTMLInputElement, AppTextInputProps>(function (
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
    controlRef,
    ...props
  },
  ref
) {
  const maskedInputRef = useRef<MaskedInput | null>(null);

  // exposing only html element, not whole masked input ref
  useImperativeHandle(
    ref,
    () => maskedInputRef.current?.inputElement as HTMLInputElement
  );

  return (
    <AppFormControl
      ref={controlRef}
      className={classnames("app-input", `app-input__${variant}`, {
        "app-input--full-width": fullWidth,
      })}
      control={
        <div className="app-input__adornments-wrapper" style={{ minWidth }}>
          {startAdornment && renderAdornment(startAdornment, "start")}
          <MaskedInput
            ref={maskedInputRef}
            type="text"
            mask={mask ?? false}
            {...props}
          />
          {endAdornment && renderAdornment(endAdornment, "end")}
        </div>
      }
      errorMessage={errorMessage}
      helperText={helperText}
      label={label}
    />
  );
});

AppTextInput.displayName = "AppTextInput";

export default AppTextInput;
