export function getURLServer(path: string): string {
  return `${process.env.BACKEND_API || 'http://192.168.1.4:5000'}${path}`;
}
