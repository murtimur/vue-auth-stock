import { defineStore } from 'pinia'
import { reactive, watch } from 'vue'

export const useDovizStore = defineStore('doviz', () => {
  let initialState = {
    doviz: '',
    tarih: '',
    kur: 1,
  }

  const storedData = localStorage.getItem('doviz')
  if (storedData) {
    try {
      initialState = JSON.parse(storedData)
    } catch {
      /** */
    }
  }

  const doviz = reactive(initialState)

  function setDoviz(data) {
    doviz.doviz = data.doviz
    doviz.tarih = data.tarih
    doviz.kur = data.kur
  }

  function resetDoviz() {
    doviz.doviz = ''
    doviz.tarih = ''
    doviz.kur = 1
  }

  function saveToStorage() {
    localStorage.setItem('doviz', JSON.stringify(doviz))
  }

  watch(doviz, saveToStorage, { deep: true })

  return { doviz, setDoviz, resetDoviz }
})
