<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="button-wrapper mt-4">
    <AppHomeMenu />
    <AppLogout />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCariStore } from '../processes/store/cari'
import AppHomeMenu from './components/AppHomeMenu.vue'
import AppLogout from './components/AppLogout.vue'

const { resetCari } = useCariStore()

onMounted(() => {
  resetCari()
})
</script>

<style scoped>
.button-wrapper {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  align-items: center;
}

.button-wrapper > * {
  min-width: 120px;
}

@media (max-width: 768px) {
  .button-wrapper {
    flex-direction: column;
    align-items: center;
  }
}
</style>
