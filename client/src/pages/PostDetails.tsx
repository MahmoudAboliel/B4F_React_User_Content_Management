import CommentMessage from "@/components/CommentMessage/CommentMessage";
import PageHeader from "@/components/PageHeader";
import { useUser } from "@/context/UserContext";
import { pageMeta } from "@/lib/constants";
import type { Post, Comment } from "@/lib/types";
import { postsApi, commentsApi } from "@/services/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const PostDetails = () => {
  const { user } = useUser();
  const { postId } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchPost = async (postId: number) => {
      const postResponse = await postsApi.getById(postId);
      const commentsResponse = await commentsApi.getAll(`?postId=${postId}`);
      setPost(postResponse?.data || null);
      setComments(commentsResponse?.data || []);
    };

    if (postId) {
      fetchPost(Number(postId));
    }
  }, [postId, user]);
  // console.log(post);
  // console.log(comments);
  return (
    <div>
      <PageHeader {...pageMeta.postDetails} />
      <CommentMessage comments={comments} userEmail={user?.email} />
    </div>
  );
};

export default PostDetails;
