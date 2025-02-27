import { ElementType, useEffect, useRef, useState } from "react";

import classnames from "classnames";

import "@/styles/app-overflow-text/AppOverflowText.scss";
import { AppOverflowTextsProps } from "@/styles/app-overflow-text/AppOverflowText.types.ts";
import AppTooltip from "@/styles/app-tooltip/AppTooltip.tsx";
import AppTypography from "@/styles/app-typography/AppTypography.tsx";

const AppOverflowText = <Element extends ElementType = ElementType>({
  children,
  typographyProps,
  tooltipProps = {},
}: AppOverflowTextsProps<Element>) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  console.log(
    isTruncated,
    textRef.current?.scrollWidth,
    textRef.current?.offsetWidth,
    textRef.current?.clientWidth
  );

  useEffect(() => {
    const element = textRef.current;

    if (element) {
      setIsTruncated(element.scrollWidth > element.clientWidth);
    }
    console.log(
      isTruncated,
      element.scrollWidth,
      element.offsetWidth,
      element.clientWidth
    );
  }, []);

  const { className, ...restTypographyProps } = typographyProps ?? {};

  const textElement = (
    // <div className="app-overflow-text" ref={textRef}>
    <AppTypography
      ref={textRef}
      className={classnames("app-overflow-text", className)}
      {...restTypographyProps}
    >
      {children}
    </AppTypography>
    // </div>
  );

  if (isTruncated) {
    return (
      <AppTooltip content={children} {...tooltipProps}>
        {textElement}
      </AppTooltip>
    );
  }

  return textElement;
};

export default AppOverflowText;
