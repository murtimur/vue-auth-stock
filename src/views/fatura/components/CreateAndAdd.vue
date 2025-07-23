<template>
  <div
    v-if="stok.stokId > 0"
    style="border: 1px solid #bbdefb; border-radius: 5px; margin-top: 5px; padding: 10px"
  >
    <div>
      <label style="margin-right: 10px; font-weight: bold; font-size: 25px; color: #ad1457">{{
        stok.modelKodu ? stok.modelKodu : stok.stokKodu
      }}</label>
      <label style="margin-right: 10px; font-weight: bold; font-size: 25px; color: #ad1457">{{
        stok.beden ? stok.beden : ''
      }}</label>
      <label style="margin-right: 10px; font-weight: bold; font-size: 25px; color: #4a148c">{{
        stok.renkAdi ? stok.renkAdi : ''
      }}</label>
      <label
        :style="{
          marginRight: '10px',
          fontWeight: 'bold',
          fontSize: '25px',
          color: stok.envanter > 0 ? '#1A237E' : '#B71C1C',
        }"
        >{{ stok.envanter }}</label
      >
      <form
        @submit.prevent="submit"
        style="display: flex; gap: 5px; align-items: center; flex-wrap: nowrap; overflow: auto"
      >
        <AppInput v-model="viewFiyat" />
        <AppInput v-model="miktar" type="number" placeholder="Miktar" ref="miktarInput" />
        <button type="submit" hidden></button>
      </form>

      <AppButton
        style="margin-left: 10px; margin-top: 10px"
        @click="clickResetStok"
        variant="danger"
      >
        <AppIcon name="ri-delete-bin-5-fill" style="width: 30px; height: 30px"></AppIcon>
      </AppButton>
    </div>
  </div>
</template>

<script setup>
import AppButton from '@/components/AppButton.vue'
import { useStokStore } from '../store/stok'
import AppIcon from '@/components/AppIcon.vue'
import { computed, nextTick, ref, watch } from 'vue'
import AppInput from '@/components/AppInput.vue'

const { stok, resetStok } = useStokStore()

const miktarInput = ref(null)

const viewFiyat = ref(stok.fiyat)

const miktar = ref()

const isValidMiktar = computed(() => {
  return (
    miktar.value !== null &&
    miktar.value !== undefined &&
    miktar.value !== '' &&
    miktar.value >= 1 &&
    miktar.value <= 99999
  )
})

const submit = async () => {
  if (isValidMiktar) {
    alert('Hatalı Miktar!')
  }
  console.log(stok)
}

watch(stok, () => {
  viewFiyat.value = stok.fiyat
})

watch(
  stok,
  () => {
    if (stok.stokId > 0) {
      nextTick(() => {
        miktarInput.value?.focus()
      })
    }
  },
  { deep: true },
)

const clickResetStok = () => {
  resetStok()
}
</script>
