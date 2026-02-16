import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createPostApi,
  deletePostApi,
  getCommentsByPostIdApi,
  getPostByIdApi,
  getPostsApi,
  updatePostApi,
} from '$/api/postsApi';
import type {
  AsyncStatus,
  Comment,
  CreatePostRequest,
  Post,
  UpdatePostRequest,
} from '$/types/post';

interface PostsState {
  posts: Post[];
  selectedPost: Post | null;
  commentsByPostId: Record<number, Comment[]>;
  listStatus: AsyncStatus;
  detailsStatus: AsyncStatus;
  commentsStatus: AsyncStatus;
  mutationStatus: AsyncStatus;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  selectedPost: null,
  commentsByPostId: {},
  listStatus: 'idle',
  detailsStatus: 'idle',
  commentsStatus: 'idle',
  mutationStatus: 'idle',
  error: null,
};

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return error.message;
  }

  return 'Unexpected error';
};

export const fetchPosts = createAsyncThunk<Post[]>(
  'posts/fetchPosts',
  async () => getPostsApi()
);

export const fetchPostById = createAsyncThunk<Post, number>(
  'posts/fetchPostById',
  async postId => getPostByIdApi(postId)
);

export const fetchCommentsByPostId = createAsyncThunk<
  { postId: number; comments: Comment[] },
  number
>('posts/fetchCommentsByPostId', async postId => {
  const comments = await getCommentsByPostIdApi(postId);
  return { postId, comments };
});

export const createPost = createAsyncThunk<Post, CreatePostRequest>(
  'posts/createPost',
  async payload => createPostApi(payload)
);

export const updatePost = createAsyncThunk<
  Post,
  {
    postId: number;
    payload: UpdatePostRequest;
    method?: 'PUT' | 'PATCH';
  }
>('posts/updatePost', async ({ postId, payload, method = 'PATCH' }) =>
  updatePostApi(postId, payload, method)
);

export const deletePost = createAsyncThunk<number, number>(
  'posts/deletePost',
  async postId => {
    await deletePostApi(postId);
    return postId;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearSelectedPost(state) {
      state.selectedPost = null;
    },
    clearError(state) {
      state.error = null;
    },
    resetMutationStatus(state) {
      state.mutationStatus = 'idle';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.listStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.listStatus = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.listStatus = 'failed';
        state.error = getErrorMessage(action.error);
      })
      .addCase(fetchPostById.pending, state => {
        state.detailsStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.detailsStatus = 'succeeded';
        state.selectedPost = action.payload;

        const existingIndex = state.posts.findIndex(
          post => post.id === action.payload.id
        );
        if (existingIndex === -1) {
          state.posts.unshift(action.payload);
        } else {
          state.posts[existingIndex] = action.payload;
        }
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.detailsStatus = 'failed';
        state.error = getErrorMessage(action.error);
      })
      .addCase(fetchCommentsByPostId.pending, state => {
        state.commentsStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
        state.commentsStatus = 'succeeded';
        state.commentsByPostId[action.payload.postId] =
          action.payload.comments;
      })
      .addCase(fetchCommentsByPostId.rejected, (state, action) => {
        state.commentsStatus = 'failed';
        state.error = getErrorMessage(action.error);
      })
      .addCase(createPost.pending, state => {
        state.mutationStatus = 'loading';
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded';
        const post: Post = {
          ...action.payload,
          id: action.payload.id ?? Date.now(),
        };
        state.posts.unshift(post);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.error = getErrorMessage(action.error);
      })
      .addCase(updatePost.pending, state => {
        state.mutationStatus = 'loading';
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded';

        const index = state.posts.findIndex(
          post => post.id === action.payload.id
        );
        if (index === -1) {
          state.posts.unshift(action.payload);
        } else {
          state.posts[index] = {
            ...state.posts[index],
            ...action.payload,
          };
        }

        if (state.selectedPost?.id === action.payload.id) {
          state.selectedPost = {
            ...state.selectedPost,
            ...action.payload,
          };
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.error = getErrorMessage(action.error);
      })
      .addCase(deletePost.pending, state => {
        state.mutationStatus = 'loading';
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded';
        state.posts = state.posts.filter(
          post => post.id !== action.payload
        );

        if (state.selectedPost?.id === action.payload) {
          state.selectedPost = null;
        }

        delete state.commentsByPostId[action.payload];
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.error = getErrorMessage(action.error);
      });
  },
});

export const { clearSelectedPost, clearError, resetMutationStatus } =
  postsSlice.actions;

export default postsSlice.reducer;
