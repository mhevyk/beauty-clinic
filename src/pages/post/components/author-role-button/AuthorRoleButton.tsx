import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

import { postAuthorIconsByRole } from "@/pages/post/components/author-role-button/AuthorRoleButton.constants";
import { IconButtonStyled } from "@/pages/post/components/author-role-button/AuthorRoleButton.styled";
import theme from "@/theme/theme";
import { UserRole } from "@/types/helpers";

type AuthorRoleButtonProps = {
  authorRole: UserRole;
};

export default function AuthorRoleButton({
  authorRole,
}: AuthorRoleButtonProps) {
  const PostAuthorRoleIcon = postAuthorIconsByRole[authorRole];

  return (
    <Tooltip
      arrow
      placement="top"
      title={authorRole.toLowerCase()}
      slotProps={{
        tooltip: {
          sx: {
            backgroundColor: theme.palette.secondary.main,
          },
        },
        arrow: {
          sx: {
            color: theme.palette.secondary.main,
          },
        },
        popper: {
          sx: {
            textTransform: "capitalize",
            [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]:
              {
                marginBottom: "0px",
              },
          },
        },
      }}
    >
      <IconButtonStyled disableRipple>
        <PostAuthorRoleIcon width="20px" height="20px" />
      </IconButtonStyled>
    </Tooltip>
  );
}
