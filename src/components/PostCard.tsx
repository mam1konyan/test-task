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
    <article className="group flex flex-col h-full rounded-xl border border-white/5 bg-white/5 p-5 backdrop-blur-sm transition-all hover:border-white/10 hover:bg-white/10 hover:shadow-xl">
      <h3 className="mb-2 mt-0 text-lg font-semibold text-white group-hover:text-blue-400 line-clamp-2">
        {post.title}
      </h3>
      <p className="mb-4 text-slate-300 line-clamp-3 flex-grow">
        {post.body}
      </p>

      <div className="mt-auto flex items-center gap-4 pt-2">
        <Link
          className="text-sm font-medium text-blue-400 transition-colors hover:text-blue-300 hover:underline"
          to={`/posts/${post.id}`}
        >
          Details
        </Link>
        <Link
          className="text-sm font-medium text-blue-400 transition-colors hover:text-blue-300 hover:underline"
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
