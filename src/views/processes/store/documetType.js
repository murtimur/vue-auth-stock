import { defineStore } from 'pinia'
import { reactive, watch } from 'vue'

export const useDocumentTypeStore = defineStore('documentType', () => {
  let initialState = {
    documentType: 23,
  }

  const storedData = localStorage.getItem('documentType')

  if (storedData !== null) {
    try {
      initialState = JSON.parse(storedData)
    } catch {
      /** */
    }
  }

  const documentType = reactive(initialState)

  function selectDocumentType(id) {
    documentType.documentType = id
  }

  function defaultDocumentType() {
    documentType.documentType = 23
  }

  function saveToStorage() {
    localStorage.setItem('documentType', JSON.stringify(documentType))
  }

  watch(
    documentType,
    () => {
      saveToStorage
    },
    { deep: true },
  )

  return { documentType, selectDocumentType, defaultDocumentType }
})
