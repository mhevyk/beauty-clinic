import { IconButton, Typography } from "@mui/material";
import { format } from "date-fns";

import DotSeparatorIcon from "@/assets/icons/testimonial-button-close-icon.svg";

import { Post, User } from "@/api/generated";
import AuthorRoleButton from "@/pages/post/components/author-role-button/AuthorRoleButton";
import {
  AuthorDetailsLink,
  ListItemStyled,
  ListStyled,
  PostSubheaderWrapper,
  ThreeDotsVerticalIconStyled,
  UserAvatar,
} from "@/pages/post/components/post-header/PostHeader.styles";
import { UserRole } from "@/types/helpers";

type PostSubheaderProps = Pick<Post, "createdAt" | "estimatedReadTime"> & {
  author: Pick<User, "role" | "id" | "username">;
};

export default function PostSubheader({
  author,
  createdAt,
  estimatedReadTime,
}: PostSubheaderProps) {
  const authorRole = author.role as UserRole;

  const formattedCreatedAtDate = format(new Date(createdAt), "MMM dd, yyyy");

  const separator = (
    <ListItemStyled aria-hidden={true}>
      <DotSeparatorIcon width="2px" height="2px" />
    </ListItemStyled>
  );

  return (
    <PostSubheaderWrapper>
      <ListStyled>
        <ListItemStyled>
          <AuthorDetailsLink to={`/members/${author.id}`}>
            <UserAvatar />
            <Typography variant="paragraph" fontSize="14px">
              {author.username}
            </Typography>
          </AuthorDetailsLink>
          <AuthorRoleButton authorRole={authorRole} />
        </ListItemStyled>
        {separator}
        <ListItemStyled>
          <Typography variant="paragraph" fontSize="14px">
            {formattedCreatedAtDate}
          </Typography>
        </ListItemStyled>
        {separator}
        <ListItemStyled>
          <Typography variant="paragraph" fontSize="14px">
            {estimatedReadTime} min read
          </Typography>
        </ListItemStyled>
      </ListStyled>
      <IconButton>
        <ThreeDotsVerticalIconStyled />
      </IconButton>
    </PostSubheaderWrapper>
  );
}
