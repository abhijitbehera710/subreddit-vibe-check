// src/services/supabaseService.ts
import { supabase } from '../lib/supabase';
import { SubredditAnalysis, RedditPost } from '../types';

// ---------- Helper: map DB row to frontend SubredditAnalysis ----------
function mapDbToAnalysis(dbRow: any, posts: any[]): SubredditAnalysis {
  return {
    subreddit: dbRow.subreddit,
    postsAnalyzed: dbRow.posts_analyzed || posts.length,
    positiveCount: dbRow.positive_count,
    positivePercentage: dbRow.positive_percentage,
    neutralCount: dbRow.neutral_count,
    neutralPercentage: dbRow.neutral_percentage,
    negativeCount: dbRow.negative_count,
    negativePercentage: dbRow.negative_percentage,
    overallVibe: dbRow.overall_vibe,
    overallDescription: dbRow.overall_description || getDefaultDescription(dbRow.overall_vibe),
    avgScore: dbRow.avg_score || 0,
    totalComments: dbRow.total_comments || 0,
    posts: posts.map((p) => ({
      id: p.analysis_id?.toString() || p.id?.toString() || '',
      title: p.title,
      author: p.author,
      score: p.score,
      numComments: p.comments,
      sentiment: p.sentiment,
      sentimentScore: p.sentiment_score,
      createdUtc: p.created_at,
      permalink: p.reddit_url,
      flair: p.flair || '',
      sentimentExplanation: p.sentiment_explanation || '',
    })),
  };
}

function getDefaultDescription(vibe: string): string {
  if (vibe.includes('Positive')) return 'The community is showing a generally positive mood across the analyzed posts.';
  if (vibe.includes('Negative')) return 'The community is showing a more negative mood across the analyzed posts.';
  return 'The community is showing a balanced mix of positive, neutral, and negative discussions.';
}

// ---------- Fetch an existing analysis (with its posts) ----------
export async function fetchAnalysisFromSupabase(subreddit: string): Promise<SubredditAnalysis | null> {
  // 1. Get the latest analysis for this subreddit
  const { data: analysisData, error: analysisError } = await supabase
    .from('analyses') // ✅ your table name
    .select('*')
    .eq('subreddit', subreddit)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (analysisError) {
    console.error('Error fetching analysis:', analysisError);
    return null;
  }
  if (!analysisData) return null;

  // 2. Get all posts belonging to that analysis
  const { data: postsData, error: postsError } = await supabase
    .from('analysis_posts') // ✅ your table name
    .select('*')
    .eq('analysis_id', analysisData.id);

  if (postsError) {
    console.error('Error fetching posts:', postsError);
    return null;
  }

  return mapDbToAnalysis(analysisData, postsData || []);
}

// ---------- Save a new analysis (with its posts) ----------
export async function saveAnalysisToSupabase(analysis: SubredditAnalysis): Promise<void> {
  // 1. Insert into 'analyses'
  const { data: insertedAnalysis, error: insertError } = await supabase
    .from('analyses')
    .insert({
      subreddit: analysis.subreddit,
      posts_analyzed: analysis.postsAnalyzed,
      positive_count: analysis.positiveCount,
      neutral_count: analysis.neutralCount,
      negative_count: analysis.negativeCount,
      positive_percentage: analysis.positivePercentage,
      neutral_percentage: analysis.neutralPercentage,
      negative_percentage: analysis.negativePercentage,
      overall_vibe: analysis.overallVibe,
      created_at: new Date().toISOString(),
      // If you have these columns, add them; otherwise remove:
      // overall_description: analysis.overallDescription,
      // avg_score: analysis.avgScore,
      // total_comments: analysis.totalComments,
    })
    .select()
    .single();

  if (insertError) {
    console.error('Error inserting analysis:', insertError);
    throw insertError;
  }

  // 2. Insert all posts into 'analysis_posts'
  const postsToInsert = analysis.posts.map((post) => ({
    analysis_id: insertedAnalysis.id,
    title: post.title,
    author: post.author,
    score: post.score,
    comments: post.numComments,
    sentiment: post.sentiment,
    sentiment_score: post.sentimentScore,
    reddit_url: post.permalink,
    created_at: post.createdUtc,
    // If you have these columns, add them:
    // flair: post.flair || '',
    // sentiment_explanation: post.sentimentExplanation || '',
  }));

  const { error: postsInsertError } = await supabase
    .from('analysis_posts')
    .insert(postsToInsert);

  if (postsInsertError) {
    console.error('Error inserting posts:', postsInsertError);
    throw postsInsertError;
  }
}

// ---------- Fetch history (last 15 analyses) ----------
export async function getHistoryFromSupabase(): Promise<{ subreddit: string; analyzedAt: string; positivePercentage: number; neutralPercentage: number; negativePercentage: number; overallVibe: string }[]> {
  const { data, error } = await supabase
    .from('analyses')
    .select('subreddit, created_at, positive_percentage, neutral_percentage, negative_percentage, overall_vibe')
    .order('created_at', { ascending: false })
    .limit(15);

  if (error) {
    console.error('Error fetching history:', error);
    return [];
  }

  return data.map((row) => ({
    subreddit: row.subreddit,
    analyzedAt: new Date(row.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    positivePercentage: row.positive_percentage,
    neutralPercentage: row.neutral_percentage,
    negativePercentage: row.negative_percentage,
    overallVibe: row.overall_vibe,
  }));
}