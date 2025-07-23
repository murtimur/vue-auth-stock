import { defineStore } from 'pinia'
import { reactive, watch } from 'vue'

export const useCariStore = defineStore('cari', () => {
  let initialState = {
    id: 0,
    durum: '',
    anaHesapId: 0,
    kodu: '',
    adi: '',
    unvani: '',
    yetkili: '',
    dogumTarihi: null,
    tipi: '',
    subeId: 0,
    paraBirimi: '',
    aciklama: '',
    mahalleId: 0,
    faturaAdresi: '',
    sevkAdresi: '',
    telefon1: '',
    telefon2: '',
    faks: '',
    gsm: '',
    email: '',
    webAdresi: '',
    vergiDairesi: '',
    vergiNumarasi: '',
    krediLimiti: 0,
    acikHesapLimiti: 0,
    opsiyon: '',
    iskonto: 0,
    gecikmeFaizi: 0,
    aylikVade: 0,
    satisYapilmasin: false,
    tahsilatYapilmasin: false,
    ozelKod1: '',
    ozelKod2: '',
    ozelKod3: '',
    tarih: null,
    ortalamaDevirTarihi: null,
    artiPuan: 0,
    otomasyonDisi: false,
    borcHesapId: 0,
    alacakHesapId: 0,
    satisFiyati: 0,
    isYeri: '',
    ozelKod0: '',
    ilceId: 0,
    eFaturaSenaryo: '',
    giderTipi: '',
    adresId: 0,
    ulkeId: 0,
    postaKodu: '',
  }

  const cariKeys = [
    'id',
    'durum',
    'anaHesapId',
    'kodu',
    'adi',
    'unvani',
    'yetkili',
    'dogumTarihi',
    'tipi',
    'subeId',
    'paraBirimi',
    'aciklama',
    'mahalleId',
    'faturaAdresi',
    'sevkAdresi',
    'telefon1',
    'telefon2',
    'faks',
    'gsm',
    'email',
    'webAdresi',
    'vergiDairesi',
    'vergiNumarasi',
    'krediLimiti',
    'acikHesapLimiti',
    'opsiyon',
    'iskonto',
    'gecikmeFaizi',
    'aylikVade',
    'satisYapilmasin',
    'tahsilatYapilmasin',
    'ozelKod1',
    'ozelKod2',
    'ozelKod3',
    'tarih',
    'ortalamaDevirTarihi',
    'artiPuan',
    'otomasyonDisi',
    'borcHesapId',
    'alacakHesapId',
    'satisFiyati',
    'isYeri',
    'ozelKod0',
    'ilceId',
    'eFaturaSenaryo',
    'giderTipi',
    'adresId',
    'ulkeId',
    'postaKodu',
  ]

  const storedData = localStorage.getItem('cari')
  if (storedData !== null) {
    try {
      initialState = JSON.parse(storedData)
    } catch {
      /**  */
    }
  }

  const cari = reactive(initialState)

  function setCari(data) {
    for (const key of cariKeys) {
      cari[key] = data[key]
    }
  }

  function resetCari() {
    for (const key of cariKeys) {
      delete cari[key]
    }
    cari.id = 0
  }

  function saveToStorage() {
    localStorage.setItem('cari', JSON.stringify(cari))
  }

  watch(cari, saveToStorage, { deep: true })

  return { cari, setCari, resetCari }
})
