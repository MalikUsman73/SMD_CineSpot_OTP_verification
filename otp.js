import { signInWithPhoneNumber } from 'firebase/auth';
import { auth } from './firebase';

// Firebase test mode: fictional numbers added in the Firebase console get a fixed code
// and no real SMS is sent. This lets the app run in Expo Go without a reCAPTCHA page.
export const OTP_TEST_MODE = true;

if (OTP_TEST_MODE) {
  auth.settings.appVerificationDisabledForTesting = true;
}

const testModeVerifier = {
  type: 'recaptcha',
  verify: () => Promise.resolve('test-mode-token'),
  _reset: () => {},
};

export const normalizePhone = (raw) => raw.replace(/[\s()-]/g, '');

export const isValidPhone = (phone) => /^\+[1-9]\d{7,14}$/.test(phone);

export const sendOtp = (phone) => signInWithPhoneNumber(auth, phone, testModeVerifier);

const MESSAGES = {
  'auth/invalid-phone-number': 'That phone number is not valid. Use the format +countrycode number.',
  'auth/missing-phone-number': 'Enter your phone number.',
  'auth/too-many-requests': 'Too many attempts. Wait a few minutes and try again.',
  'auth/quota-exceeded': 'The SMS limit was reached. Try again later.',
  'auth/operation-not-allowed':
    'Phone sign-in is blocked. In Firebase, enable the Phone provider and allow this number\'s country under Authentication > Settings > SMS region policy.',
  'auth/invalid-verification-code': 'Wrong code. Check it and try again.',
  'auth/missing-verification-code': 'Enter the 6-digit code.',
  'auth/code-expired': 'This code has expired. Request a new one.',
  'auth/network-request-failed': 'No connection. Check your internet and try again.',
  'auth/invalid-app-credential':
    'This number is not a test number. Add it under "Phone numbers for testing" in Firebase.',
  'auth/captcha-check-failed':
    'This number is not a test number. Add it under "Phone numbers for testing" in Firebase.',
};

export const friendlyError = (error) =>
  MESSAGES[error?.code] || error?.message || 'Something went wrong. Try again.';
