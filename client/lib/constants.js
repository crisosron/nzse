export const PAGE_LINKS = {
  MEMBERSHIP_INFO: '/professionals/join-nzse',
  PASSWORD_RESET: '/password-reset'
};

// Maps an error code returned by firebase to prose
// All error codes and what they mean: https://firebase.google.com/docs/auth/admin/errors
export const FIREBASE_ERROR_MESSAGE = {
  'auth/user-not-found': 'A user with that email address could not be found.'
};

export const COOKIE_NAMES = {
  PENDING_MEMBER_EMAIL: '_nzse_pendingMemberEmail'
};