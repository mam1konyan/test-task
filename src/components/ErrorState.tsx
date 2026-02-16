interface ErrorStateProps {
  message: string;
}

function ErrorState({ message }: ErrorStateProps) {
  return <p className="status error">Error: {message}</p>;
}

export default ErrorState;
