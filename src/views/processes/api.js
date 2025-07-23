import http from '@/lib/http'

export const getDefaultCari = (kodu) => {
  return http.get(`/api/v1/cari/${kodu}`)
}

export const getCariler = (body, page = 0) => {
  return http.post('/api/v1/cariler', body, { params: { page, size: 8 } })
}

export const getDefaultPersonel = (kodu) => {
  return http.get(`/api/v1/personel/${kodu}`)
}

export const personelSearch = (body, page = 0) => {
  return http.post('/api/v1/personelsearch', body, { params: { page, size: 6 } })
}
