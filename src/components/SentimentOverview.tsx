import React from 'react';
import { SubredditAnalysis } from '../types';
import { Smile, Meh, Frown, TrendingUp, TrendingDown, Minus, BarChart2 } from 'lucide-react';

interface SentimentOverviewProps {
  analysis: SubredditAnalysis;
}

export const SentimentOverview: React.FC<SentimentOverviewProps> = ({ analysis }) => {
  const {
    positiveCount,
    positivePercentage,
    neutralCount,
    neutralPercentage,
    negativeCount,
    negativePercentage
  } = analysis;

  const categories = [
    {
      id: 'sentiment-cat-positive',
      label: 'Positive',
      posts: positiveCount,
      percentage: positivePercentage,
      icon: Smile,
      trendIcon: TrendingUp,
      badgeText: 'Upbeat / Enthusiastic',
      barColor: 'bg-emerald-500',
      trackColor: 'bg-emerald-100 dark:bg-emerald-950/60',
      textColor: 'text-emerald-700 dark:text-emerald-300',
      bgColor: 'bg-emerald-50/50 dark:bg-emerald-950/20',
      borderColor: 'border-emerald-200/80 dark:border-emerald-900/40',
      badgeBg: 'bg-white dark:bg-emerald-950/80',
      description: 'Discussions featuring breakthroughs, announcements, appreciation, and community successes.'
    },
    {
      id: 'sentiment-cat-neutral',
      label: 'Neutral',
      posts: neutralCount,
      percentage: neutralPercentage,
      icon: Meh,
      trendIcon: Minus,
      badgeText: 'Informational / Inquiries',
      barColor: 'bg-slate-500',
      trackColor: 'bg-slate-200 dark:bg-slate-800',
      textColor: 'text-slate-700 dark:text-slate-300',
      bgColor: 'bg-slate-50/50 dark:bg-slate-800/30',
      borderColor: 'border-slate-200 dark:border-slate-800',
      badgeBg: 'bg-white dark:bg-slate-800',
      description: 'Factual updates, documentation links, questions, open polls, and technical comparisons.'
    },
    {
      id: 'sentiment-cat-negative',
      label: 'Negative',
      posts: negativeCount,
      percentage: negativePercentage,
      icon: Frown,
      trendIcon: TrendingDown,
      badgeText: 'Critical / Grievances',
      barColor: 'bg-rose-500',
      trackColor: 'bg-rose-100 dark:bg-rose-950/60',
      textColor: 'text-rose-700 dark:text-rose-300',
      bgColor: 'bg-rose-50/50 dark:bg-rose-950/20',
      borderColor: 'border-rose-200/80 dark:border-rose-900/40',
      badgeBg: 'bg-white dark:bg-rose-950/80',
      description: 'Outage reports, bugs, pricing frustrations, policy critiques, and deprecation disputes.'
    }
  ];

  return (
    <div
      id="sentiment-overview-card"
      className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6 w-full transition-colors duration-200"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/40">
            <BarChart2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Sentiment Overview
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Categorical breakdown of mood signals across active titles
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
          3-Tier Classifier
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;

          return (
            <div
              key={cat.id}
              id={cat.id}
              className={`rounded-xl p-5 border ${cat.borderColor} ${cat.bgColor} flex flex-col justify-between space-y-4 hover:shadow-xs transition-shadow duration-200`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-5 h-5 ${cat.textColor}`} />
                    <span className="font-bold text-slate-900 dark:text-slate-100 text-base">
                      {cat.label}
                    </span>
                  </div>
                  <span className={`text-[11px] font-semibold uppercase px-2 py-0.5 rounded-full ${cat.textColor} ${cat.badgeBg} border border-current/20`}>
                    {cat.badgeText}
                  </span>
                </div>

                <div className="mt-4 flex items-baseline justify-between">
                  <div className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                    {cat.percentage}%
                  </div>
                  <div className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                    {cat.posts} posts
                  </div>
                </div>

                {/* Progress Meter */}
                <div className="mt-3 w-full">
                  <div className={`h-2.5 w-full rounded-full ${cat.trackColor} overflow-hidden`}>
                    <div
                      style={{ width: `${cat.percentage}%` }}
                      className={`h-full rounded-full ${cat.barColor} transition-all duration-500`}
                    />
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200/60 dark:border-slate-800 pt-3">
                {cat.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
