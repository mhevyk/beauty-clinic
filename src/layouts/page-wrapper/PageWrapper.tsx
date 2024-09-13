import { PropsWithChildren } from "react";

import {
  ColoredWrapper,
  ContentWrapper,
} from "@/layouts/page-wrapper/PageWrapper.styles";
import theme from "@/theme/theme";

type PageWrapperProps = PropsWithChildren<{
  wrapperBackgroundColor?: string;
  containerBackgroundColor?: string;
}>;

export default function PageWrapper({
  children,
  wrapperBackgroundColor = theme.palette.CreamyDawn.main,
  containerBackgroundColor = theme.palette.primary.main,
}: PageWrapperProps) {
  return (
    <ColoredWrapper backgroundColor={wrapperBackgroundColor}>
      <ContentWrapper backgroundColor={containerBackgroundColor}>
        {children}
      </ContentWrapper>
    </ColoredWrapper>
  );
}
