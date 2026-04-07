interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

export function ErrorMessage({ message, onRetry, retryLabel = 'Try Again', className = '' }: ErrorMessageProps) {
  return (
    <div className={`rounded-xl border border-red-200 bg-red-50 p-4 text-red-800 ${className}`} role="alert">
      <div className="flex items-start gap-3">
        <svg className="mt-0.5 h-5 w-5 text-red-600 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 10-1.5 0v4.5a.75.75 0 001.5 0v-4.5zm0 7.5a.75.75 0 10-1.5 0 .75.75 0 001.5 0z" clipRule="evenodd" />
        </svg>
        <div className="flex-1">
          <p className="font-medium">{message}</p>
          {onRetry ? (
            <button type="button" onClick={onRetry} className="mt-3 inline-flex items-center rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700">
              {retryLabel}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
