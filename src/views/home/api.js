import http from '@/lib/http'

export const exit = () => {
  return http.post('/api/v1/logout')
}
