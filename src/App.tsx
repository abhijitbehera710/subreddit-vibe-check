import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { PinScreen } from './components/PinScreen';
import { SearchSection } from './components/SearchSection';
import { SummaryCards } from './components/SummaryCards';
import { VibeOverview } from './components/VibeOverview';
import { SentimentOverview } from './components/SentimentOverview';
import { PostFilters } from './components/PostFilters';
import { PostTable } from './components/PostTable';
import { PostModal } from './components/PostModal';
import { InfoModal, InfoModalType } from './components/InfoModals';
import { HistoryModal, HistoryItem } from './components/HistoryModal';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import { EmptyState } from './components/EmptyState';
import { Footer } from './components/Footer';
import { SubredditAnalysis, RedditPost, FilterState, DisplayLimit } from './types';
import { calculateSubredditAnalysis, technologyMockPosts, fetchSubredditAnalysis } from './data/mockPosts';
import { applyPostPipeline } from './utils/postFilters';
import { checkIsAuthenticated, lockSession } from './utils/auth';
import { supabase } from './lib/supabase';

const HISTORY_STORAGE_KEY = 'subreddit_vibe_check_history';

export default function App() {
  
  useEffect(() => {
    async function testSupabase() {
      const { data, error } = await supabase
        .from('analyses')
        .select('*')
        .limit(1);

      console.log('Supabase data:', data);
      console.log('Supabase error:', error);
    }

    testSupabase();
  }, []);

  // Single-user authentication state via 4-digit PIN
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => checkIsAuthenticated());

  const [subreddit, setSubreddit] = useState<string>('technology');
  const [analysis, setAnalysis] = useState<SubredditAnalysis>(() =>
    calculateSubredditAnalysis('technology', technologyMockPosts)
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Analysis history list
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        subreddit: 'technology',
        analyzedAt: 'Initial load',
        positivePercentage: 62,
        neutralPercentage: 24,
        negativePercentage: 14,
        overallVibe: 'Mostly Positive',
      },
    ];
  });

  // Modal inspection & views
  const [selectedPost, setSelectedPost] = useState<RedditPost | null>(null);
  const [infoModal, setInfoModal] = useState<InfoModalType>(null);
  const [historyModalOpen, setHistoryModalOpen] = useState<boolean>(false);

  // Post filters, sorting, and display limits
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    sentiment: 'All',
    sortBy: 'score_desc',
    displayLimit: 10,
  });

  // Save history to localStorage
  const addHistoryItem = (newAnalysis: SubredditAnalysis) => {
    setHistory((prev) => {
      const filtered = prev.filter((item) => item.subreddit.toLowerCase() !== newAnalysis.subreddit.toLowerCase());
      const updated: HistoryItem[] = [
        {
          subreddit: newAnalysis.subreddit,
          analyzedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          positivePercentage: newAnalysis.positivePercentage,
          neutralPercentage: newAnalysis.neutralPercentage,
          negativePercentage: newAnalysis.negativePercentage,
          overallVibe: newAnalysis.overallVibe,
        },
        ...filtered,
      ].slice(0, 15);

      try {
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(HISTORY_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  // Handle analysis request for custom or preset subreddits
  const handleAnalyze = useCallback(async (targetSubreddit: string) => {
    const clean = targetSubreddit.trim().toLowerCase().replace(/^r\//, '');
    if (!clean) return;

    setSubreddit(clean);
    setIsLoading(true);
    setError(null);
    setFilters((prev) => ({
      ...prev,
      searchQuery: '',
      sentiment: 'All',
      sortBy: 'score_desc',
    }));

    try {
      const result = await fetchSubredditAnalysis(clean);
      setAnalysis(result);
      addHistoryItem(result);
    } catch (err: any) {
      setError(err?.message || 'Unable to fetch subreddit data. Please check the subreddit name and try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleDisplayLimitChange = (limit: DisplayLimit) => {
    setFilters((prev) => ({ ...prev, displayLimit: limit }));
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      sentiment: 'All',
      sortBy: 'score_desc',
      displayLimit: 10,
    });
  };

  const handleResetToDefault = () => {
    if (subreddit !== 'technology') {
      handleAnalyze('technology');
    } else {
      handleResetFilters();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLockDashboard = () => {
    lockSession();
    setIsAuthenticated(false);
  };

  // Pipeline processing: Search -> Filter -> Sort -> Limit
  const pipelineResult = useMemo(() => {
    if (!analysis || !analysis.posts) {
      return {
        filteredPosts: [],
        matchingCount: 0,
        displayedPosts: [],
      };
    }

    return applyPostPipeline(analysis.posts, filters);
  }, [analysis, filters]);

  // If not authenticated, display the 4-digit PIN screen
  if (!isAuthenticated) {
    return <PinScreen onSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-orange-100 selection:text-orange-900 dark:selection:bg-orange-900/40 dark:selection:text-orange-100 transition-colors duration-200 overflow-x-hidden">
      {/* Top Navigation Bar */}
      <Header
        onReset={handleResetToDefault}
        onOpenModal={(type) => setInfoModal(type)}
        onOpenHistory={() => setHistoryModalOpen(true)}
        onLockSession={handleLockDashboard}
      />

      {/* Hero & Search Bar */}
      <SearchSection
        currentSubreddit={subreddit}
        onAnalyze={handleAnalyze}
        isLoading={isLoading}
      />

      {/* Main Dashboard Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {isLoading ? (
          <LoadingState subreddit={subreddit} />
        ) : error ? (
          <ErrorState
            errorMessage={error}
            subreddit={subreddit}
            onRetry={() => handleAnalyze(subreddit)}
            onResetToDefault={handleResetToDefault}
          />
        ) : analysis.postsAnalyzed === 0 ? (
          <EmptyState onTryAnother={handleResetToDefault} />
        ) : (
          <>
            {/* 1. Summary Cards (Data-driven counts & percentages) */}
            <SummaryCards analysis={analysis} />

            {/* 2. Overall Vibe & Sentiment Visualizer Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-6 flex">
                <VibeOverview analysis={analysis} />
              </div>
              <div className="lg:col-span-6 flex">
                <SentimentOverview analysis={analysis} />
              </div>
            </div>

            {/* 3. Top 50 Hot Posts Section */}
            <div
              id="top-posts-section"
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden transition-colors duration-200"
            >
              <PostTable
                posts={pipelineResult.displayedPosts}
                subreddit={analysis.subreddit}
                totalPostsInSubreddit={analysis.postsAnalyzed}
                matchingCount={pipelineResult.matchingCount}
                displayLimit={filters.displayLimit}
                onDisplayLimitChange={handleDisplayLimitChange}
                onSelectPost={(post) => setSelectedPost(post)}
              >
                {/* Search, Sentiment Filters & Sorting Controls */}
                <PostFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onResetFilters={handleResetFilters}
                  totalFiltered={pipelineResult.matchingCount}
                  totalOriginal={analysis.postsAnalyzed}
                />

                {/* Empty state when filters result in 0 matches */}
                {pipelineResult.matchingCount === 0 && (
                  <EmptyState
                    onTryAnother={handleResetFilters}
                    isFiltered={true}
                  />
                )}
              </PostTable>
            </div>
          </>
        )}
      </main>

      {/* Post Details Modal */}
      <PostModal
        post={selectedPost}
        subreddit={subreddit}
        onClose={() => setSelectedPost(null)}
      />

      {/* Analysis History Modal */}
      <HistoryModal
        isOpen={historyModalOpen}
        onClose={() => setHistoryModalOpen(false)}
        history={history}
        onSelectSubreddit={(sub) => handleAnalyze(sub)}
        onClearHistory={handleClearHistory}
      />

      {/* Corporate Info Modals (How it works, About, Features, Changelog, etc.) */}
      <InfoModal
        type={infoModal}
        onClose={() => setInfoModal(null)}
      />

      {/* Footer */}
      <Footer
        onOpenModal={(type) => setInfoModal(type)}
        onResetToDashboard={handleResetToDefault}
      />
    </div>
  );
}
