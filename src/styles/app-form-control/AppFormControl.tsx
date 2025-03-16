import { cloneElement, forwardRef, useCallback, useId } from "react";

import classnames from "classnames";

import "@/styles/app-form-control/AppFormControl.scss";
import { AppFormControlProps } from "@/styles/app-form-control/AppFormControl.types";
import AppTypography from "@/styles/app-typography/AppTypography";

const AppFormControl = forwardRef<HTMLDivElement, AppFormControlProps>(
  function (
    { label, errorMessage, helperText, control, className, fullWidth = false },
    ref
  ) {
    const controlId = useId();

    const isInvalid = Boolean(errorMessage);
    const errorId = `${controlId}-error`;
    const helperTextId = `${controlId}-helper-text`;

    const getAriaDescribedBy = useCallback(() => {
      if (isInvalid) {
        return errorId;
      }

      if (helperText) {
        return helperTextId;
      }

      return undefined;
    }, [isInvalid, helperText, errorId, helperTextId]);

    return (
      <div
        style={{ width: fullWidth ? "100%" : "auto" }}
        className={classnames("app-form-control", className)}
        ref={ref}
      >
        <label htmlFor={controlId}>
          {label && (
            <AppTypography
              as="label"
              htmlFor={controlId}
              className="app-form-control__label"
            >
              {label}
            </AppTypography>
          )}
          {cloneElement(control, {
            id: controlId,
            "aria-describedby": getAriaDescribedBy(),
            "aria-invalid": isInvalid ? "true" : "false",
          })}
        </label>
        {isInvalid ? (
          <AppTypography
            variant="caption"
            as="span"
            className="app-form-control__error"
            id={errorId}
            aria-live="assertive"
          >
            {errorMessage}
          </AppTypography>
        ) : (
          helperText && (
            <AppTypography
              variant="caption"
              as="span"
              className="app-form-control__helper-text"
              id={helperTextId}
            >
              {helperText}
            </AppTypography>
          )
        )}
      </div>
    );
  }
);

AppFormControl.displayName = "AppFormControl";

export default AppFormControl;
