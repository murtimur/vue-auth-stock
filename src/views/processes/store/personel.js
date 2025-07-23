import { defineStore } from 'pinia'
import { reactive, watch } from 'vue'

export const usePersonelStore = defineStore('personel', () => {
  let initialState = {
    id: 0,
    durum: 0,
    subeId: 0,
    kodu: '',
    tcKimlikNo: '',
    adi: '',
    soyadi: '',
    prim: 0,
  }

  const storedData = localStorage.getItem('personel')
  if (storedData !== null) {
    try {
      initialState = JSON.parse(storedData)
    } catch {
      /** */
    }
  }

  const personel = reactive(initialState)

  function setPersonel(data) {
    personel.id = data.id
    personel.durum = data.durum
    personel.subeId = data.subeId
    personel.kodu = data.kodu
    personel.tcKimlikNo = data.tcKimlikNo
    personel.adi = data.adi
    personel.soyadi = data.soyadi
    personel.prim = data.prim
  }

  function resetPersonel() {
    personel.id = 0
    delete personel.durum
    delete personel.subeId
    delete personel.kodu
    delete personel.tcKimlikNo
    delete personel.adi
    delete personel.soyadi
    delete personel.prim
  }

  watch(
    personel,
    () => {
      localStorage.setItem('personel', JSON.stringify(personel))
    },
    { deep: true },
  )

  return { personel, setPersonel, resetPersonel }
})
