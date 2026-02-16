import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorState from '../components/ErrorState';
import LoadingState from '../components/LoadingState';
import PostCard from '../components/PostCard';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { deletePost, fetchPosts } from '../store/postsSlice';

function PostsListPage() {
  const dispatch = useAppDispatch();
  const { posts, listStatus, mutationStatus, error } = useAppSelector(
    state => state.posts
  );
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    if (listStatus === 'idle') {
      void dispatch(fetchPosts());
    }
  }, [dispatch, listStatus]);

  const handleDelete = async (postId: number) => {
    setDeletingId(postId);
    try {
      await dispatch(deletePost(postId)).unwrap();
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section>
      <div className="section-title">
        <h2>Posts</h2>
        <Link className="primary" to="/posts/new">
          Create Post
        </Link>
      </div>

      {listStatus === 'loading' ? (
        <LoadingState label="Loading posts..." />
      ) : null}
      {error ? <ErrorState message={error} /> : null}

      <div className="post-grid">
        {posts.map(post => (
          <PostCard
            key={post.id}
            post={post}
            deleting={
              mutationStatus === 'loading' && deletingId === post.id
            }
            onDelete={handleDelete}
          />
        ))}
      </div>

      {listStatus === 'succeeded' && posts.length === 0 ? (
        <p>No posts found.</p>
      ) : null}
    </section>
  );
}

export default PostsListPage;
