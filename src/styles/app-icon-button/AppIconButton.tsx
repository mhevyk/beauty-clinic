import { Icon } from "@iconify/react";
import { forwardRef } from "react";

import classNames from "classnames";

import "@/styles/app-icon-button/AppIconButton.scss";
import { AppIconButtonProps } from "@/styles/app-icon-button/AppIconButton.types";

const AppIconButton = forwardRef<HTMLButtonElement, AppIconButtonProps>(
  function ({ icon, iconProps = {}, className, size = 24, ...props }, ref) {
    const { style, ...restIconProps } = iconProps;

    return (
      <button
        ref={ref}
        className={classNames("app-icon-button", className)}
        {...props}
      >
        <Icon
          {...restIconProps}
          icon={icon}
          width={size}
          height={size}
          style={{ ...style, padding: size * 0.1 }}
          aria-hidden="true"
        />
      </button>
    );
  }
);

AppIconButton.displayName = "AppIconButton";

export default AppIconButton;
