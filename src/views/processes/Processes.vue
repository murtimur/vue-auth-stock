<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="form-wrapper">
    <div class="form-container">
      <div class="form-group">
        <DocumentTypeSelect />
      </div>

      <div class="mb-3">
        <CariAdd />
      </div>

      <!-- Select ve buton -->
      <div class="mb-3">
        <PersonelAdd />
      </div>

      <div>
        <DevamButton />
      </div>
    </div>
  </div>
</template>

<script setup>
import DocumentTypeSelect from './components/DocumentTypeSelect.vue'
import CariAdd from './components/CariAdd.vue'
import PersonelAdd from './components/PersonelAdd.vue'
import DevamButton from './components/DevamButton.vue'
import { useDovizStore } from '../fatura/store/doviz'
import { onMounted } from 'vue'

const { resetDoviz } = useDovizStore()

onMounted(() => {
  resetDoviz()
})
</script>

<style scoped>
.form-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.form-container {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* Form grup flex ayarı: yan yana elemanlar */
.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

/* Input ve select genişliği ve küçülme sınırı */
.flexible-input,
.form-group input,
.form-group select {
  flex-grow: 1; /* mümkün olan alanı kapla */
  min-width: 150px; /* küçülme sınırı */
  padding: 8px;
  font-size: 16px;
  box-sizing: border-box;
}

/* Buton küçülmesin, yanında kalsın */
.form-group button,
.btn-small {
  flex-shrink: 0; /* küçülmeyi engelle */
  margin-left: 10px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
}

/* Gönder butonu full genişlik ve üstte biraz boşluk */
.submit-button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  background-color: #4caf50;
  color: white;
  border-radius: 5px;
}
</style>
