interface LoadingStateProps {
  label?: string;
}

function LoadingState({ label = 'Loading...' }: LoadingStateProps) {
  return <p className="status loading">{label}</p>;
}

export default LoadingState;
