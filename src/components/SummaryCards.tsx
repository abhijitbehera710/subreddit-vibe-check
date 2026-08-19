import React from 'react';
import { Smile, Meh, Frown, Flame } from 'lucide-react';
import { SubredditAnalysis } from '../types';

interface SummaryCardsProps {
  analysis: SubredditAnalysis;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ analysis }) => {
  const cards = [
    {
      id: 'stat-posts-analyzed',
      label: 'Posts Analyzed',
      value: analysis.postsAnalyzed,
      description: 'Top hot posts evaluated',
      icon: Flame,
      iconBg: 'bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400',
      borderColor: 'border-slate-200 dark:border-slate-800',
      valueColor: 'text-slate-900 dark:text-slate-100',
    },
    {
      id: 'stat-positive-posts',
      label: 'Positive',
      value: analysis.positiveCount,
      description: `${analysis.positivePercentage}% of posts`,
      icon: Smile,
      iconBg: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400',
      borderColor: 'border-emerald-100 dark:border-emerald-900/40',
      valueColor: 'text-emerald-700 dark:text-emerald-400',
      badge: 'Optimistic',
      badgeClass: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
    },
    {
      id: 'stat-neutral-posts',
      label: 'Neutral',
      value: analysis.neutralCount,
      description: `${analysis.neutralPercentage}% of posts`,
      icon: Meh,
      iconBg: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300',
      borderColor: 'border-slate-200 dark:border-slate-800',
      valueColor: 'text-slate-700 dark:text-slate-200',
      badge: 'Balanced',
      badgeClass: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
    },
    {
      id: 'stat-negative-posts',
      label: 'Negative',
      value: analysis.negativeCount,
      description: `${analysis.negativePercentage}% of posts`,
      icon: Frown,
      iconBg: 'bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400',
      borderColor: 'border-rose-100 dark:border-rose-900/40',
      valueColor: 'text-rose-700 dark:text-rose-400',
      badge: 'Critical',
      badgeClass: 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800'
    },
  ];

  return (
    <section id="summary-cards-section" className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              id={card.id}
              className={`bg-white dark:bg-slate-900 rounded-xl p-5 border ${card.borderColor} shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {card.label}
                </span>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${card.iconBg}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-3">
                <div className={`text-3xl font-extrabold tracking-tight ${card.valueColor}`}>
                  {card.value}
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {card.description}
                  </p>
                  {card.badge && (
                    <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded border ${card.badgeClass}`}>
                      {card.badge}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
