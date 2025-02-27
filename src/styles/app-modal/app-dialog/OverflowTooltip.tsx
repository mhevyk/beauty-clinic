import React, { useEffect, useRef, useState } from "react";

import Tooltip from "@mui/material/Tooltip";

interface Props {
  tooltip: string;
  text: string;
}

const OverflowTooltip = (props: Props) => {
  const textElementRef = useRef<HTMLInputElement | null>(null);

  const compareSize = () => {
    const compare =
      textElementRef.current?.scrollWidth > textElementRef.current?.clientWidth;
    setHover(compare);
  };

  useEffect(() => {
    compareSize();
    window.addEventListener("resize", compareSize);
  }, []);

  useEffect(
    () => () => {
      window.removeEventListener("resize", compareSize);
    },
    []
  );

  const [hoverStatus, setHover] = useState(false);

  return (
    <Tooltip
      title={props.tooltip}
      interactive
      disableHoverListener={!hoverStatus}
    >
      <div
        ref={textElementRef}
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {props.text}
      </div>
    </Tooltip>
  );
};

export default OverflowTooltip;
