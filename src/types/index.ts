export interface SocialTrendPost {
  id: string;
  platform: 'tiktok' | 'instagram';
  author: string;
  authorHandle: string;
  authorAvatar?: string;
  caption: string;
  hashtags: string[];
  views: number;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  videoUrl?: string;
  postUrl: string;
  thumbnailUrl: string;
  goldCategory: 'antam' | 'perhiasan' | 'tabungan_emas' | 'toko_emas' | 'buyback' | 'edukasi';
  sentiment: 'bullish_buy' | 'bearish_sell' | 'neutral';
  estimatedReach: number;
}

export interface MetricCardData {
  title: string;
  value: string;
  percentage?: string;
  subtitle: string;
}

export interface HashtagStat {
  id: string;
  tag: string;
  platform: 'tiktok' | 'instagram' | 'both';
  mentions: number;
  views: string;
  growth: string;
  sentimentScore: number; // 0 - 100
  color: string;
}

export interface RegionalBuzz {
  city: string;
  province: string;
  activeUsers: string;
  growth: string;
  x: number; // percentage on map
  y: number; // percentage on map
}

export interface ScraperInput {
  hashtags: string[];
  maxItems?: number;
  platforms?: ('tiktok' | 'instagram')[];
  token?: string;
}

export interface ScraperRunStatus {
  status: 'idle' | 'running' | 'succeeded' | 'failed';
  runId?: string;
  progress?: string;
  itemsCount?: number;
  error?: string;
}
