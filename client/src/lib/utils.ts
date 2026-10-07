import { commentsApi, postsApi } from "@/services/api";
import type { ColumnConfig } from "./types";

export { cn } from "cn";

export const extractHeaders = <T>(columns: ColumnConfig<T>[]): string[] => {
  return columns.map((col) => col.header);
};

export const deletePostWithComments = async (postId: number) => {
  const comments = await commentsApi.getAll(`?postId=${postId}`);
  const commentList = comments?.data ?? [];

  await Promise.all(
    commentList.map(async (comment) => {
      await commentsApi.delete(comment.id);
    })
  );

  await postsApi.delete(postId)
};