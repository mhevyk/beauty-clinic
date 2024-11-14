import { Fragment } from "react";
import { Link } from "react-router-dom";

import { Divider } from "@mui/material";
import IconButton from "@mui/material/IconButton";

import ShareLinkIcon from "@/assets/icons/share-link.svg";

import { Post, PostCategory } from "@/api/generated";
import ActivitySection from "@/pages/post/components/activity-section/ActivitySection";
import { socialIcons } from "@/pages/post/components/post-footer/PostFooter.constants";
import {
  CategoriesList,
  CategoryItem,
  ShareSocialsList,
  SocialsAndCategoriesSection,
  SocialsItem,
} from "@/pages/post/components/post-footer/PostFooter.styled";

type PostFooterProps = Pick<Post, "commentsCount" | "viewsCount"> & {
  categories: Omit<PostCategory, "id">[];
};

export default function PostFooter({
  categories,
  commentsCount,
  viewsCount,
}: PostFooterProps) {
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
          {categories.map((category, index) => (
            <Fragment key={category.slug}>
              <CategoryItem>
                <Link to={`/posts?category=${category.slug}`}>
                  {category.name}
                </Link>
              </CategoryItem>
              {index !== categories.length - 1 && (
                <Divider orientation="vertical" flexItem />
              )}
            </Fragment>
          ))}
        </CategoriesList>
      </SocialsAndCategoriesSection>
      <ActivitySection commentsCount={commentsCount} viewsCount={viewsCount} />
    </>
  );
}
