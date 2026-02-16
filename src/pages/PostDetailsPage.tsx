import { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import ErrorState from '$/components/ErrorState';
import {
  PostDetailsSkeleton,
  CommentSkeleton,
} from '$/components/Skeletons';
import { useAppDispatch, useAppSelector } from '$/store/hooks';
import {
  fetchCommentsByPostId,
  fetchPostById,
} from '$/store/postsSlice';

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
    return (
      <section>
        <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold text-white">
            Post Details
          </h2>
          <div className="flex gap-4">
            <Link
              className="cursor-pointer text-sm font-medium text-blue-400 transition-colors hover:text-blue-300 hover:underline"
              to="/posts"
            >
              Back to list
            </Link>
          </div>
        </div>
        <PostDetailsSkeleton />
      </section>
    );
  }

  if (!post) {
    return <ErrorState message="Post not found." />;
  }

  const comments = commentsByPostId[parsedPostId] ?? [];

  return (
    <section>
      <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-white">
          Post Details
        </h2>
        <div className="flex gap-4">
          <Link
            className="cursor-pointer text-sm font-medium text-blue-400 transition-colors hover:text-blue-300 hover:underline"
            to={`/posts/${post.id}/edit`}
          >
            Edit
          </Link>
          <Link
            className="cursor-pointer text-sm font-medium text-blue-400 transition-colors hover:text-blue-300 hover:underline"
            to="/posts"
          >
            Back to list
          </Link>
        </div>
      </div>

      {error ? <ErrorState message={error} /> : null}

      <article className="mb-8 rounded-xl border border-white/5 bg-white/5 p-6 shadow-xl backdrop-blur-sm">
        <h3 className="mb-3 mt-0 text-xl font-semibold text-white">
          {post.title}
        </h3>
        <p className="text-lg text-slate-300 leading-relaxed">
          {post.body}
        </p>
        <p className="mt-4 text-sm text-slate-500">
          User ID: {post.userId}
        </p>
      </article>

      <h3 className="mb-4 text-xl font-semibold text-white">
        Comments
      </h3>
      <ul className="m-0 grid list-none gap-3 p-0">
        {commentsStatus === 'loading'
          ? Array.from({ length: 3 }).map((_, i) => (
              <li key={i}>
                <CommentSkeleton />
              </li>
            ))
          : comments.map(comment => (
              <li
                key={comment.id}
                className="rounded-xl border border-white/5 bg-white/5 p-4 transition-colors hover:bg-white/10"
              >
                <p className="mb-1 font-bold text-white">
                  {comment.name}
                </p>
                <p className="m-0 text-slate-300">{comment.body}</p>
                <p className="mt-3 text-xs text-slate-500">
                  {comment.email}
                </p>
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
