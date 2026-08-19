import React from 'react';
import { RedditPost, DisplayLimit } from '../types';
import {
  Smile,
  Meh,
  Frown,
  MessageSquare,
  ArrowBigUp,
  ChevronRight,
} from 'lucide-react';

interface PostTableProps {
  posts: RedditPost[];
  subreddit: string;
  totalPostsInSubreddit: number;
  matchingCount: number;
  displayLimit: DisplayLimit;
  onDisplayLimitChange: (limit: DisplayLimit) => void;
  onSelectPost: (post: RedditPost) => void;
  children?: React.ReactNode;
}

export const PostTable: React.FC<PostTableProps> = ({
  posts,
  subreddit,
  totalPostsInSubreddit,
  matchingCount,
  displayLimit,
  onDisplayLimitChange,
  onSelectPost,
  children,
}) => {
  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <Smile className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            Positive
          </span>
        );
      case 'Negative':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
            <Frown className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 shrink-0" />
            Negative
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            <Meh className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0" />
            Neutral
          </span>
        );
    }
  };

  const getSentimentScoreBadge = (score: number) => {
    if (score > 0) {
      return (
        <span className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
          +{score}
        </span>
      );
    }
    if (score < 0) {
      return (
        <span className="font-mono text-xs font-bold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-800">
          {score}
        </span>
      );
    }
    return (
      <span className="font-mono text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
        0
      </span>
    );
  };

  const isFiltered = matchingCount < totalPostsInSubreddit;

  return (
    <div className="w-full">
      {/* 1. Primary Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Top 50 Hot Posts
            </h2>
            <span
              id="showing-posts-badge"
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
            >
              {isFiltered
                ? `Showing ${posts.length} of ${matchingCount} matching posts`
                : `Showing ${posts.length} of ${totalPostsInSubreddit} posts`}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal">
            Sentiment analysis of the latest hot posts from r/{subreddit}
          </p>
        </div>

        {/* 2. Display Control Segmented Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Display:</span>
          <div
            id="display-limit-control"
            className="inline-flex rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-950 p-0.5 text-xs shadow-2xs"
          >
            <button
              id="display-top-10-btn"
              type="button"
              onClick={() => onDisplayLimitChange(10)}
              className={`px-3 py-1.5 font-bold rounded-md transition-all cursor-pointer ${
                displayLimit === 10
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
              }`}
            >
              Top 10
            </button>
            <button
              id="display-top-25-btn"
              type="button"
              onClick={() => onDisplayLimitChange(25)}
              className={`px-3 py-1.5 font-bold rounded-md transition-all cursor-pointer ${
                displayLimit === 25
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
              }`}
            >
              Top 25
            </button>
            <button
              id="display-all-50-btn"
              type="button"
              onClick={() => onDisplayLimitChange(50)}
              className={`px-3 py-1.5 font-bold rounded-md transition-all cursor-pointer ${
                displayLimit === 50
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
              }`}
            >
              All {totalPostsInSubreddit > 0 ? totalPostsInSubreddit : 50}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Filter Controls Slot */}
      {children}

      {/* 4. Desktop Table (when posts exist) */}
      {posts.length > 0 && (
        <div className="hidden md:block overflow-x-auto">
          <table id="posts-table" className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="py-3.5 px-6">Post Title</th>
                <th className="py-3.5 px-4 text-right">Score</th>
                <th className="py-3.5 px-4 text-right">Comments</th>
                <th className="py-3.5 px-4 text-center">Sentiment</th>
                <th className="py-3.5 px-6 text-center">Sentiment Score</th>
                <th className="py-3.5 px-4 text-center sr-only">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {posts.map((post) => {
                const commentsCount = post.comments ?? post.numComments ?? 0;
                const timeDisplay = post.createdAt ?? post.createdUtc ?? 'recent';
                const flairTag = post.category ?? post.flair;

                return (
                  <tr
                    key={post.id}
                    id={`post-row-${post.id}`}
                    onClick={() => onSelectPost(post)}
                    className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                  >
                    <td className="py-4 px-6 max-w-lg">
                      <div className="space-y-1">
                        <span className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors text-sm line-clamp-2 leading-snug">
                          {post.title}
                        </span>
                        <div className="flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400">
                          <span className="font-medium text-slate-600 dark:text-slate-300">u/{post.author}</span>
                          <span>•</span>
                          <span>{timeDisplay}</span>
                          {flairTag && (
                            <>
                              <span>•</span>
                              <span className="text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                                {flairTag}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-right font-semibold text-slate-800 dark:text-slate-200 text-sm">
                      <div className="inline-flex items-center gap-1">
                        <ArrowBigUp className="w-4 h-4 text-orange-500" />
                        <span>{post.score.toLocaleString()}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-right font-semibold text-slate-700 dark:text-slate-300 text-sm">
                      <div className="inline-flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
                        <span>{commentsCount.toLocaleString()}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-center">
                      {getSentimentBadge(post.sentiment)}
                    </td>

                    <td className="py-4 px-6 text-center">
                      {getSentimentScoreBadge(post.sentimentScore)}
                    </td>

                    <td className="py-4 px-4 text-center">
                      <span className="text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 inline-flex items-center p-1 rounded hover:bg-slate-200/50 dark:hover:bg-slate-800">
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* 5. Mobile Card List (when posts exist) */}
      {posts.length > 0 && (
        <div className="md:hidden divide-y divide-slate-200 dark:divide-slate-800">
          {posts.map((post) => {
            const commentsCount = post.comments ?? post.numComments ?? 0;
            const timeDisplay = post.createdAt ?? post.createdUtc ?? 'recent';
            const flairTag = post.category ?? post.flair;

            return (
              <div
                key={post.id}
                id={`post-mobile-card-${post.id}`}
                onClick={() => onSelectPost(post)}
                className="p-4 space-y-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 active:bg-slate-100 dark:active:bg-slate-800 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm leading-snug">
                    {post.title}
                  </h4>
                  {getSentimentBadge(post.sentiment)}
                </div>

                <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2 pt-1">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 font-semibold text-slate-800 dark:text-slate-200">
                      <ArrowBigUp className="w-3.5 h-3.5 text-orange-500" />
                      {post.score.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1 font-medium text-slate-600 dark:text-slate-300">
                      <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
                      {commentsCount.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Score:</span>
                    {getSentimentScoreBadge(post.sentimentScore)}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                  <span>u/{post.author}</span>
                  <span>•</span>
                  <span>{timeDisplay}</span>
                  {flairTag && (
                    <span className="ml-auto text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                      {flairTag}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
