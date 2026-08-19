import React from 'react';
import { RedditPost } from '../types';
import { X, ExternalLink, MessageSquare, ArrowBigUp, Smile, Meh, Frown, Sparkles, User, Clock, Tag } from 'lucide-react';

interface PostModalProps {
  post: RedditPost | null;
  onClose: () => void;
  subreddit: string;
}

export const PostModal: React.FC<PostModalProps> = ({ post, onClose, subreddit }) => {
  if (!post) return null;

  const getSentimentConfig = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive':
        return {
          icon: Smile,
          badgeBg: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
          scoreBadge: 'text-emerald-700 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-950/80',
          desc: 'Positive Sentiment'
        };
      case 'Negative':
        return {
          icon: Frown,
          badgeBg: 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
          scoreBadge: 'text-rose-700 dark:text-rose-300 bg-rose-100/80 dark:bg-rose-950/80',
          desc: 'Negative Sentiment'
        };
      default:
        return {
          icon: Meh,
          badgeBg: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700',
          scoreBadge: 'text-slate-700 dark:text-slate-300 bg-slate-200/80 dark:bg-slate-800',
          desc: 'Neutral Sentiment'
        };
    }
  };

  const config = getSentimentConfig(post.sentiment);
  const SentimentIcon = config.icon;

  return (
    <div
      id="post-details-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        id="post-details-modal"
        className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-slate-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 text-xs font-bold font-mono border border-orange-200/60 dark:border-orange-900/40">
              r/{subreddit}
            </span>
            {post.flair && (
              <span className="px-2.5 py-1 rounded-md bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1 border border-slate-300/60 dark:border-slate-700">
                <Tag className="w-3 h-3" />
                {post.flair}
              </span>
            )}
          </div>

          <button
            id="close-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Full Title */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 leading-snug">
              {post.title}
            </h3>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5 font-medium">
                <User className="w-3.5 h-3.5 text-slate-400" />
                u/{post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {post.createdUtc}
              </span>
            </div>
          </div>

          {/* Key Metric Gauges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-center">
              <div className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
                <ArrowBigUp className="w-3.5 h-3.5 text-orange-500" /> Score
              </div>
              <div className="text-lg font-black text-slate-900 dark:text-slate-100 mt-1">
                {post.score.toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Upvotes</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-center">
              <div className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
                <MessageSquare className="w-3.5 h-3.5 text-blue-500" /> Comments
              </div>
              <div className="text-lg font-black text-slate-900 dark:text-slate-100 mt-1">
                {post.numComments.toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Discussions</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-center">
              <div className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
                Sentiment
              </div>
              <div className="mt-1 flex items-center justify-center gap-1 font-bold text-sm">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs border ${config.badgeBg}`}>
                  <SentimentIcon className="w-3 h-3" />
                  {post.sentiment}
                </span>
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Classification</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-center">
              <div className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
                Score Index
              </div>
              <div className="text-lg font-black mt-1">
                <span className={`px-2 py-0.5 rounded-md text-xs font-mono font-bold ${config.scoreBadge}`}>
                  {post.sentimentScore > 0 ? `+${post.sentimentScore}` : post.sentimentScore}
                </span>
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Polarity (-5 to +5)</div>
            </div>
          </div>

          {/* Sentiment Analysis Reasoning */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              Sentiment Analysis Detail
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {post.sentimentExplanation || `This post title conveys a ${post.sentiment.toLowerCase()} tone based on natural language vocabulary and headline semantics.`}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-4 px-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/60">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Post Reference: <span className="font-mono text-slate-700 dark:text-slate-300">{post.id}</span>
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg border border-slate-300 dark:border-slate-700 transition-colors cursor-pointer"
            >
              Close
            </button>
            <a
              id="view-on-reddit-link"
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors shadow-xs"
            >
              <span>View on Reddit</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
