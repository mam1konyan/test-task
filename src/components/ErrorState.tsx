interface ErrorStateProps {
  message: string;
}

function ErrorState({ message }: ErrorStateProps) {
  return <p className="my-3 text-red-600">Error: {message}</p>;
}

export default ErrorState;
