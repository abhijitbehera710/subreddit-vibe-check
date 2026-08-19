import React from 'react';
import { X, Sparkles, Activity, Layers, ShieldCheck, Zap, Compass, CheckCircle2 } from 'lucide-react';

export type InfoModalType = 'how-it-works' | 'about' | 'features' | 'changelog' | 'privacy' | 'terms' | null;

interface InfoModalProps {
  type: InfoModalType;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div
      id="info-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs transition-opacity animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        id="info-modal-container"
        className="bg-white dark:bg-slate-900 rounded-2xl max-w-xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 text-slate-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                {type === 'how-it-works' && 'How Subreddit Vibe Check Works'}
                {type === 'about' && 'About Subreddit Vibe Check Pvt. Ltd.'}
                {type === 'features' && 'Platform Capabilities & Features'}
                {type === 'changelog' && 'Product Changelog & Updates'}
                {type === 'privacy' && 'Privacy Policy'}
                {type === 'terms' && 'Terms of Service'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Reddit Community Analytics & Sentiment Intelligence
              </p>
            </div>
          </div>
          <button
            id="close-info-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {type === 'how-it-works' && (
            <div className="space-y-4">
              <p>
                The Subreddit Vibe Check analyzes community sentiment in three streamlined steps:
              </p>
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 flex gap-3">
                  <div className="w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold text-xs shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs uppercase tracking-wider">
                      Hot Post Ingestion
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      Extracts the top 50 hot ranking submissions from the target subreddit community.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 flex gap-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs uppercase tracking-wider">
                      Sentiment & Polarity Scoring
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      Evaluates tone, keyword intensity, and context across titles on an indexed spectrum (-5 to +5).
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 flex gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs uppercase tracking-wider">
                      Aggregate Vibe Synthesis
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      Calculates the dominant community vibe classification, breakdown ratios, and engagement benchmarks.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {type === 'about' && (
            <div className="space-y-3">
              <p>
                <strong>Subreddit Vibe Check Pvt. Ltd.</strong> builds modern community intelligence and audience mood analytics software for digital teams, market researchers, and tech creators.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800">
                  <div className="text-xl font-bold text-slate-900 dark:text-slate-100">50+</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Posts Evaluated Per Run</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800">
                  <div className="text-xl font-bold text-slate-900 dark:text-slate-100">3-Tier</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Polarity Classification</div>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
                Our mission is to make online discussion dynamics transparent, quantifiable, and easy to interpret in real-time.
              </p>
            </div>
          )}

          {type === 'features' && (
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Dynamic Subreddit Search:</strong> Instantly scan any community with live preset catalogs.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Dominant Vibe Indicator:</strong> Categorizes community mood into Positive, Neutral, or Critical signals.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Multi-dimensional Filters:</strong> Filter and sort by score, comments, or sentiment polarity index.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Adaptive Display Slices:</strong> Switch seamlessly between Top 10, Top 25, and All 50 posts.</span>
              </div>
            </div>
          )}

          {type === 'changelog' && (
            <div className="space-y-3">
              <div className="border-l-2 border-orange-500 pl-3 space-y-1">
                <div className="text-xs font-bold text-orange-600 dark:text-orange-400">v2.4.0 — Latest Release</div>
                <div className="font-semibold text-slate-900 dark:text-slate-100 text-xs">Theme System & Enhanced Header Controls</div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Added full dark mode theme system, refined SaaS company footer, and dynamic filter controls.
                </p>
              </div>
              <div className="border-l-2 border-slate-300 dark:border-slate-700 pl-3 space-y-1">
                <div className="text-xs font-bold text-slate-500">v2.3.0</div>
                <div className="font-semibold text-slate-900 dark:text-slate-100 text-xs">Top 50 Post Display Slice Engine</div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Introduced Top 10 / Top 25 / All 50 segmented toggle with instant pagination.
                </p>
              </div>
            </div>
          )}

          {type === 'privacy' && (
            <div className="space-y-2">
              <p>
                Subreddit Vibe Check Pvt. Ltd. respects user privacy. We analyze public Reddit submissions only and do not harvest personal identifiers or private data.
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Theme preferences are saved locally in your browser storage. No tracking cookies are used.
              </p>
            </div>
          )}

          {type === 'terms' && (
            <div className="space-y-2">
              <p>
                By using Subreddit Vibe Check, you agree to access public community analytics for informational and analytical purposes in compliance with Reddit API terms and fair use policies.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end p-4 px-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-orange-600 dark:hover:bg-orange-500 rounded-lg transition-colors cursor-pointer"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
