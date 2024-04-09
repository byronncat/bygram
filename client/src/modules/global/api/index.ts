export function getURLServer(path: string): string {
  return `${process.env.REACT_APP_API_URL || 'http://192.168.1.4:5000'}${path}`;
}

export function formatImageCDN(path: string, format: string): string {
  const urlParts = path.split('/');

  for (let i = 0; i < urlParts.length; i++) {
    if (urlParts[i].includes('upload')) {
      urlParts[i + 1] = format;
      path = urlParts.join('/');
      break;
    }
  }
  console.log(path);
  return path;
}
