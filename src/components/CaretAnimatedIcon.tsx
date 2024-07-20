import { keyframes, styled } from "@mui/material";

import CaretIconSvg from "@/assets/icons/caret-left.svg";

type CaretIconProps = {
  pointsToRight: boolean;
};

type CaretAnimatedIconProps = {
  hasToggle: boolean;
  color?: "black" | "white";
  AnimationDuration: number;
  rotateStartPosition: string;
  rotateEndPosition: string;
};

export default function CaretAnimatedIcon({
  hasToggle,
  color = "black",
  AnimationDuration,
  rotateStartPosition,
  rotateEndPosition,
}: CaretAnimatedIconProps) {
  const CaretAnimatedIcon = styled(CaretIconSvg, {
    shouldForwardProp: prop => prop !== "pointsToRight",
  })<CaretIconProps>(({ pointsToRight, theme }) => ({
    stroke:
      color == "black"
        ? theme.palette.secondary.main
        : theme.palette.primary.main,
    animation: `${pointsToRight ? rotateForward : rotateBackward} ${AnimationDuration}ms forwards`,
  }));

  const rotateForward = keyframes`
  from {
    transform: rotate(${rotateStartPosition});
  }
  to {
    transform: rotate(${rotateEndPosition});
  }
`;

  const rotateBackward = keyframes`
  from {
    transform: rotate(${rotateEndPosition});
  }
  to {
    transform: rotate(${rotateStartPosition});
  }
`;

  return <CaretAnimatedIcon pointsToRight={hasToggle} />;
}
