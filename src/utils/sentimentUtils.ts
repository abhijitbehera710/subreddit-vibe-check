import { RedditPost, SentimentType, SubredditAnalysis } from '../types';

export interface SentimentCounts {
  positive: number;
  neutral: number;
  negative: number;
  total: number;
}

export interface SentimentPercentages {
  positive: number;
  neutral: number;
  negative: number;
}

export interface OverallVibeResult {
  vibe: string;
  description: string;
}

/**
 * Counts posts by sentiment dynamically from any RedditPost array
 */
export function countSentiments(posts: RedditPost[]): SentimentCounts {
  const counts: SentimentCounts = {
    positive: 0,
    neutral: 0,
    negative: 0,
    total: posts.length,
  };

  for (const post of posts) {
    if (post.sentiment === 'Positive') {
      counts.positive += 1;
    } else if (post.sentiment === 'Neutral') {
      counts.neutral += 1;
    } else if (post.sentiment === 'Negative') {
      counts.negative += 1;
    }
  }

  return counts;
}

/**
 * Calculates percentage distribution (rounded integers, safe from zero division)
 */
export function calculatePercentages(counts: SentimentCounts): SentimentPercentages {
  const total = counts.total;
  if (total === 0) {
    return { positive: 0, neutral: 0, negative: 0 };
  }

  return {
    positive: Math.round((counts.positive / total) * 100),
    neutral: Math.round((counts.neutral / total) * 100),
    negative: Math.round((counts.negative / total) * 100),
  };
}

/**
 * Calculates the overall community vibe dynamically from sentiment counts
 */
export function calculateOverallVibe(counts: SentimentCounts): OverallVibeResult {
  const { positive, neutral, negative, total } = counts;

  if (total === 0) {
    return {
      vibe: 'No Data',
      description: 'No posts available to calculate sentiment vibe.',
    };
  }

  // Determine dominant sentiment
  if (positive > neutral && positive > negative) {
    return {
      vibe: 'Mostly Positive',
      description: 'The community is showing a generally positive mood across the analyzed posts.',
    };
  }

  if (negative > positive && negative > neutral) {
    return {
      vibe: 'Mostly Negative',
      description: 'The community is showing a more negative mood across the analyzed posts.',
    };
  }

  // Neutral dominant or tie
  return {
    vibe: 'Mostly Neutral',
    description: 'The community is showing a balanced mix of positive, neutral, and negative discussions.',
  };
}

/**
 * Full dynamic analysis derivation from post dataset
 */
export function deriveSubredditAnalysis(subreddit: string, posts: RedditPost[]): SubredditAnalysis {
  const counts = countSentiments(posts);
  const percentages = calculatePercentages(counts);
  const { vibe, description } = calculateOverallVibe(counts);

  const totalScore = posts.reduce((sum, p) => sum + (p.score || 0), 0);
  const totalComments = posts.reduce((sum, p) => sum + (p.comments || p.numComments || 0), 0);
  const avgScore = posts.length > 0 ? Math.round(totalScore / posts.length) : 0;

  return {
    subreddit,
    postsAnalyzed: posts.length,
    positiveCount: counts.positive,
    positivePercentage: percentages.positive,
    neutralCount: counts.neutral,
    neutralPercentage: percentages.neutral,
    negativeCount: counts.negative,
    negativePercentage: percentages.negative,
    overallVibe: vibe,
    overallDescription: description,
    avgScore,
    totalComments,
    posts,
  };
}
