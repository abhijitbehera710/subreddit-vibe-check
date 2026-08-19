import React from 'react';
import { SubredditAnalysis } from '../types';
import { Compass, Smile, Meh, Frown } from 'lucide-react';

interface VibeOverviewProps {
  analysis: SubredditAnalysis;
}

export const VibeOverview: React.FC<VibeOverviewProps> = ({ analysis }) => {
  const {
    overallVibe,
    overallDescription,
    positivePercentage,
    neutralPercentage,
    negativePercentage,
    positiveCount,
    neutralCount,
    negativeCount,
    subreddit
  } = analysis;

  // Sentiment color theme according to vibe
  const getVibeBadge = (vibe: string) => {
    if (vibe.includes('Positive')) {
      return {
        bg: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
        icon: Smile,
        iconColor: 'text-emerald-600 dark:text-emerald-400',
      };
    }
    if (vibe.includes('Critical') || vibe.includes('Negative') || vibe.includes('Skeptical')) {
      return {
        bg: 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
        icon: Frown,
        iconColor: 'text-rose-600 dark:text-rose-400',
      };
    }
    return {
      bg: 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
      icon: Meh,
      iconColor: 'text-blue-600 dark:text-blue-400',
    };
  };

  const vibeStyle = getVibeBadge(overallVibe);
  const VibeIcon = vibeStyle.icon;

  return (
    <div
      id="overall-vibe-card"
      className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between w-full transition-colors duration-200"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-orange-100/80 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                Overall Subreddit Vibe
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Synthesis of sentiment across hot posts in r/{subreddit}
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Dynamic Analytics
          </div>
        </div>

        {/* Big Vibe Callout */}
        <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-bold border ${vibeStyle.bg}`}>
                <VibeIcon className={`w-4 h-4 ${vibeStyle.iconColor}`} />
                {overallVibe}
              </span>
            </div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed max-w-xl">
              {overallDescription}
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0 text-right md:border-l md:border-slate-200 dark:md:border-slate-800 md:pl-6">
            <div>
              <div className="text-2xl font-black text-slate-900 dark:text-slate-100">
                {positivePercentage}%
              </div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Positivity Ratio
              </div>
            </div>
            <div className="w-px h-8 bg-slate-200 dark:bg-slate-800" />
            <div>
              <div className="text-2xl font-black text-slate-900 dark:text-slate-100">
                {negativePercentage}%
              </div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Critique Ratio
              </div>
            </div>
          </div>
        </div>

        {/* Sentiment Distribution Visualization Bar */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
            <span>Sentiment Distribution</span>
            <span className="text-slate-500 dark:text-slate-400 font-normal">100% total breakdown</span>
          </div>

          {/* Segmented Bar */}
          <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex shadow-inner p-0.5 gap-0.5">
            {positivePercentage > 0 && (
              <div
                style={{ width: `${positivePercentage}%` }}
                className="bg-emerald-500 hover:bg-emerald-600 rounded-l-full transition-all duration-500"
                title={`Positive: ${positivePercentage}% (${positiveCount} posts)`}
              />
            )}
            {neutralPercentage > 0 && (
              <div
                style={{ width: `${neutralPercentage}%` }}
                className="bg-slate-400 dark:bg-slate-500 hover:bg-slate-500 transition-all duration-500"
                title={`Neutral: ${neutralPercentage}% (${neutralCount} posts)`}
              />
            )}
            {negativePercentage > 0 && (
              <div
                style={{ width: `${negativePercentage}%` }}
                className="bg-rose-500 hover:bg-rose-600 rounded-r-full transition-all duration-500"
                title={`Negative: ${negativePercentage}% (${negativeCount} posts)`}
              />
            )}
          </div>

          {/* Clear Legend */}
          <div className="grid grid-cols-3 gap-2 pt-2 text-xs">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50">
              <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
              <div>
                <span className="font-semibold text-slate-900 dark:text-slate-100 block">Positive</span>
                <span className="text-slate-600 dark:text-slate-400 text-[11px]">{positivePercentage}% ({positiveCount})</span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
              <span className="w-3 h-3 rounded-full bg-slate-400 dark:bg-slate-400 shrink-0" />
              <div>
                <span className="font-semibold text-slate-900 dark:text-slate-100 block">Neutral</span>
                <span className="text-slate-600 dark:text-slate-400 text-[11px]">{neutralPercentage}% ({neutralCount})</span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-lg bg-rose-50/60 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/50">
              <span className="w-3 h-3 rounded-full bg-rose-500 shrink-0" />
              <div>
                <span className="font-semibold text-slate-900 dark:text-slate-100 block">Negative</span>
                <span className="text-slate-600 dark:text-slate-400 text-[11px]">{negativePercentage}% ({negativeCount})</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
