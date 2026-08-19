export type SentimentType = 'Positive' | 'Neutral' | 'Negative';

export interface RedditPost {
  id: string;
  title: string;
  author: string;
  score: number;
  comments?: number;
  numComments: number;
  createdAt?: string;
  createdUtc: string;
  category?: string;
  flair?: string;
  sentiment: SentimentType;
  sentimentScore: number;
  url?: string;
  permalink: string;
  sentimentExplanation?: string;
}

export interface SubredditAnalysis {
  subreddit: string;
  postsAnalyzed: number;
  positiveCount: number;
  positivePercentage: number;
  neutralCount: number;
  neutralPercentage: number;
  negativeCount: number;
  negativePercentage: number;
  overallVibe: string;
  overallDescription: string;
  avgScore: number;
  totalComments: number;
  posts: RedditPost[];
}

export type DisplayLimit = 10 | 25 | 50;

export type SortOption =
  | 'score_desc'
  | 'score_asc'
  | 'sentiment_desc'
  | 'sentiment_asc'
  | 'comments_desc';

export interface FilterState {
  searchQuery: string;
  sentiment: 'All' | SentimentType;
  sortBy: SortOption;
  displayLimit: DisplayLimit;
}
