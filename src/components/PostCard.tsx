import { Link } from 'react-router-dom';
import type { Post } from '$/types/post';
import ConfirmDeleteButton from './ConfirmDeleteButton';

interface PostCardProps {
  post: Post;
  deleting: boolean;
  onDelete: (postId: number) => void;
}

function PostCard({ post, deleting, onDelete }: PostCardProps) {
  return (
    <article className="rounded-lg border border-slate-200 p-[0.85rem]">
      <h3 className="mb-1.5 mt-0 text-lg font-semibold">
        {post.title}
      </h3>
      <p className="m-0">{post.body}</p>

      <div className="mt-[0.9rem] flex items-center gap-3">
        <Link
          className="text-blue-700 hover:underline"
          to={`/posts/${post.id}`}
        >
          Details
        </Link>
        <Link
          className="text-blue-700 hover:underline"
          to={`/posts/${post.id}/edit`}
        >
          Edit
        </Link>
        <ConfirmDeleteButton
          disabled={deleting}
          onConfirm={() => onDelete(post.id)}
        />
      </div>
    </article>
  );
}

export default PostCard;
