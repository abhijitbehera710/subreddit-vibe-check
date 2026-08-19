import { RedditPost, FilterState, SentimentType, SortOption, DisplayLimit } from '../types';

/**
 * Searches posts by title case-insensitively
 */
export function searchPosts(posts: RedditPost[], query: string): RedditPost[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return posts;

  return posts.filter((post) => post.title.toLowerCase().includes(trimmed));
}

/**
 * Filters posts by sentiment
 */
export function filterBySentiment(posts: RedditPost[], sentiment: 'All' | SentimentType): RedditPost[] {
  if (sentiment === 'All') return posts;
  return posts.filter((post) => post.sentiment === sentiment);
}

/**
 * Sorts posts by selected sort option
 */
export function sortPosts(posts: RedditPost[], sortBy: SortOption): RedditPost[] {
  const cloned = [...posts];

  switch (sortBy) {
    case 'score_asc':
      return cloned.sort((a, b) => a.score - b.score);

    case 'sentiment_desc':
      return cloned.sort((a, b) => b.sentimentScore - a.sentimentScore);

    case 'sentiment_asc':
      return cloned.sort((a, b) => a.sentimentScore - b.sentimentScore);

    case 'comments_desc':
      return cloned.sort((a, b) => (b.comments || b.numComments) - (a.comments || a.numComments));

    case 'score_desc':
    default:
      return cloned.sort((a, b) => b.score - a.score);
  }
}

/**
 * Limits posts to visible slice (Top 10, Top 25, All 50)
 */
export function limitPosts(posts: RedditPost[], limit: DisplayLimit): RedditPost[] {
  return posts.slice(0, limit);
}

export interface FilteredPostsResult {
  /**
   * Posts after search, sentiment filter, and sorting (before pagination limit)
   */
  filteredPosts: RedditPost[];
  /**
   * Total count of matching posts
   */
  matchingCount: number;
  /**
   * Final posts to render on the table/cards according to display limit
   */
  displayedPosts: RedditPost[];
}

/**
 * Applies the complete processing pipeline: Search -> Filter -> Sort -> Limit
 */
export function applyPostPipeline(posts: RedditPost[], filters: FilterState): FilteredPostsResult {
  // 1. Search
  let results = searchPosts(posts, filters.searchQuery);

  // 2. Sentiment Filter
  results = filterBySentiment(results, filters.sentiment);

  // 3. Sorting
  results = sortPosts(results, filters.sortBy);

  const matchingCount = results.length;

  // 4. Display limit
  const displayedPosts = limitPosts(results, filters.displayLimit);

  return {
    filteredPosts: results,
    matchingCount,
    displayedPosts,
  };
}
