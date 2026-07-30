export const getAvatarFallback = (email) => {
  return email.charAt(0).toUpperCase() || '?';
};