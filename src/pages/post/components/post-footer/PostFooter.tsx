import { Fragment } from "react";
import { Link, useParams } from "react-router-dom";

import { Divider } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import ShareLinkIcon from "@/assets/icons/share-link.svg";

import { Post } from "@/api/generated";
import LikeButton from "@/pages/post/components/like-button/LikeButton";
import { socialIcons } from "@/pages/post/components/post-footer/PostFooter.constants";
import {
  ActivitySection,
  CategoriesList,
  CategoryItem,
  PostStats,
  ShareSocialsList,
  SocialsAndCategoriesSection,
  SocialsItem,
} from "@/pages/post/components/post-footer/PostFooter.styles";

type PostFooterProps = {
  post: Post;
};

export default function PostFooter({ post }: PostFooterProps) {
  const params = useParams();

  return (
    <>
      <SocialsAndCategoriesSection>
        <ShareSocialsList>
          {socialIcons.map((SocialIconDetails, index) => (
            <SocialsItem key={index}>
              <IconButton disableRipple>
                <SocialIconDetails.icon width={19} height={19} />
              </IconButton>
            </SocialsItem>
          ))}
          <SocialsItem>
            <IconButton disableRipple>
              <ShareLinkIcon width={19} height={19} />
            </IconButton>
          </SocialsItem>
        </ShareSocialsList>
        {/* TODO: reuse blog tab here */}
        <CategoriesList>
          {post.categories.map((category, index) => (
            <Fragment key={category.id}>
              <CategoryItem>
                <Link to={`/posts?category=${category.slug}`}>
                  {category.name}
                </Link>
              </CategoryItem>
              {index !== post.categories.length - 1 && (
                <Divider orientation="vertical" flexItem />
              )}
            </Fragment>
          ))}
        </CategoriesList>
      </SocialsAndCategoriesSection>
      <ActivitySection>
        <PostStats>
          <Typography variant="paragraph" fontSize="14px">
            {post.viewsCount} views
          </Typography>
          <Typography variant="paragraph" fontSize="14px">
            {post.commentsCount} comments
          </Typography>
        </PostStats>
        <LikeButton
          postId={Number(params.postId)}
          initialIsLiked={post.isLiked}
          initialLikesCount={post.likesCount}
        />
      </ActivitySection>
    </>
  );
}
