import { AlertCircle, RefreshCcw } from 'lucide-react';
import { Button } from './Button';

interface ErrorDisplayProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorDisplay({
  title = 'Something went wrong',
  message = 'An error occurred while loading data.',
  onRetry,
}: ErrorDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-zinc-400 max-w-sm mb-6">{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          <RefreshCcw className="w-4 h-4" />
          Try Again
        </Button>
      )}
    </div>
  );
}

export function ErrorPage({ message }: { message?: string }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <ErrorDisplay message={message} />
    </div>
  );
}
