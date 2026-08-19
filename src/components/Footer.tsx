import React, { useState } from 'react';
import { Activity, Github, Linkedin, Twitter, Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { InfoModalType } from './InfoModals';

interface FooterProps {
  onOpenModal?: (type: InfoModalType) => void;
  onResetToDashboard?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenModal, onResetToDashboard }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmed || !emailRegex.test(trimmed)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    setEmailError('');
    setIsSubscribed(true);
  };

  return (
    <footer
      id="app-footer"
      className="w-full bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/80 transition-colors duration-200 mt-20 pt-16 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 1. TOP MAIN ROW: Brand Block on Left/Middle + 3 Compact Columns on Right */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10 lg:gap-16">
          {/* Brand Block */}
          <div className="max-w-md space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-xs shrink-0">
                <Activity className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-slate-900 dark:text-slate-100 tracking-tight">
                The Subreddit Vibe Check
              </span>
            </div>

            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Understand the mood of any subreddit.
            </p>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Modern analytics for Reddit communities. Real-time sentiment breakdown, polarity distribution, and engagement intelligence.
            </p>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-2.5">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-all hover:scale-105"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-all hover:scale-105"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-all hover:scale-105"
              >
                <Twitter className="w-4 h-4" />
              </a>

              <a
                href="mailto:contact@subredditvibecheck.com"
                aria-label="Email"
                className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-all hover:scale-105"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 3 Compact Columns Aligned in a Single Row Beside Brand */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 md:gap-16 shrink-0">
            {/* COLUMN 1 — PRODUCT */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                Product
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenModal?.('features')}
                    className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenModal?.('how-it-works')}
                    className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                  >
                    How It Works
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onResetToDashboard}
                    className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Dashboard
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenModal?.('changelog')}
                    className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Changelog
                  </button>
                </li>
              </ul>
            </div>

            {/* COLUMN 2 — RESOURCES */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                Resources
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenModal?.('how-it-works')}
                    className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Documentation
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenModal?.('features')}
                    className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                  >
                    API Reference
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenModal?.('about')}
                    className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Help Center
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenModal?.('about')}
                    className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Community
                  </button>
                </li>
              </ul>
            </div>

            {/* COLUMN 3 — COMPANY */}
            <div className="space-y-3.5 col-span-2 sm:col-span-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                Company
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenModal?.('about')}
                    className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenModal?.('about')}
                    className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Careers
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenModal?.('privacy')}
                    className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenModal?.('terms')}
                    className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Terms of Service
                  </button>
                </li>
                <li>
                  <a
                    href="mailto:contact@subredditvibecheck.com"
                    className="hover:text-slate-900 dark:hover:text-white transition-colors block text-left"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 2. CENTERED NEWSLETTER SECTION BENEATH MAIN ROW */}
        <div className="border-t border-slate-200/80 dark:border-slate-800/80 pt-10">
          <div className="max-w-xl mx-auto text-center space-y-4">
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                Stay in the loop
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                Get product updates and insights about Reddit community analytics.
              </p>
            </div>

            {isSubscribed ? (
              <div className="inline-flex items-center gap-2 p-3 px-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold animate-in fade-in duration-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>You're subscribed!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="max-w-md mx-auto space-y-2">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      id="newsletter-email-input"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError('');
                      }}
                      placeholder="Enter your email address"
                      className="w-full px-3.5 py-2.5 text-xs font-medium text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors shadow-2xs placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    />
                  </div>
                  <button
                    id="newsletter-subscribe-btn"
                    type="submit"
                    className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-orange-600 dark:hover:bg-orange-500 text-white text-xs font-semibold rounded-xl transition-all shadow-xs cursor-pointer shrink-0"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                {emailError && (
                  <p className="text-[11px] text-rose-500 font-medium text-left">{emailError}</p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* 3. BOTTOM BAR: Centered Copyright */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80 text-center">
          <p
            id="footer-copyright-text"
            className="text-xs text-slate-500 dark:text-slate-500 font-medium"
          >
            © 2026 Subreddit Vibe Check Pvt. Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
