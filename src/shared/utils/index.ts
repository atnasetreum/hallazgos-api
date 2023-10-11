export const expireTime = 60 * 60 * 24 * 30; // 30 days in seconds

export const expiresIn = () => {
  return Math.floor(Date.now() / 1000) + expireTime;
};
