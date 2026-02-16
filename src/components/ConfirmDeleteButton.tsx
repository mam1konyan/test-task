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
      className="rounded-lg bg-red-600 px-[0.9rem] py-2 text-[0.95rem] text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
      type="button"
      onClick={handleClick}
      disabled={disabled}
    >
      Delete
    </button>
  );
}

export default ConfirmDeleteButton;
