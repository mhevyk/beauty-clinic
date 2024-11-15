import { ComponentType, SVGAttributes } from "react";

import CrownIcon from "@/assets/icons/crown.svg";
import UserIcon from "@/assets/icons/user-icon.svg";

import { USER_ROLES } from "@/constants";
import { UserRole } from "@/types/helpers";

export const postAuthorIconsByRole: Record<
  UserRole,
  ComponentType<SVGAttributes<SVGElement>>
> = {
  [USER_ROLES.ADMIN]: CrownIcon,
  [USER_ROLES.USER]: UserIcon,
  [USER_ROLES.GUEST]: UserIcon,
};
