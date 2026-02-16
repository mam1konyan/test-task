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
      <div className="mb-4 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold">Posts</h2>
        <Link
          className="inline-flex rounded-lg bg-blue-700 px-[0.9rem] py-2 text-[0.95rem] text-white hover:bg-blue-800"
          to="/posts/new"
        >
          Create Post
        </Link>
      </div>

      {listStatus === 'loading' ? (
        <LoadingState label="Loading posts..." />
      ) : null}
      {error ? <ErrorState message={error} /> : null}

      <div className="grid gap-[0.9rem]">
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
