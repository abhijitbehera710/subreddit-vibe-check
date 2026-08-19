import React, { useState, useRef, useEffect } from 'react';
import { Activity, Lock, Sun, Moon, Eye, EyeOff, AlertCircle, HelpCircle, ArrowRight, Loader2, Sparkles, KeyRound } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { verifyPin, DEFAULT_PIN } from '../utils/auth';

interface PinScreenProps {
  onSuccess: () => void;
}

export const PinScreen: React.FC<PinScreenProps> = ({ onSuccess }) => {
  const { theme, toggleTheme } = useTheme();
  const [digits, setDigits] = useState<string[]>(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isMasked, setIsMasked] = useState(false); // Default to visible or masked based on standard usability
  const [isShaking, setIsShaking] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [isDemoFilled, setIsDemoFilled] = useState(false);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Auto-focus first digit on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRefs[0].current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleVerify = async (pinValue: string) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const isValid = await verifyPin(pinValue);
      if (isValid) {
        onSuccess();
      } else {
        setErrorMessage('Incorrect PIN. Please try again.');
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 600);
        // Clear digits and focus first input
        setDigits(['', '', '', '']);
        setIsDemoFilled(false);
        setTimeout(() => inputRefs[0].current?.focus(), 150);
      }
    } catch {
      setErrorMessage('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (index: number, value: string) => {
    // Only accept numeric characters
    const numericChar = value.replace(/\D/g, '').slice(-1);

    const newDigits = [...digits];
    newDigits[index] = numericChar;
    setDigits(newDigits);
    setErrorMessage(null);
    setIsDemoFilled(false);

    if (numericChar && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        inputRefs[index - 1].current?.focus();
      } else {
        const newDigits = [...digits];
        newDigits[index] = '';
        setDigits(newDigits);
        setIsDemoFilled(false);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (e.key === 'ArrowRight' && index < 3) {
      inputRefs[index + 1].current?.focus();
    } else if (e.key === 'Enter') {
      const fullPin = digits.join('');
      if (fullPin.length === 4) {
        handleVerify(fullPin);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    if (!pastedData) return;

    const newDigits = ['', '', '', ''];
    for (let i = 0; i < pastedData.length; i++) {
      newDigits[i] = pastedData[i];
    }
    setDigits(newDigits);
    setErrorMessage(null);

    const nextIndex = Math.min(pastedData.length - 1, 3);
    inputRefs[nextIndex].current?.focus();
  };

  // Handler for "Use Demo Login": Automatically populates the 4 digits without auto-navigating
  const handleUseDemoLogin = () => {
    const demoDigits = DEFAULT_PIN.split('');
    setDigits(demoDigits);
    setErrorMessage(null);
    setIsDemoFilled(true);

    // Focus last input or keep focus natural
    inputRefs[3].current?.focus();
  };

  const fullPin = digits.join('');
  const isComplete = fullPin.length === 4;

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 selection:bg-orange-100 selection:text-orange-900 dark:selection:bg-orange-950 dark:selection:text-orange-100 relative overflow-hidden">
      {/* Background visual accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 dark:opacity-20">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl" />
      </div>

      {/* Top Bar with Brand & Theme Toggle */}
      <header className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-xs">
            <Activity className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-slate-100">
            The Subreddit Vibe Check
          </span>
        </div>

        {/* Theme Toggle Button */}
        <button
          id="pin-screen-theme-toggle"
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white shadow-2xs hover:bg-slate-100/70 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Light</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-slate-600" />
              <span>Dark</span>
            </>
          )}
        </button>
      </header>

      {/* Main Centered PIN Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-6 sm:py-8">
        <div
          id="pin-access-card"
          className={`w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl dark:shadow-2xl transition-all duration-300 ${
            isShaking ? 'animate-shake' : ''
          }`}
        >
          {/* Card Header */}
          <div className="text-center space-y-2.5">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                Welcome back
              </h1>
              <p className="text-xs text-orange-600 dark:text-orange-400 font-semibold uppercase tracking-wider">
                The Subreddit Vibe Check
              </p>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto pt-0.5">
                Enter your 4-digit PIN to access your dashboard.
              </p>
            </div>
          </div>

          {/* PIN Input Grid */}
          <div className="mt-6 space-y-5">
            <div className="flex justify-center items-center gap-3 sm:gap-4">
              {digits.map((digit, idx) => (
                <input
                  key={idx}
                  ref={inputRefs[idx]}
                  id={`pin-input-${idx}`}
                  type={isMasked ? 'password' : 'text'}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  disabled={isLoading}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  onPaste={handlePaste}
                  aria-label={`PIN digit ${idx + 1} of 4`}
                  className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-extrabold rounded-xl sm:rounded-2xl border transition-all duration-150 shadow-2xs focus:outline-none ${
                    errorMessage
                      ? 'border-rose-400 dark:border-rose-600 bg-rose-50/50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 ring-2 ring-rose-300 dark:ring-rose-900/50'
                      : digit
                      ? 'border-orange-500 dark:border-orange-500 bg-orange-50/30 dark:bg-orange-950/20 text-slate-900 dark:text-slate-100 ring-2 ring-orange-500/20'
                      : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30'
                  }`}
                />
              ))}
            </div>

            {/* Error Message */}
            {errorMessage ? (
              <div
                id="pin-error-message"
                className="flex items-center justify-center gap-2 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 p-2.5 rounded-xl border border-rose-200 dark:border-rose-800 animate-in fade-in duration-150"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            ) : (
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
                <button
                  type="button"
                  onClick={() => setIsMasked(!isMasked)}
                  className="inline-flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-200 transition-colors cursor-pointer"
                >
                  {isMasked ? (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>Show digits</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Mask digits</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  id="forgot-pin-btn"
                  onClick={() => setShowForgotModal(true)}
                  className="hover:text-orange-600 dark:hover:text-orange-400 hover:underline transition-colors cursor-pointer"
                >
                  Forgot PIN?
                </button>
              </div>
            )}

            {/* Primary Action: Unlock Dashboard */}
            <div className="space-y-4">
              <button
                id="unlock-dashboard-btn"
                type="button"
                disabled={!isComplete || isLoading}
                onClick={() => handleVerify(fullPin)}
                className={`w-full py-3.5 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 shadow-md ${
                  isComplete && !isLoading
                    ? 'bg-slate-900 hover:bg-slate-800 dark:bg-orange-600 dark:hover:bg-orange-500 text-white cursor-pointer hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Unlocking dashboard...</span>
                  </>
                ) : (
                  <>
                    <span>Unlock Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Secondary Demo Access Section */}
              <div
                id="demo-access-section"
                className="pt-4 border-t border-slate-100 dark:border-slate-800/80 text-center space-y-2"
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Demo Access
                  </span>
                </div>

                <button
                  id="use-demo-login-btn"
                  type="button"
                  onClick={handleUseDemoLogin}
                  disabled={isLoading}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 bg-slate-100 dark:bg-slate-800/80 hover:bg-orange-50 dark:hover:bg-orange-950/40 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-orange-300 dark:hover:border-orange-800 transition-all duration-150 shadow-2xs cursor-pointer active:scale-98"
                >
                  <KeyRound className="w-3.5 h-3.5 text-orange-500" />
                  <span>Use Demo Login</span>
                </button>

                <p className="text-[11px] text-slate-400 dark:text-slate-500">
                  Demo access automatically fills the PIN for testing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Forgot PIN Helper Modal */}
      {showForgotModal && (
        <div
          id="forgot-pin-modal-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setShowForgotModal(false)}
        >
          <div
            id="forgot-pin-modal"
            className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-6 space-y-4 border border-slate-200 dark:border-slate-800 shadow-2xl text-slate-900 dark:text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base">Forgot Your PIN?</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Default access credential</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              This single-user application is configured with the standard demo PIN:
            </p>

            <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">Standard Access PIN</span>
              <span className="text-2xl font-mono font-black text-orange-600 dark:text-orange-400 tracking-widest">
                {DEFAULT_PIN}
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                handleUseDemoLogin();
                setShowForgotModal(false);
              }}
              className="w-full py-2.5 px-4 bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fill PIN in boxes</span>
            </button>

            <button
              type="button"
              onClick={() => setShowForgotModal(false)}
              className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Footer on PIN screen */}
      <footer className="relative z-10 py-6 text-center text-xs text-slate-400 dark:text-slate-600">
        © 2026 Subreddit Vibe Check Pvt. Ltd. All rights reserved.
      </footer>
    </div>
  );
};
