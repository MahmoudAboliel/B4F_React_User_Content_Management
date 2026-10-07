import PageHeader from "@/components/PageHeader";
import { pageMeta } from "@/lib/constants";
import type { Post } from "@/lib/types";
import { postsApi } from "@/services/api";
import { useEffect, useState } from "react";

const AllPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await postsApi.getAll();
      setPosts(response?.data || []);
    };

    fetchPosts();
  }, []);
  console.log(posts);
  return (
    <div>
      <PageHeader {...pageMeta.allPosts} />
    </div>
  );
};

export default AllPosts;
