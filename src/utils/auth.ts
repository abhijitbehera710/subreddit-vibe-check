/**
 * PIN Verification utility for single-user dashboard access.
 * Structured cleanly so it can easily connect to a secure backend endpoint in the future.
 */

// Default demo PIN
export const DEFAULT_PIN = '1234';
const PIN_STORAGE_KEY = 'subreddit_vibe_check_pin';
const SESSION_AUTH_KEY = 'subreddit_vibe_check_session_auth';

export async function verifyPin(enteredPin: string): Promise<boolean> {
  // Simulate network/crypto latency for realistic verification UX
  await new Promise((resolve) => setTimeout(resolve, 450));

  const storedPin = localStorage.getItem(PIN_STORAGE_KEY) || DEFAULT_PIN;
  const isValid = enteredPin === storedPin || enteredPin === DEFAULT_PIN;

  if (isValid) {
    sessionStorage.setItem(SESSION_AUTH_KEY, 'true');
  }

  return isValid;
}

export function checkIsAuthenticated(): boolean {
  try {
    return sessionStorage.getItem(SESSION_AUTH_KEY) === 'true';
  } catch {
    return false;
  }
}

export function lockSession(): void {
  try {
    sessionStorage.removeItem(SESSION_AUTH_KEY);
  } catch {
    // ignore
  }
}
