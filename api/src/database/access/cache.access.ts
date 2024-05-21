import Redis from '../Redis.database';

export async function getSession(sessionId: string) {
  return await Redis.get(`sess:${sessionId}`);
}

export async function removeSession(sessionId: string) {
  return await Redis.del(`sess:${sessionId}`);
}
