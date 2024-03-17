function escapeRegExp(string: string) {
  return JSON.stringify(string).slice(1, -1);
}

export { escapeRegExp };
export { default as logger } from './logger.util';
