import { Link as MuiLink, LinkProps as MuiLinkProps } from "@mui/material";
import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom";

type AppLinkProps = MuiLinkProps & RouterLinkProps;

export default function AppLink(props: AppLinkProps) {
  return <MuiLink component={RouterLink} {...props} />;
}
