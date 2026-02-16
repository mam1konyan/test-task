interface ErrorStateProps {
  message: string;
}

function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="my-4 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm font-medium text-red-400">
      Error: {message}
    </div>
  );
}

export default ErrorState;
