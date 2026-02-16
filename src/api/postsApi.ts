import type {
  Comment,
  CreatePostRequest,
  Post,
  UpdatePostRequest,
} from '../types/post';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

async function request<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export function getPostsApi(): Promise<Post[]> {
  return request<Post[]>('/posts');
}

export function getPostByIdApi(postId: number): Promise<Post> {
  return request<Post>(`/posts/${postId}`);
}

export function getCommentsByPostIdApi(
  postId: number
): Promise<Comment[]> {
  return request<Comment[]>(`/posts/${postId}/comments`);
}

export function createPostApi(
  payload: CreatePostRequest
): Promise<Post> {
  return request<Post>('/posts', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updatePostApi(
  postId: number,
  payload: UpdatePostRequest,
  method: 'PUT' | 'PATCH'
): Promise<Post> {
  return request<Post>(`/posts/${postId}`, {
    method,
    body: JSON.stringify(payload),
  });
}

export function deletePostApi(postId: number): Promise<void> {
  return request<void>(`/posts/${postId}`, {
    method: 'DELETE',
  });
}
