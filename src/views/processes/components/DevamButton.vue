<template>
  <div class="d-grid gap-2 mx-auto">
    <AppButton
      @click="faturaRouter"
      :is-disabled="cari?.satisFiyati === 0 && cari.id === 0"
      style="height: 50px"
      >D E V A M</AppButton
    >
  </div>
</template>

<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import { useCariStore } from '../store/cari'
import { useRouter } from 'vue-router'

const { cari } = useCariStore()

const navigate = useRouter()

const faturaRouter = () => {
  if (cari.satisFiyati > 0 && cari.id > 0) {
    navigate.push('/fatura')
  }
}
</script>
