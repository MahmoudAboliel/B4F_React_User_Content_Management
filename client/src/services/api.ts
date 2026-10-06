import type {
  Method,
  ApiResponse,
  User,
  Post,
  Comment,
  Album,
  Photo,
  Todo,
} from "../lib/types";
import { URL } from "@/lib/constants";

export const request = async <T = unknown, D = unknown>(
  endPoint: string = "",
  method: Method = "GET",
  data: D | null = null,
): Promise<ApiResponse<T> | undefined> => {
  try {
    const res = await fetch(`${URL}/${endPoint}`, {
      method: method,
      headers: {
        "Content-type": "application/json",
      },
      body: data ? JSON.stringify(data) : null,
    });
    if (!res.ok) {
      throw new Error(
        res.status == 404
          ? "not found"
          : res.status == 400
            ? "bad request"
            : res.status == 403
              ? "access denied"
              : res.status == 500
                ? "server error"
                : "something went wrong",
      );
    }

    const result = (await res.json()) as T;
    return { status: res.status, data: result, message: "done successfully" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  }
};

const createCrudService = <
  TEntity extends { id: number },
  TCreate = Omit<TEntity, "id">,
  TUpdate = Partial<TCreate>,
>(
  endPoint: string,
) => ({
  getAll: (query: string = "") => request<TEntity[]>(`${endPoint}${query}`),
  getById: (id: number, query: string = "") =>
    request<TEntity>(`${endPoint}/${id}${query}`),
  create: (data: TCreate | null) =>
    request<TEntity, TCreate>(endPoint, "POST", data),
  update: (id: number, data: TUpdate | null) =>
    request<TEntity, TUpdate>(`${endPoint}/${id}`, "PATCH", data),
  delete: (id: number) => request<null>(`${endPoint}/${id}`, "DELETE"),
});

export const usersApi = createCrudService<User>("users");
export const postsApi = createCrudService<Post>("posts");
export const commentsApi = createCrudService<Comment>("comments");
export const albums = createCrudService<Album>("albums");
export const photos = createCrudService<Photo>("photos");
export const todos = createCrudService<Todo>("todos");

// TODO query parameters
// const xx = await usersApi.getAll();
// const x = async () => {
//   const res = await fetch("http://localhost:3000/users?id=2");
//   const rr = await res.json();
//   console.log(rr);
// };
// For Types
// console.log(xx?.data[0]);
