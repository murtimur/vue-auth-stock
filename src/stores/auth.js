import { defineStore } from 'pinia'
import { computed, reactive, watch } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  let initialState = {
    id: 0,
  }

  const storedData = localStorage.getItem('auth')
  if (storedData !== null) {
    try {
      initialState = JSON.parse(storedData)
    } catch {
      /** */
    }
  }

  const auth = reactive(initialState)

  const authKeys = [
    'username',
    'varsayilanCariKodu',
    'varsayilanPersonelKodu',
    'subeId',
    'kasaId',
    'winkaKullaniciId',
    'ozelKod3Id',
    'pesinVadeli',
    'yaziciAdi',
    'nushaAdet',
    'belgeDizayn',
    'belgeHarfi',
    'fiyatTipleri',
    'satisFaturasi',
    'satisIadeFaturasi',
    'alisFaturasi',
    'alisIadeFaturasi',
    'alinanSiparis',
    'verilenSiparis',
    'alinanFiyatTeklifi',
    'verilenFiyatTeklifi',
    'cariKartAcar',
    'depoTransfer',
    'fisListelesin',
    'fisSiler',
    'fiseGirebilsin',
    'fiyatDegistirir',
    'iskontoYapabilir',
    'kdvKullanilacak',
    'sabitFiyat',
    'sayim',
    'stokCikisBelgesi',
    'stokGirisBelgesi',
    'kdvOrani',
    'bakiyeGorsun',
    'renkBeden',
    'sayimEnvanterGorur',
  ]

  const isLoggedIn = computed(() => auth.id !== 0)

  function setLoggedIn(data) {
    auth.id = data.id
    for (const key of authKeys) {
      auth[key] = data[key]
    }
  }

  function logout() {
    auth.id = 0
    for (const key of authKeys) {
      delete auth[key]
    }
  }

  function saveToStorage() {
    localStorage.setItem('auth', JSON.stringify(auth))
  }

  watch(auth, saveToStorage, { deep: true })

  return { auth, setLoggedIn, logout, isLoggedIn }
})
