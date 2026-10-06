import { createBrowserRouter } from "react-router";
import Root from "../pages/Root";
import AllPosts from "../pages/AllPosts";
import MyPosts from "../pages/MyPosts";
import MyAlbums from "../pages/MyAlbums";
import MyTodos from "../pages/MyTodos";
import PostDetails from "../pages/PostDetails";
import MyPhotos from "../pages/MyPhotos";


export const URL = "http://localhost:3000";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: AllPosts },
      { path: "myPosts", Component: MyPosts },
      { path: "postDetails", Component: PostDetails },
      { path: "myAlbums", Component: MyAlbums },
      { path: "myPhotos", Component: MyPhotos },
      { path: "myTodos", Component: MyTodos },
    ],
  },
]);

export const routes = [
  { id: 1,href: "/", label: "All Posts" },
  { id: 2,href: "/myPosts", label: "My Posts" },
  { id: 3,href: "/myAlbums", label: "My Albums" },
  { id: 4,href: "/myTodos", label: "My Todos" },
];
