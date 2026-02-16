import { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import ErrorState from '../components/ErrorState';
import LoadingState from '../components/LoadingState';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchCommentsByPostId,
  fetchPostById,
} from '../store/postsSlice';

function PostDetailsPage() {
  const { postId } = useParams();
  const parsedPostId = Number(postId);
  const dispatch = useAppDispatch();
  const {
    posts,
    selectedPost,
    commentsByPostId,
    detailsStatus,
    commentsStatus,
    error,
  } = useAppSelector(state => state.posts);

  useEffect(() => {
    if (!Number.isFinite(parsedPostId)) {
      return;
    }

    void dispatch(fetchPostById(parsedPostId));
    void dispatch(fetchCommentsByPostId(parsedPostId));
  }, [dispatch, parsedPostId]);

  const post = useMemo(() => {
    if (selectedPost?.id === parsedPostId) {
      return selectedPost;
    }

    return posts.find(item => item.id === parsedPostId) ?? null;
  }, [selectedPost, posts, parsedPostId]);

  if (!Number.isFinite(parsedPostId)) {
    return <ErrorState message="Invalid post id." />;
  }

  if (detailsStatus === 'loading' && !post) {
    return <LoadingState label="Loading post..." />;
  }

  if (!post) {
    return <ErrorState message="Post not found." />;
  }

  const comments = commentsByPostId[parsedPostId] ?? [];

  return (
    <section>
      <div className="mb-4 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold">Post Details</h2>
        <div className="flex gap-3">
          <Link
            className="text-blue-700 hover:underline"
            to={`/posts/${post.id}/edit`}
          >
            Edit
          </Link>
          <Link className="text-blue-700 hover:underline" to="/posts">
            Back to list
          </Link>
        </div>
      </div>

      {error ? <ErrorState message={error} /> : null}

      <article className="mb-5 rounded-lg border border-slate-200 p-[0.85rem]">
        <h3 className="mb-1.5 mt-0 text-lg font-semibold">
          {post.title}
        </h3>
        <p className="m-0">{post.body}</p>
        <p className="mt-2 text-slate-500">User ID: {post.userId}</p>
      </article>

      <h3 className="text-xl font-semibold">Comments</h3>
      {commentsStatus === 'loading' ? (
        <LoadingState label="Loading comments..." />
      ) : null}
      <ul className="m-0 grid list-none gap-3 p-0">
        {comments.map(comment => (
          <li
            key={comment.id}
            className="rounded-lg border border-slate-200 p-3"
          >
            <p className="mb-1 font-bold">{comment.name}</p>
            <p className="m-0">{comment.body}</p>
            <p className="mt-2 text-slate-500">{comment.email}</p>
          </li>
        ))}
      </ul>
      {commentsStatus === 'succeeded' && comments.length === 0 ? (
        <p>No comments for this post.</p>
      ) : null}
    </section>
  );
}

export default PostDetailsPage;
