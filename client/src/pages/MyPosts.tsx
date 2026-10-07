import PageHeader from "@/components/PageHeader";
import { useUser } from "@/context/UserContext";
import { pageMeta } from "@/lib/constants";
import type { Post } from "@/lib/types";
import { postsApi } from "@/services/api";
import { useEffect, useState } from "react";

const MyPosts = () => {
  const { user } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (user) {
        const response = await postsApi.getAll(`?userId=${user.id}`);
        setPosts(response?.data || []);
      }
    };

    fetchPosts();
  }, [user]);
  console.log(posts);
  return (
    <div>
      <PageHeader {...pageMeta.myPosts} />
    </div>
  );
};

export default MyPosts;
