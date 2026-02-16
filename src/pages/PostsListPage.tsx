import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorState from '$/components/ErrorState';
import { PostCardSkeleton } from '$/components/Skeletons';
import PostCard from '$/components/PostCard';
import { useAppDispatch, useAppSelector } from '$/store/hooks';
import { deletePost, fetchPosts } from '$/store/postsSlice';

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
      <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-white">Posts</h2>
        <Link
          className="cursor-pointer inline-flex rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-500 hover:shadow-blue-500/40"
          to="/posts/new"
        >
          Create Post
        </Link>
      </div>

      {error ? <ErrorState message={error} /> : null}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {listStatus === 'loading'
          ? Array.from({ length: 8 }).map((_, i) => (
              <PostCardSkeleton key={i} />
            ))
          : posts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                deleting={
                  mutationStatus === 'loading' &&
                  deletingId === post.id
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
