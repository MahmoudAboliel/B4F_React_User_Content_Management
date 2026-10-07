import PageHeader from "@/components/PageHeader";
import Table from "@/components/Table/Table";
import TableBody from "@/components/Table/TableBody/TableBody";
import TableCell from "@/components/Table/TableCell/TableCell";
import TableHead from "@/components/Table/TableHead/TableHead";
import TableRow from "@/components/Table/TableRow/TableRow";
import { useUser } from "@/context/UserContext";
import { pageMeta } from "@/lib/constants";
import type { ColumnConfig, Post } from "@/lib/types";
import { deletePostWithComments, extractHeaders } from "@/lib/utils";
import { postsApi } from "@/services/api";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DynamicForm } from "@/lib/dynamic-form/DynamicForm";

const MyPosts = () => {
  const { user } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);
  const [update, setUpdate] = useState<boolean>(false);

  useEffect(() => {
    const fetchPosts = async () => {
      if (user) {
        const response = await postsApi.getAll(`?userId=${user.id}`);
        setPosts(response?.data || []);
      }
    };

    fetchPosts();
  }, [user, update]);
  // console.log(posts);

  const postColumns: ColumnConfig<Post>[] = [
    { header: "No.#", key: "id" },
    { header: "Title", key: "title" },
    { header: "Body", key: "body" },
  ];

  const headers = [...extractHeaders(postColumns), "Actions"];
  return (
    <div>
      <PageHeader {...pageMeta.myPosts} />
      <Table id="table">
        <TableHead cols={headers} />
        <TableBody id="table-body">
          {posts.map((post) => (
            <TableRow key={post.id}>
              {postColumns.map((col) => (
                <TableCell key={col.key} id={String(col.key)}>
                  {String(post[col.key])}
                </TableCell>
              ))}
              <TableCell id="actions" className="flex items-center gap-2">
                <Button size="xs" variant="outline">
                  <Link to={`/posts/${post.id}`}>View</Link>
                </Button>
                <Dialog>
                  <DialogTrigger
                    render={
                      <Button
                        size="xs"
                        variant="secondary"
                        onClick={() => {}}
                      />
                    }
                  >
                    Update
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Update Post</DialogTitle>
                      <DialogDescription>Edit your post</DialogDescription>
                    </DialogHeader>
                    <DynamicForm
                      fields={[
                        {
                          name: "title",
                          label: "Post Title",
                          type: "text",
                          required: false,
                        },
                        {
                          name: "body",
                          label: "Post Body",
                          type: "text",
                          required: false,
                        },
                      ]}
                      onSubmit={async (data: Record<string, unknown>) => {
                        await postsApi.update(post.id, data);
                        setUpdate(prev => !prev);
                      }}
                      submitLabel="edit"
                      columns={1}
                    />
                  </DialogContent>
                </Dialog>
                <Button
                  size="xs"
                  variant="destructive"
                  onClick={async () => {
                    await deletePostWithComments(post.id);
                    setUpdate((prev) => !prev);
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyPosts;
