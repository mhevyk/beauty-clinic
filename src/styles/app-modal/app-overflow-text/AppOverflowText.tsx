import { useLayoutEffect, useRef, useState } from "react";

import classnames from "classnames";

import "@/styles/app-modal/app-overflow-text/AppOverflowText.scss";
import { AppOverflowTextsProps } from "@/styles/app-modal/app-overflow-text/AppOverflowText.types.ts";
import AppTooltip from "@/styles/app-tooltip/AppTooltip.tsx";
import AppTypography from "@/styles/app-typography/AppTypography.tsx";

const AppOverflowText = ({
  children,
  textSize,
  variant,
  tooltip,
}: AppOverflowTextsProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useLayoutEffect(() => {
    const element = textRef.current;
    if (element) {
      setIsTruncated(element.scrollWidth > element.clientWidth);
    }
  }, [children]);

  const textElement = (
    <AppTypography
      ref={textRef}
      variant={variant}
      className={classnames(
        "app-overflow-text",
        `app-overflow-text--${textSize}`,
        classnames
      )}
    >
      {children}
    </AppTypography>
  );

  if (isTruncated) {
    return (
      <AppTooltip content={children} {...tooltip}>
        {textElement}
      </AppTooltip>
    );
  }

  return textElement;
};

export default AppOverflowText;
