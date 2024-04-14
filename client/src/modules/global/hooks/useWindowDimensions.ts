import { useState, useEffect, useCallback } from 'react'

export function useWindowDimensions() {
  const hasWindow = typeof window !== 'undefined'

  const getWindowDimensions = useCallback(() => {
    const width = hasWindow ? window.innerWidth : 0
    const height = hasWindow ? window.innerHeight : 0
    return {
      width,
      height,
    }
  }, [hasWindow])

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )

  useEffect(() => {
    if (hasWindow) {
      function handleResize() {
        setWindowDimensions(getWindowDimensions())
      }

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [hasWindow, getWindowDimensions])

  return windowDimensions
}
