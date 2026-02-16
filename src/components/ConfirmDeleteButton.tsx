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
      className="rounded-xl bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 border border-red-500/20 transition-all hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
      type="button"
      onClick={handleClick}
      disabled={disabled}
    >
      Delete
    </button>
  );
}

export default ConfirmDeleteButton;
