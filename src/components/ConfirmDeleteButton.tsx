interface ConfirmDeleteButtonProps {
  disabled?: boolean;
  onConfirm: () => void;
}

function ConfirmDeleteButton({
  disabled = false,
  onConfirm,
}: ConfirmDeleteButtonProps) {
  const handleClick = () => {
    const shouldDelete = window.confirm('Delete this post?');
    if (shouldDelete) {
      onConfirm();
    }
  };

  return (
    <button
      className="danger"
      type="button"
      onClick={handleClick}
      disabled={disabled}
    >
      Delete
    </button>
  );
}

export default ConfirmDeleteButton;
