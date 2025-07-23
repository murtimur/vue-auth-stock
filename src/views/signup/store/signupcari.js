import { defineStore } from 'pinia'
import { reactive, watch } from 'vue'

export const useSignUpCariStore = defineStore('signupcari', () => {
  let initialState = {
    kodu: '',
  }
  const storedData = localStorage.getItem('signupcari')
  if (storedData !== null) {
    try {
      initialState = JSON.parse(storedData)
    } catch {
      /*empty*/
    }
  }

  const cari = reactive(initialState)

  function setCari(data) {
    cari.kodu = data.kodu
    cari.adi = data.adi
  }

  function clearCari() {
    cari.kodu = undefined
    cari.adi = undefined
  }

  watch(cari, () => {
    localStorage.setItem('signupcari', JSON.stringify(cari))
  })

  return { cari, setCari, clearCari }
})
