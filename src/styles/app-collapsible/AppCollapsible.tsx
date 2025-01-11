import { Icon } from "@iconify/react";
import { KeyboardEvent, forwardRef, useId, useState } from "react";

import classnames from "classnames";

import "@/styles/app-collapsible/AppCollapsible.scss";
import { AppCollapsibleProps } from "@/styles/app-collapsible/AppCollapsible.types";
import AppTypography from "@/styles/app-typography/AppTypography";

const AppCollapsible = forwardRef<HTMLDivElement, AppCollapsibleProps>(
  function (
    {
      defaultExpanded = false,
      expanded = false,
      onExpandedChange,
      children,
      header,
    },
    ref
  ) {
    const controlId = useId();
    const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
    const [isCollapsing, setIsCollapsing] = useState(false);

    const isExpanded = expanded || internalExpanded;

    const handleToggle = () => {
      if (isExpanded) {
        setIsCollapsing(true);
      }

      if (onExpandedChange) {
        onExpandedChange(!isExpanded);
      } else {
        setInternalExpanded(prevExpanded => !prevExpanded);
      }
    };

    const handleToggleWithKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        handleToggle();
      }
    };

    const handleTransitionEnd = () => {
      if (!isExpanded) {
        setIsCollapsing(false);
      }
    };

    return (
      <div className="app-collapsible" ref={ref}>
        <div
          className="app-collapsible__header"
          role="button"
          tabIndex={0}
          onClick={handleToggle}
          onKeyDown={handleToggleWithKeyboard}
          aria-expanded={isExpanded}
          aria-controls={controlId}
          aria-label={isExpanded ? "Collapse content" : "Expand content"}
        >
          <div className="app-collapsible__title">
            <AppTypography variant="accent">{header}</AppTypography>
          </div>
          <Icon
            icon={
              isExpanded ? "octicon:chevron-up-24" : "octicon:chevron-down-24"
            }
            width={24}
            height={24}
            aria-hidden="true"
          />
        </div>
        <div
          id={controlId}
          className={classnames("app-collapsible__body", {
            "app-collapsible__body--expanded": isExpanded,
            "app-collapsible__body--collapsing": isCollapsing,
          })}
          onTransitionEnd={handleTransitionEnd}
        >
          <div className="app-collapsible__content">{children}</div>
        </div>
      </div>
    );
  }
);

AppCollapsible.displayName = "AppCollapsible";

export default AppCollapsible;
