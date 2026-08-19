import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Loader2, X } from 'lucide-react';

interface SearchSectionProps {
  currentSubreddit: string;
  onAnalyze: (subreddit: string) => void;
  isLoading: boolean;
}

const PRESET_SUBREDDITS = ['technology', 'programming', 'gaming', 'science', 'reactjs'];

export const SearchSection: React.FC<SearchSectionProps> = ({
  currentSubreddit,
  onAnalyze,
  isLoading
}) => {
  const [inputValue, setInputValue] = useState(currentSubreddit);

  useEffect(() => {
    setInputValue(currentSubreddit);
  }, [currentSubreddit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onAnalyze(inputValue.trim());
    }
  };

  const handleSelectPreset = (preset: string) => {
    setInputValue(preset);
    onAnalyze(preset);
  };

  return (
    <section
      id="hero-search-section"
      className="w-full py-8 sm:py-10 md:py-12 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>Community Sentiment Intelligence</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Analyze a Subreddit
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Discover the overall mood and sentiment of a Reddit community.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="pt-2 text-left">
            <div className="space-y-1.5">
              <label
                htmlFor="subreddit-input"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
              >
                Subreddit
              </label>

              <div className="relative flex flex-col sm:flex-row items-stretch gap-2.5 sm:gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500 font-mono font-medium text-sm">
                    r/
                  </div>
                  <input
                    id="subreddit-input"
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter subreddit name…"
                    disabled={isLoading}
                    className="w-full pl-9 pr-14 py-3 text-sm sm:text-base font-medium text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100/70 dark:hover:bg-slate-950 focus:bg-white dark:focus:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all shadow-2xs placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  />
                  {inputValue && !isLoading && (
                    <button
                      type="button"
                      onClick={() => setInputValue('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-medium cursor-pointer"
                      title="Clear search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <button
                  id="analyze-subreddit-btn"
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-orange-600 dark:hover:bg-orange-500 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white font-bold text-sm rounded-xl shadow-xs transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 shrink-0 cursor-pointer disabled:cursor-not-allowed hover:shadow-md active:scale-98"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <span>Analyze Subreddit</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Suggestions and Hint */}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Popular:</span>
              {PRESET_SUBREDDITS.map((sub) => (
                <button
                  key={sub}
                  type="button"
                  id={`preset-${sub}-btn`}
                  onClick={() => handleSelectPreset(sub)}
                  disabled={isLoading}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                    currentSubreddit.toLowerCase() === sub && !isLoading
                      ? 'bg-orange-50 dark:bg-orange-950/50 border-orange-300 dark:border-orange-900/60 text-orange-700 dark:text-orange-400 font-bold shadow-2xs'
                      : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  r/{sub}
                </button>
              ))}

              <span className="hidden sm:inline-block text-slate-400 dark:text-slate-500 ml-auto">
                Press <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[10px]">Enter ↵</kbd> to analyze
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
