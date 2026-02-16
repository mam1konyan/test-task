import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ErrorState from '$/components/ErrorState';
import LoadingState from '$/components/LoadingState';
import { GenericForm } from '$/components/GenericForm';
import {
  usePostsFormFields,
  type PostFormValues,
} from '$/hooks/usePostsFormFields';
import { useAppDispatch, useAppSelector } from '$/store/hooks';
import {
  createPost,
  fetchPostById,
  updatePost,
} from '$/store/postsSlice';

function PostFormPage() {
  const { postId } = useParams();
  const parsedPostId = Number(postId);
  const isEditMode = Number.isFinite(parsedPostId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    posts,
    selectedPost,
    detailsStatus,
    mutationStatus,
    error,
  } = useAppSelector(state => state.posts);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditMode) {
      void dispatch(fetchPostById(parsedPostId));
    }
  }, [dispatch, isEditMode, parsedPostId]);

  const post = useMemo(() => {
    if (!isEditMode) {
      return null;
    }

    if (selectedPost?.id === parsedPostId) {
      return selectedPost;
    }

    return posts.find(item => item.id === parsedPostId) ?? null;
  }, [isEditMode, parsedPostId, posts, selectedPost]);

  const { fields } = usePostsFormFields({ post });

  const submitLabel = isEditMode ? 'Update Post' : 'Create Post';

  const handleSubmit = async (values: PostFormValues) => {
    setSubmitError(null);
    try {
      if (isEditMode) {
        await dispatch(
          updatePost({
            postId: parsedPostId,
            payload: values,
            method: 'PATCH',
          })
        ).unwrap();
      } else {
        await dispatch(createPost(values)).unwrap();
      }

      navigate('/posts');
    } catch (submitErr) {
      const message =
        submitErr instanceof Error
          ? submitErr.message
          : 'Failed to save post.';
      setSubmitError(message);
    }
  };

  if (isEditMode && detailsStatus === 'loading' && !post) {
    return <LoadingState label="Loading post data..." />;
  }

  if (isEditMode && !post && detailsStatus === 'failed') {
    return (
      <ErrorState
        message={error ?? 'Could not load post for editing.'}
      />
    );
  }

  return (
    <section>
      <div className="mb-4 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold">
          {isEditMode ? 'Edit Post' : 'Create Post'}
        </h2>
        <Link className="text-blue-700 hover:underline" to="/posts">
          Back to list
        </Link>
      </div>

      {submitError ? <ErrorState message={submitError} /> : null}

      <GenericForm<PostFormValues>
        fields={fields}
        onSubmit={handleSubmit}
        submitButtonText={submitLabel}
        loading={mutationStatus === 'loading'}
      />
    </section>
  );
}

export default PostFormPage;
