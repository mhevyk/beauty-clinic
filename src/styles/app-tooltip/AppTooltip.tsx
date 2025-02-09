import { KeyboardEvent, forwardRef, useRef, useState } from "react";

import classNames from "classnames";
import "design-system/app-tooltip/AppTooltip.scss";

import { AppTooltipProps } from "@/styles/app-tooltip/AppTooltip.types.ts";
import AppTypography from "@/styles/app-typography/AppTypography.tsx";

const AppTooltip = forwardRef<HTMLDivElement, AppTooltipProps>(function (
  {
    position = "top",
    width = "nowrap",
    content,
    children,
    className,
    ...props
  },
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

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      hideTooltip();
    }
  };

  return (
    <div
      onTouchStart={showTooltip}
      onTouchEnd={hideTooltip}
      onKeyDown={handleKeyDown}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      tabIndex={-1}
      {...props}
      ref={ref}
      aria-describedby={isVisible && content ? `tooltip-content` : undefined}
      className="app-tooltip__wrapper"
    >
      {children}
      {isVisible && (
        <div
          role="tooltip"
          id="tooltip-content"
          aria-live="polite"
          className={classNames(
            "app-tooltip",
            `app-tooltip--${position}`,
            `app-tooltip--${width}`,
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
