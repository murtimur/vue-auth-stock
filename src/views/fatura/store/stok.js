import { defineStore } from 'pinia'
import { reactive, watch } from 'vue'

export const useStokStore = defineStore('stok', () => {
  let initialState = {
    barkodu: '',
    birimAdi: '',
    stokAdi: '',
    stokKodu: '',
    stokId: 0,
    barkodId: 0,
    rbkId: 0,
    beden: 0,
    kavala: 0,
    renkAdi: '',
    modelId: 0,
    modelKodu: '',
    modelAdi: '',
    envanter: 0,
    fiyat: 0,
    paraBirimi: '',
  }

  const storedData = localStorage.getItem('stok')

  if (storedData !== null) {
    try {
      initialState = JSON.parse(storedData)
    } catch {
      /** */
    }
  }

  const stok = reactive(initialState)

  function setStok(data) {
    if (data.fiyat === 0 && !window.confirm('Fiyat 0 devam etmek istiyor musunuz?')) {
      return
    }
    Object.assign(stok, {
      barkodu: data.barkodu,
      birimAdi: data.birimAdi,
      stokAdi: data.stokAdi,
      stokKodu: data.stokKodu,
      stokId: data.stokId,
      barkodId: data.barkodId,
      rbkId: data.rbkId,
      beden: data.beden,
      kavala: data.kavala,
      renkAdi: data.renkAdi,
      modelId: data.modelId,
      modelKodu: data.modelKodu,
      modelAdi: data.modelAdi,
      envanter: data.envanter,
      fiyat: data.fiyat,
      paraBirimi: data.paraBirimi,
    })
  }

  function resetStok() {
    stok.barkodu = ''
    stok.birimAdi = ''
    stok.stokAdi = ''
    stok.stokKodu = ''
    stok.stokId = 0
    stok.barkodId = 0
    stok.rbkId = 0
    stok.beden = ''
    stok.kavala = ''
    stok.renkAdi = ''
    stok.modelId = 0
    stok.modelKodu = ''
    stok.modelAdi = ''
    stok.envanter = 0
    stok.fiyat = 0
    stok.paraBirimi = ''
  }

  function saveToStorage() {
    localStorage.setItem('stok', JSON.stringify(stok))
  }

  watch(stok, saveToStorage, { deep: true })

  return { stok, setStok, resetStok }
})
