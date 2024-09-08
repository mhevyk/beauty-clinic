import { IconButton, Typography } from "@mui/material";
import { format } from "date-fns";

import DotSeparatorIcon from "@/assets/icons/testimonial-button-close-icon.svg";

import { Post } from "@/api/generated";
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

type PostSubheaderProps = {
  post: Post;
};

export default function PostSubheader({ post }: PostSubheaderProps) {
  const authorRole = post.author.role as UserRole;

  const formattedCreatedAtDate = format(
    new Date(post.createdAt),
    "MMM dd, yyyy"
  );

  const separator = (
    <ListItemStyled aria-hidden={true}>
      <DotSeparatorIcon width="2px" height="2px" />
    </ListItemStyled>
  );

  return (
    <PostSubheaderWrapper>
      <ListStyled>
        <ListItemStyled>
          <AuthorDetailsLink to={`/members/${post.author.id}`}>
            <UserAvatar />
            <Typography variant="paragraph" fontSize="14px">
              {post.author.username}
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
            {post.estimatedReadTime} min read
          </Typography>
        </ListItemStyled>
      </ListStyled>
      <IconButton>
        <ThreeDotsVerticalIconStyled />
      </IconButton>
    </PostSubheaderWrapper>
  );
}
