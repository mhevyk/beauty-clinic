import { forwardRef, useRef, useState } from "react";

import classNames from "classnames";
import "design-system/app-tooltip/AppTooltip.scss";

import { AppTooltipProps } from "@/styles/app-tooltip/AppTooltip.types.ts";
import AppTypography from "@/styles/app-typography/AppTypography.tsx";

const AppTooltip = forwardRef<HTMLDivElement, AppTooltipProps>(function (
  { content, position = "top", children, className, ...props },
  ref
) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const showTooltip = () => {
    timeoutRef.current = window.setTimeout(() => {
      setIsVisible(true);
    }, 400);
  };

  const hideTooltip = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsVisible(false);
  };

  return (
    <div
      className="app-tooltip__wrapper"
      {...props}
      ref={ref}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      tabIndex={-1}
      aria-describedby={content ? "tooltip-content" : undefined}
    >
      {children}
      {isVisible && (
        <div
          className={classNames(
            "app-tooltip",
            `app-tooltip--${position}`,
            className
          )}
        >
          <AppTypography>{content}</AppTypography>
          <div
            className={classNames(
              "app-tooltip__arrow",
              `app-tooltip__arrow--${position}`,
              className
            )}
          />
        </div>
      )}
    </div>
  );
});

AppTooltip.displayName = "AppTooltip";

export default AppTooltip;
