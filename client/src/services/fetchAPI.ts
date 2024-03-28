export function getURLServer(path: string): string {
  return `${process.env.BACKEND_API || 'http://localhost:5000'}${path}`;
}
