import http from '@/lib/http'

export const getFindByCariAdi = (name, page = 0) => {
  return http.get(`/api/v1/findbyadi/${name}`, { params: { page, size: 10 } })
}

export const getPersoneller = (page = 0) => {
  return http.get('/api/v1/personeller', { params: { page, size: 10 } })
}

export const getSubeler = () => {
  return http.get('/api/v1/subeler')
}

export const getKasalar = () => {
  return http.get('/api/v1/kasalar')
}

export const getWinkaKullanicilar = () => {
  return http.get('/api/v1/kullanicilar')
}

export const getOzelKodlar3 = () => {
  return http.get('/api/v1/ozelkodlar3')
}

export const getYazicilar = () => {
  return http.get('/api/v1/yazicilar')
}

export const dovizKuru = (doviz) => {
  return http.get(`/api/v1/kur/${doviz}`)
}
