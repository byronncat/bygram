function escapeRegExp(string: string) {
  return JSON.stringify(string).slice(1, -1);
}

function isEmptyObject(obj: any) {
  return !Object.values(obj).some((prop) => prop !== null && typeof prop !== 'undefined');
}

export { escapeRegExp, isEmptyObject };
export { default as logger } from './logger.util';
