import { useGetLikeDetailsQuery } from "@/api/generated";
import useCurrentUser from "@/hooks/use-current-user/useCurrentUser";
import LikeButton from "@/pages/post/components/like-button/LikeButton";
import LikeWidgetSkeleton from "@/pages/post/components/like-widget/LikeWidgetSkeleton";

type LikeWidgetProps = {
  postId: number;
};

export default function LikeWidget({ postId }: LikeWidgetProps) {
  const user = useCurrentUser();

  const { data, loading, error } = useGetLikeDetailsQuery({
    variables: {
      input: {
        postId,
        userId: user?.userId,
      },
    },
  });

  if (loading) {
    return <LikeWidgetSkeleton />;
  }

  if (error) {
    // TODO: handle error in better way
    return <div>Error occured</div>;
  }

  const { isLiked, likesCount } = data!.likeDetails;

  return (
    <LikeButton postId={postId} isLiked={isLiked} likesCount={likesCount} />
  );
}
