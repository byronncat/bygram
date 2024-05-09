export function getHostingServer(path: string): string {
  path = path.startsWith('/') ? path : '/' + path
  path = '/api' + path

  if (process.env.REACT_APP_API_URL)
    return process.env.REACT_APP_API_URL + '' + path
  else return path
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
