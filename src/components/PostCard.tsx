import { Link } from 'react-router-dom';
import type { Post } from '../types/post';
import ConfirmDeleteButton from './ConfirmDeleteButton';

interface PostCardProps {
  post: Post;
  deleting: boolean;
  onDelete: (postId: number) => void;
}

function PostCard({ post, deleting, onDelete }: PostCardProps) {
  return (
    <article className="post-card">
      <h3>{post.title}</h3>
      <p>{post.body}</p>

      <div className="post-card-actions">
        <Link to={`/posts/${post.id}`}>Details</Link>
        <Link to={`/posts/${post.id}/edit`}>Edit</Link>
        <ConfirmDeleteButton
          disabled={deleting}
          onConfirm={() => onDelete(post.id)}
        />
      </div>
    </article>
  );
}

export default PostCard;
