import { useJwt } from 'react-jwt'

const token = 'test'
export default function useToken() {
  const { decodedToken, isExpired } = useJwt(token)

  return { decodedToken, isExpired }
}
