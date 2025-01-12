import { cloneElement, forwardRef, useCallback, useId } from "react";

import classnames from "classnames";

import "@/styles/app-form-control/AppFormControl.scss";
import { AppFormControlProps } from "@/styles/app-form-control/AppFormControl.types";
import AppTypography from "@/styles/app-typography/AppTypography";

const AppFormControl = forwardRef<HTMLDivElement, AppFormControlProps>(
  function ({ label, errorMessage, helperText, control, className }, ref) {
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
    }, [isInvalid, helperText]);

    return (
      <div className={classnames("app-form-control", className)} ref={ref}>
        <label>
          {label && (
            <AppTypography className="app-form-control__label" as="span">
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
