import React from 'react';
import { Search, Filter, ArrowUpDown, X } from 'lucide-react';
import { FilterState, SentimentType, SortOption } from '../types';

interface PostFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalFiltered: number;
  totalOriginal: number;
}

export const PostFilters: React.FC<PostFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalFiltered,
  totalOriginal,
}) => {
  const sentimentOptions: ('All' | SentimentType)[] = ['All', 'Positive', 'Neutral', 'Negative'];

  const hasActiveFilters =
    filters.searchQuery.trim() !== '' ||
    filters.sentiment !== 'All' ||
    filters.sortBy !== 'score_desc';

  return (
    <div
      id="post-filters-container"
      className="bg-slate-50/80 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 p-4 sm:p-5 space-y-3.5 transition-colors duration-200"
    >
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3.5">
        {/* 1. Search Input */}
        <div className="relative flex-1 min-w-[240px]">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            id="search-posts-input"
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            placeholder="Search post titles..."
            className="w-full pl-9 pr-9 py-2 text-sm font-medium text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors shadow-2xs placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
          {filters.searchQuery && (
            <button
              id="clear-search-btn"
              type="button"
              onClick={() => onFilterChange({ searchQuery: '' })}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* 2. Sentiment Filter Segmented Control */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-1 hidden sm:inline-flex items-center gap-1">
            <Filter className="w-3 h-3" /> Sentiment:
          </span>
          <div className="inline-flex rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 p-0.5 shadow-2xs">
            {sentimentOptions.map((opt) => {
              const isSelected = filters.sentiment === opt;
              let selectedClass = 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-2xs font-bold';
              if (isSelected && opt === 'Positive') {
                selectedClass = 'bg-emerald-600 text-white shadow-2xs font-bold';
              } else if (isSelected && opt === 'Neutral') {
                selectedClass = 'bg-slate-800 dark:bg-slate-700 text-white shadow-2xs font-bold';
              } else if (isSelected && opt === 'Negative') {
                selectedClass = 'bg-rose-600 text-white shadow-2xs font-bold';
              }

              return (
                <button
                  key={opt}
                  id={`filter-sentiment-${opt.toLowerCase()}`}
                  type="button"
                  onClick={() => onFilterChange({ sentiment: opt })}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    isSelected
                      ? selectedClass
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Sorting Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <label
            htmlFor="sort-posts-select"
            className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1 shrink-0"
          >
            <ArrowUpDown className="w-3 h-3" /> Sort:
          </label>
          <select
            id="sort-posts-select"
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ sortBy: e.target.value as SortOption })}
            className="text-xs font-medium text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors shadow-2xs cursor-pointer"
          >
            <option value="score_desc">Score: High to Low</option>
            <option value="score_asc">Score: Low to High</option>
            <option value="sentiment_desc">Sentiment Score: High to Low</option>
            <option value="sentiment_asc">Sentiment Score: Low to High</option>
            <option value="comments_desc">Comments: Most to Least</option>
          </select>
        </div>
      </div>

      {/* Filter Status summary bar */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span>
              Showing <strong className="text-slate-900 dark:text-slate-100">{totalFiltered}</strong> matching out of{' '}
              <strong className="text-slate-900 dark:text-slate-100">{totalOriginal}</strong> total posts
            </span>
          </div>
          <button
            id="reset-filters-btn"
            type="button"
            onClick={onResetFilters}
            className="text-xs font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 hover:underline inline-flex items-center gap-1 cursor-pointer transition-colors"
          >
            <X className="w-3 h-3" /> Reset filters
          </button>
        </div>
      )}
    </div>
  );
};
