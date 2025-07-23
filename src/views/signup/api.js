import http from '@/lib/http'

export const signup = (body) => {
  return http.post('/api/v1/users', body)
}
