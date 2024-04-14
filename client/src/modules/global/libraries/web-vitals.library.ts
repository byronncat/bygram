import { onCLS, onINP, onLCP } from 'web-vitals'

export const initWebVitals = () => {
  onCLS(console.log)
  onINP(console.log)
  onLCP(console.log)
}
