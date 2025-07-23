import http from '@/lib/http'

export const stokBarkodSearch = (body) => {
  return http.post('/api/v1/stok', body)
}

export const stoklarSearch = (body, page = 0) => {
  return http.post('/api/v1/stoklar', body, { params: { page, size: 10 } })
}
