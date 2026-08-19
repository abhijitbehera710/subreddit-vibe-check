import React, { useState } from 'react';
import { Activity, Sparkles, Sun, Moon, History, LayoutDashboard, Menu, X, Lock, BookOpen, Info, Layers } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { InfoModalType } from './InfoModals';

interface HeaderProps {
  onReset?: () => void;
  onOpenModal?: (type: InfoModalType) => void;
  onOpenHistory?: () => void;
  onLockSession?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onReset,
  onOpenModal,
  onOpenHistory,
  onLockSession,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header
      id="app-header"
      className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand Logo & Title */}
          <div
            id="brand-header"
            onClick={onReset}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onReset?.()}
            aria-label="The Subreddit Vibe Check - Home"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform duration-200 shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-slate-100 tracking-tight">
                  The Subreddit Vibe Check
                </span>
                <span className="hidden xl:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-orange-50 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 border border-orange-200/60 dark:border-orange-900/40">
                  <Sparkles className="w-3 h-3 text-orange-500" />
                  Reddit Analytics
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                Understand the mood of any subreddit.
              </p>
            </div>
          </div>

          {/* Desktop Navigation (Right) */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            {/* Primary navigation links */}
            <nav className="flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <button
                id="nav-dashboard-btn"
                type="button"
                onClick={onReset}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </button>

              <button
                id="nav-history-btn"
                type="button"
                onClick={onOpenHistory}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <History className="w-3.5 h-3.5" />
                <span>History</span>
              </button>

              <button
                id="nav-how-it-works-btn"
                type="button"
                onClick={() => onOpenModal?.('how-it-works')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>How It Works</span>
              </button>

              <button
                id="nav-about-btn"
                type="button"
                onClick={() => onOpenModal?.('about')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <Info className="w-3.5 h-3.5" />
                <span>About</span>
              </button>
            </nav>

            <div className="w-px h-5 bg-slate-200 dark:bg-slate-800 mx-1" />

            {/* Theme Toggle Button ☀️ / 🌙 */}
            <button
              id="theme-toggle-btn"
              type="button"
              onClick={toggleTheme}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-2xs"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden lg:inline text-xs">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-600" />
                  <span className="hidden lg:inline text-xs">Dark</span>
                </>
              )}
            </button>

            {/* Lock / Sign Out Button */}
            {onLockSession && (
              <button
                id="lock-session-btn"
                type="button"
                onClick={onLockSession}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors cursor-pointer"
                title="Lock Dashboard (Return to PIN screen)"
                aria-label="Lock Dashboard"
              >
                <Lock className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">Lock</span>
              </button>
            )}
          </div>

          {/* Mobile Right Controls: Theme Toggle + Hamburger Menu */}
          <div className="flex md:hidden items-center gap-1.5">
            {/* Theme Toggle Button Mobile */}
            <button
              id="mobile-theme-toggle-btn"
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Hamburger button */}
            <button
              id="mobile-menu-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top-2 duration-150"
        >
          <div className="space-y-1 text-sm font-semibold">
            <button
              type="button"
              onClick={() => {
                onReset?.();
                closeMobileMenu();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
            >
              <LayoutDashboard className="w-4 h-4 text-orange-500" />
              <span>Dashboard</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onOpenHistory?.();
                closeMobileMenu();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
            >
              <History className="w-4 h-4 text-orange-500" />
              <span>Analysis History</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onOpenModal?.('how-it-works');
                closeMobileMenu();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
            >
              <BookOpen className="w-4 h-4 text-orange-500" />
              <span>How It Works</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onOpenModal?.('features');
                closeMobileMenu();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
            >
              <Layers className="w-4 h-4 text-orange-500" />
              <span>Features</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onOpenModal?.('about');
                closeMobileMenu();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
            >
              <Info className="w-4 h-4 text-orange-500" />
              <span>About Us</span>
            </button>

            {onLockSession && (
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    onLockSession();
                    closeMobileMenu();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors text-left"
                >
                  <Lock className="w-4 h-4" />
                  <span>Lock Dashboard</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
