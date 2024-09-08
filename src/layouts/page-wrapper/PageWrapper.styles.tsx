import { styled } from "@mui/material";
import Container from "@mui/material/Container";

type ColoredWrapperProps = {
  backgroundColor: string;
};

export const ColoredWrapper = styled("section", {
  shouldForwardProp: prop => prop !== "backgroundColor",
})<ColoredWrapperProps>(props => ({
  backgroundColor: props.backgroundColor,
  padding: "100px 0",
}));

type ContentWrapperProps = {
  backgroundColor: string;
};

export const ContentWrapper = styled(Container, {
  shouldForwardProp: prop => prop !== "backgroundColor",
})<ContentWrapperProps>(props => ({
  backgroundColor: props.backgroundColor,
  maxWidth: "1058px !important",
  padding: "20px !important",
}));
