import { supabase } from './supabaseClient';
import { SocialTrendPost, HashtagStat, RegionalBuzz } from '../types';

export class SupabaseService {
  /**
   * Check connection status to Supabase
   */
  static async checkConnection(): Promise<{ connected: boolean; latencyMs: number; error?: string }> {
    const start = performance.now();
    try {
      const { data, error } = await supabase
        .from('trend_posts')
        .select('id')
        .limit(1);

      const latencyMs = Math.round(performance.now() - start);
      if (error) {
        return { connected: false, latencyMs, error: error.message };
      }
      return { connected: true, latencyMs };
    } catch (err: any) {
      return { connected: false, latencyMs: 0, error: err.message };
    }
  }

  /**
   * Fetch all trend posts from Supabase
   */
  static async getTrendPosts(): Promise<SocialTrendPost[]> {
    try {
      const { data, error } = await supabase
        .from('trend_posts')
        .select('*')
        .order('views', { ascending: false });

      if (error) {
        console.error('Error fetching trend_posts from Supabase:', error);
        return [];
      }

      return (data || []).map((row) => ({
        id: row.id,
        platform: row.platform as 'tiktok' | 'instagram',
        author: row.author,
        authorHandle: row.author_handle || '',
        authorAvatar: row.author_avatar,
        caption: row.caption,
        hashtags: row.hashtags || [],
        views: Number(row.views || 0),
        likes: Number(row.likes || 0),
        comments: Number(row.comments || 0),
        shares: Number(row.shares || 0),
        timestamp: row.timestamp || 'Baru saja',
        postUrl: row.post_url || '',
        thumbnailUrl: row.thumbnail_url || 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=600',
        goldCategory: row.gold_category as any,
        sentiment: row.sentiment as any,
        estimatedReach: Number(row.estimated_reach || 0),
      }));
    } catch (err) {
      console.error('Failed to get trend posts from Supabase:', err);
      return [];
    }
  }

  /**
   * Upsert scraped trend posts into Supabase
   */
  static async upsertTrendPosts(posts: SocialTrendPost[]): Promise<boolean> {
    try {
      const rows = posts.map((post) => ({
        id: post.id,
        platform: post.platform,
        author: post.author,
        author_handle: post.authorHandle,
        author_avatar: post.authorAvatar,
        caption: post.caption,
        hashtags: post.hashtags,
        views: post.views,
        likes: post.likes,
        comments: post.comments,
        shares: post.shares,
        timestamp: post.timestamp,
        post_url: post.postUrl,
        thumbnail_url: post.thumbnailUrl,
        gold_category: post.goldCategory,
        sentiment: post.sentiment,
        estimated_reach: post.estimatedReach,
      }));

      const { error } = await supabase
        .from('trend_posts')
        .upsert(rows, { onConflict: 'id' });

      if (error) {
        console.error('Error upserting trend_posts to Supabase:', error);
        return false;
      }
      return true;
    } catch (err) {
      console.error('Failed to upsert trend posts:', err);
      return false;
    }
  }

  /**
   * Fetch hashtag stats from Supabase
   */
  static async getHashtagStats(): Promise<HashtagStat[]> {
    try {
      const { data, error } = await supabase
        .from('hashtag_stats')
        .select('*')
        .order('mentions', { ascending: false });

      if (error) {
        console.error('Error fetching hashtag_stats from Supabase:', error);
        return [];
      }

      return (data || []).map((row) => ({
        id: row.id,
        tag: row.tag,
        platform: row.platform as any,
        mentions: Number(row.mentions || 0),
        views: row.views,
        growth: row.growth,
        sentimentScore: row.sentiment_score,
        color: row.color,
      }));
    } catch (err) {
      console.error('Failed to get hashtag stats:', err);
      return [];
    }
  }

  /**
   * Fetch regional buzz data from Supabase
   */
  static async getRegionalBuzz(): Promise<RegionalBuzz[]> {
    try {
      const { data, error } = await supabase
        .from('regional_buzz')
        .select('*');

      if (error) {
        console.error('Error fetching regional_buzz from Supabase:', error);
        return [];
      }

      return (data || []).map((row) => ({
        city: row.city,
        province: row.province,
        activeUsers: row.active_users,
        growth: row.growth,
        x: Number(row.coord_x),
        y: Number(row.coord_y),
      }));
    } catch (err) {
      console.error('Failed to get regional buzz:', err);
      return [];
    }
  }

  /**
   * Record Apify scraper execution history
   */
  static async recordScraperRun(
    hashtags: string[],
    itemsCount: number,
    status: 'completed' | 'failed',
    logs: string[]
  ): Promise<void> {
    try {
      await supabase.from('scraper_runs').insert([
        {
          actor_id: 'subimpact/social-trends-hashtag-scraper',
          hashtags,
          items_count: itemsCount,
          status,
          logs,
        },
      ]);
    } catch (err) {
      console.error('Failed to record scraper run:', err);
    }
  }
}
