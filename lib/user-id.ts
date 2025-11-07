import FingerprintJS from '@fingerprintjs/fingerprintjs';
import Cookies from 'js-cookie';

const FINGERPRINT_COOKIE_KEY = 'user_fingerprint_id';

export async function getOrCreateUserId(): Promise<string> {
  // Check if fingerprint ID already exists in cookie
  let userId = Cookies.get(FINGERPRINT_COOKIE_KEY);

  if (!userId) {
    // Generate new fingerprint
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    userId = result.visitorId;

    // Store in cookie for 1 year
    Cookies.set(FINGERPRINT_COOKIE_KEY, userId, { expires: 365 });
  }

  return userId;
}