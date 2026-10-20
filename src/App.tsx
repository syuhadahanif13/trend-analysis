import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ExecutiveDashboardView } from './components/views/ExecutiveDashboardView';
import { SocialListeningView } from './components/views/SocialListeningView';
import { TrendSentimentView } from './components/views/TrendSentimentView';
import { GoldMarketView } from './components/views/GoldMarketView';
import { CompetitorView } from './components/views/CompetitorView';
import { StrategicInsightsView } from './components/views/StrategicInsightsView';
import { AlertsReportsView } from './components/views/AlertsReportsView';
import { DataSettingsView } from './components/views/DataSettingsView';
import { ApifyScraperModal } from './components/ApifyScraperModal';
import { ViralFeedModal } from './components/ViralFeedModal';
import { MarketInsightsModal } from './components/MarketInsightsModal';
import { LoginPage } from './components/LoginPage';
import { AuthService, AuthUser } from './services/authService';
import { SupabaseService } from './services/supabaseService';
import { MarketInsightsService, MarketInsightsResult } from './services/marketInsightsService';
import { SocialTrendPost, HashtagStat } from './types';

export const App: React.FC = () => {
  // 1. Authentication State
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(AuthService.getSession());

  // 2. Navigation State matching the 8 requested menus
  const [activeTab, setActiveTab] = useState<string>('executive');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isScraperOpen, setIsScraperOpen] = useState<boolean>(false);
  const [isFeedOpen, setIsFeedOpen] = useState<boolean>(false);
  const [isInsightsOpen, setIsInsightsOpen] = useState<boolean>(false);
  const [isRefreshingInsights, setIsRefreshingInsights] = useState<boolean>(false);

  // 3. Live Production Data from Supabase
  const [posts, setPosts] = useState<SocialTrendPost[]>([]);
  const [hashtags, setHashtags] = useState<HashtagStat[]>([]);
  const [supabaseConnected, setSupabaseConnected] = useState<boolean>(true);
  const [latencyMs, setLatencyMs] = useState<number>(45);

  // 4. Strategic Market Insights State
  const [marketAnalysis, setMarketAnalysis] = useState<MarketInsightsResult>(() => 
    MarketInsightsService.analyzeTrends([])
  );

  // Load Real Data from Supabase
  const loadSupabaseData = async () => {
    const conn = await SupabaseService.checkConnection();
    setSupabaseConnected(conn.connected);
    if (conn.latencyMs > 0) setLatencyMs(conn.latencyMs);

    const [dbPosts, dbHashtags] = await Promise.all([
      SupabaseService.getTrendPosts(),
      SupabaseService.getHashtagStats()
    ]);

    if (dbPosts && dbPosts.length > 0) {
      setPosts(dbPosts);
      setMarketAnalysis(MarketInsightsService.analyzeTrends(dbPosts));
    }
    if (dbHashtags && dbHashtags.length > 0) {
      setHashtags(dbHashtags);
    }
  };

  useEffect(() => {
    if (currentUser) {
      loadSupabaseData();
    }
  }, [currentUser]);

  // Handle Logout
  const handleLogout = () => {
    AuthService.logout();
    setCurrentUser(null);
  };

  // If not logged in, render LoginPage
  if (!currentUser) {
    return <LoginPage onLoginSuccess={(user) => setCurrentUser(user)} />;
  }

  // Filter posts based on global search
  const filteredPosts = posts.filter(p => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.caption.toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q) ||
      p.hashtags.some(h => h.toLowerCase().includes(q))
    );
  });

  const handleScrapeSuccess = async () => {
    await loadSupabaseData();
    setIsScraperOpen(false);
    setIsFeedOpen(true);
  };

  const handleRefreshInsights = () => {
    setIsRefreshingInsights(true);
    setTimeout(() => {
      setMarketAnalysis(MarketInsightsService.analyzeTrends(posts));
      setIsRefreshingInsights(false);
    }, 450);
  };

  const handleExportCSV = () => {
    const csvData = posts.map(p => `"${p.author}","${p.platform}","${p.views}","${p.likes}","${p.goldCategory}","${p.sentiment}","${p.postUrl}"`).join('\n');
    const blob = new Blob([`Author,Platform,Views,Likes,Category,Sentiment,URL\n${csvData}`], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gold_trends_data_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-[#EEF2F6] flex">
      {/* 1. Left Sidebar Navigation with Numbered Menus */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* 2. Main Content Container */}
      <main className="flex-1 p-6 md:p-8 max-w-[1400px] mx-auto overflow-x-hidden">
        {/* Top Header */}
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          openScraperModal={() => setIsScraperOpen(true)}
          openInsightsModal={() => setIsInsightsOpen(true)}
          supabaseConnected={supabaseConnected}
          latencyMs={latencyMs}
        />

        {/* Dynamic View Rendering based on Numbered Menu Selection */}
        {activeTab === 'executive' && (
          <ExecutiveDashboardView
            posts={filteredPosts}
            hashtags={hashtags}
            onOpenFeed={() => setIsFeedOpen(true)}
            onOpenInsights={() => setIsInsightsOpen(true)}
            onExport={handleExportCSV}
          />
        )}

        {activeTab === 'listening' && (
          <SocialListeningView
            posts={filteredPosts}
            hashtags={hashtags}
            onTriggerScraper={() => setIsScraperOpen(true)}
          />
        )}

        {activeTab === 'sentiment' && (
          <TrendSentimentView
            posts={filteredPosts}
          />
        )}

        {activeTab === 'market' && (
          <GoldMarketView />
        )}

        {activeTab === 'competitor' && (
          <CompetitorView />
        )}

        {activeTab === 'insights' && (
          <StrategicInsightsView
            analysis={marketAnalysis}
            posts={filteredPosts}
            onRefresh={handleRefreshInsights}
            isRefreshing={isRefreshingInsights}
          />
        )}

        {activeTab === 'alerts' && (
          <AlertsReportsView
            posts={filteredPosts}
            onExportCSV={handleExportCSV}
          />
        )}

        {activeTab === 'settings' && (
          <DataSettingsView
            onTriggerScraper={() => setIsScraperOpen(true)}
            latencyMs={latencyMs}
          />
        )}
      </main>

      {/* Modals */}
      <ApifyScraperModal
        isOpen={isScraperOpen}
        onClose={() => setIsScraperOpen(false)}
        onScrapeSuccess={handleScrapeSuccess}
      />

      <ViralFeedModal
        isOpen={isFeedOpen}
        onClose={() => setIsFeedOpen(false)}
        posts={filteredPosts}
      />

      <MarketInsightsModal
        isOpen={isInsightsOpen}
        onClose={() => setIsInsightsOpen(false)}
        analysis={marketAnalysis}
        onRefresh={handleRefreshInsights}
        isRefreshing={isRefreshingInsights}
      />
    </div>
  );
};

export default App;
