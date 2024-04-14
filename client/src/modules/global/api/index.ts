export function getHostingServer(path: string): string {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
    return path
  else return `${process.env.REACT_APP_API_URL}/${path}`
}

export function transformImageCDN(path: string, format: string): string {
  const urlParts = path.split('/')

  for (let i = 0; i < urlParts.length; i++) {
    if (urlParts[i].includes('upload')) {
      urlParts[i + 1] = format
      path = urlParts.join('/')
      break
    }
  }
  return path
}
