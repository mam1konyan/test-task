interface LoadingStateProps {
  label?: string;
}

function LoadingState({ label = 'Loading...' }: LoadingStateProps) {
  return (
    <div className="my-8 flex flex-col items-center justify-center gap-3">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500/20 border-t-blue-500"></div>
      <p className="text-sm font-medium text-slate-400 animate-pulse">
        {label}
      </p>
    </div>
  );
}

export default LoadingState;
