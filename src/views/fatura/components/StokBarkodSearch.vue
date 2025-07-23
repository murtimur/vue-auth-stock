<template>
  <div
    v-if="stok.stokId === 0"
    style="border: 1px solid #bbdefb; border-radius: 5px; margin-top: 10px; padding: 10px"
  >
    <div style="display: flex; text-align: center; width: 100%">
      <form @submit.prevent="submit">
        <AppInput
          style="width: 170px"
          placeholder="Barkodu/StokKodu"
          v-model="barkodu"
          ref="stokBarkodInput"
        />
        <button hidden type="submit"></button>
      </form>
      <AppIcon
        name="ri-money-dollar-box-fill"
        style="margin-left: 10px; height: 44px; width: 44px; color: #074f25"
      />
      <AppIcon
        name="ri-shopping-basket-fill"
        style="margin-left: 10px; height: 44px; width: 44px; color: #c9265c"
      />
      <StokKoduSearch />
      <AppSpinner style="margin-top: 10px; margin-left: 10px" v-if="apiProgress" />
    </div>
  </div>
</template>

<script setup>
import AppInput from '@/components/AppInput.vue'
import { useStokStore } from '../store/stok'
import { nextTick, onMounted, ref, watch } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import { useCariStore } from '@/views/processes/store/cari'
import { useAuthStore } from '@/stores/auth'
import { stokBarkodSearch } from '../api'
import AppSpinner from '@/components/AppSpinner.vue'
import StokKoduSearch from './StokKoduSearch.vue'

const { stok, setStok } = useStokStore()
const { cari } = useCariStore()
const { auth } = useAuthStore()

const stokBarkodInput = ref(null)
const barkodu = ref()

const apiProgress = ref(false)

const submit = async () => {
  apiProgress.value = true
  const body = { barkodu: barkodu.value, subeId: auth.subeId, fiyat: cari.satisFiyati }
  try {
    const response = await stokBarkodSearch(body)
    if (response.data) {
      setStok(response.data)
    } else {
      alert('Stok bulunamadı!')
    }
  } catch (error) {
    console.log(error)
  } finally {
    apiProgress.value = false
  }
  barkodu.value = ''
}

watch(
  stok,
  () => {
    if (stok.stokId === 0) {
      nextTick(() => {
        stokBarkodInput.value?.focus()
      })
    }
  },
  { deep: true },
)

onMounted(() => {
  if (stok.stokId === 0) {
    nextTick(() => {
      stokBarkodInput.value?.focus()
    })
  }
})
</script>
