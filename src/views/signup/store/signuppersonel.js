import { defineStore } from 'pinia'
import { reactive, watch } from 'vue'

export const useSignUpPersonelStore = defineStore('signuppersonel', () => {
  let initialState = {
    kodu: undefined,
  }
  const storedData = localStorage.getItem('signuppersonel')
  if (storedData !== null) {
    try {
      initialState = JSON.parse(storedData)
    } catch {
      /** */
    }
  }
  const personel = reactive(initialState)
  function setPersonel(data) {
    personel.kodu = data.kodu
    personel.adi = data.adi
  }

  function clearPersonel() {
    personel.kodu = undefined
    personel.adi = undefined
  }

  watch(personel, () => {
    localStorage.setItem('signuppersonel', JSON.stringify(personel))
  })

  return { setPersonel, clearPersonel, personel }
})
