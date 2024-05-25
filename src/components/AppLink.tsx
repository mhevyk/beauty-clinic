import { Link as MuiLink, LinkProps as MuiLinkProps } from "@mui/material";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  useLocation,
} from "react-router-dom";

type AppLinkProps = MuiLinkProps & RouterLinkProps;

export default function AppLink(props: AppLinkProps) {
  const { pathname, search } = useLocation();
  
  return (
    <MuiLink
      component={RouterLink}
      state={{ from: pathname + search }}
      {...props}
    />
  );
}
