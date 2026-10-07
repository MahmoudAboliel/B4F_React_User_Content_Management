type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
};

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface Album {
  userId: number;
  id: number;
  title: string;
}

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// API Related Types
export interface ApiResponse<T> {
  status: number;
  data: T;
  message: string;
}

export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

// Columns Extraction
export interface ColumnConfig<T> {
  header: string;
  key: keyof T;
}
