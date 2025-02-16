import { KeyboardEvent, forwardRef, useId, useRef, useState } from "react";

import classNames from "classnames";

import "@/styles/app-tooltip/AppTooltip.scss";
import { AppTooltipProps } from "@/styles/app-tooltip/AppTooltip.types";
import AppTypography from "@/styles/app-typography/AppTypography";
import { Timer } from "@/types/helpers";

const AppTooltip = forwardRef<HTMLDivElement, AppTooltipProps>(function (
  { position = "top", width, content, children, className, ...props },
  ref
) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<Timer | null>(null);
  const id = useId();

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
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
      onKeyDown={handleKeyDown}
      onTouchStart={showTooltip}
      onTouchEnd={hideTooltip}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      tabIndex={-1}
      {...props}
      ref={ref}
      aria-describedby={isVisible && content ? `tooltip-${id}` : undefined}
      className="app-tooltip__wrapper"
    >
      {children}
      {isVisible && (
        <div
          role="tooltip"
          id={`tooltip-${id}`}
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
