import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  subreddit: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ subreddit }) => {
  return (
    <div id="loading-state-container" className="w-full py-12 px-4 sm:px-6 lg:px-8 space-y-8 animate-pulse">
      {/* Header status */}
      <div className="text-center space-y-3 max-w-md mx-auto">
        <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center mx-auto">
          <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Analyzing r/{subreddit}…
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Evaluating sentiment polarity, keyword weights, and comment engagement across top hot posts.
        </p>
      </div>

      {/* Skeleton Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
            <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
            <div className="h-3 bg-slate-100 dark:bg-slate-800/60 rounded w-2/3" />
          </div>
        ))}
      </div>

      {/* Skeleton Vibe & Sentiment Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
          <div className="h-16 bg-slate-100 dark:bg-slate-800/60 rounded-xl" />
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full" />
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
          <div className="grid grid-cols-3 gap-3">
            <div className="h-20 bg-slate-100 dark:bg-slate-800/60 rounded-xl" />
            <div className="h-20 bg-slate-100 dark:bg-slate-800/60 rounded-xl" />
            <div className="h-20 bg-slate-100 dark:bg-slate-800/60 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Skeleton Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-6 space-y-4">
        <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
        <div className="space-y-3 pt-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 bg-slate-100 dark:bg-slate-800/60 rounded-lg flex items-center justify-between px-4">
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
              <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
