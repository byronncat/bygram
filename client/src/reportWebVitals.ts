import { onLCP, onFID, onCLS, onINP, onTTFB, onFCP } from 'web-vitals';

if (process.env.NODE_ENV === 'development') {
  onLCP(console.log);
  onFID(console.log);
  onCLS(console.log);
  onINP(console.log);
  onTTFB(console.log);
  onFCP(console.log);
}
