import { useParams } from "react-router-dom";

import Typography from "@mui/material/Typography";

import {
  ActivitySectionWrapper,
  PostStats,
} from "@/pages/post/components/activity-section/ActivitySection.styles";
import LikeWidget from "@/pages/post/components/like-widget/LikeWidget";

type ActivitySectionProps = {
  viewsCount: number;
  commentsCount: number;
};

export default function ActivitySection({
  viewsCount,
  commentsCount,
}: ActivitySectionProps) {
  const params = useParams();
  const postId = Number(params.postId);

  return (
    <ActivitySectionWrapper>
      <PostStats>
        <Typography
          variant="paragraph"
          fontSize="14px"
          data-testid="views-count"
        >
          {viewsCount} views
        </Typography>
        <Typography
          variant="paragraph"
          fontSize="14px"
          data-testid="comments-count"
        >
          {commentsCount} comments
        </Typography>
      </PostStats>
      <LikeWidget postId={postId} />
    </ActivitySectionWrapper>
  );
}
