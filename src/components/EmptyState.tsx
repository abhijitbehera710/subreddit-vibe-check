import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  onTryAnother: () => void;
  isFiltered?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onTryAnother, isFiltered }) => {
  return (
    <div
      id="empty-state-container"
      className="w-full py-16 px-6 text-center space-y-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 transition-colors duration-200"
    >
      <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center mx-auto">
        <SearchX className="w-7 h-7" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          {isFiltered ? 'No matching posts' : 'No posts found'}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
          {isFiltered
            ? 'Try changing your search or sentiment filter.'
            : "We couldn't find any posts for this subreddit. Try searching another subreddit."}
        </p>
      </div>

      <div className="pt-2">
        <button
          id="try-another-subreddit-btn"
          onClick={onTryAnother}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-orange-600 dark:hover:bg-orange-500 text-white text-sm font-semibold rounded-xl transition-all shadow-xs cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{isFiltered ? 'Clear Filters' : 'Try Another Subreddit'}</span>
        </button>
      </div>
    </div>
  );
};
