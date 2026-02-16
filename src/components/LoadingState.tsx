interface LoadingStateProps {
  label?: string;
}

function LoadingState({ label = 'Loading...' }: LoadingStateProps) {
  return <p className="my-3 text-slate-600">{label}</p>;
}

export default LoadingState;
