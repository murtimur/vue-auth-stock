<template>
  <AppSelect v-model="belgeTipi" :data="data" />
  <RouterLink to="/home">
    <AppIcon name="fc-home" style="height: 55px; width: 55px" />
  </RouterLink>
</template>

<script setup>
import AppIcon from '@/components/AppIcon.vue'
import AppSelect from '@/components/AppSelect.vue'
import { useAuthStore } from '@/stores/auth'
import { onMounted, ref, watch } from 'vue'
import { useDocumentTypeStore } from '../store/documetType'

const { auth } = useAuthStore()

const { selectDocumentType, defaultDocumentType } = useDocumentTypeStore()

const belgeTipi = ref(23)

watch(belgeTipi, () => {
  selectDocumentType(belgeTipi.value)
})

onMounted(() => {
  defaultDocumentType()
})

const data = [
  auth.satisFaturasi && { id: 23, adi: 'Satış Faturası' },
  auth.satisIadeFaturasi && { id: 29, adi: 'Satış İade Faturası' },
  auth.alisFaturasi && { id: 22, adi: 'Alış Faturası' },
  auth.alisIadeFaturasi && { id: 28, adi: 'Alış İade Faturası' },
  auth.stokGirisBelgesi && { id: 20, adi: 'Stok Giriş' },
  auth.stokCikisBelgesi && { id: 21, adi: 'Stok Çıkış' },
  auth.alinanSiparis && { id: 26, adi: 'Alınan Sipariş' },
  auth.verilenSiparis && { id: 27, adi: 'Verilen  Sipariş' },
  auth.verilenFiyatTeklifi && { id: 45, adi: 'Verilen  Fiyat Teklifi' },
  auth.alinanFiyatTeklifi && { id: 46, adi: 'Alınan  Fiyat Teklifi' },
  auth.depoTransfer && { id: 41, adi: 'Depo Transfer' },
  auth.sayim && { id: 0, adi: 'Sayım' },
].filter(Boolean)
</script>
