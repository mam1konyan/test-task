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
      <div className="section-title">
        <h2>Post Details</h2>
        <div className="actions-inline">
          <Link to={`/posts/${post.id}/edit`}>Edit</Link>
          <Link to="/posts">Back to list</Link>
        </div>
      </div>

      {error ? <ErrorState message={error} /> : null}

      <article className="post-card full-width">
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <p className="post-meta">User ID: {post.userId}</p>
      </article>

      <h3>Comments</h3>
      {commentsStatus === 'loading' ? (
        <LoadingState label="Loading comments..." />
      ) : null}
      <ul className="comments-list">
        {comments.map(comment => (
          <li key={comment.id}>
            <p className="comment-name">{comment.name}</p>
            <p>{comment.body}</p>
            <p className="comment-email">{comment.email}</p>
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
